import {getRecipes, removeIngredient, removeRecipes, sortRecipes, updateIngredient} from "./resep";
import {getFilters} from "./filters";

const recipes = getRecipes()

const generateRecipeDom = (recipe) => {

    const recipeEl = document.createElement('a')
    const titleEl = document.createElement('p')
    const statusEl = document.createElement('p')
    const removeEl = document.createElement('button')

    //isi title resep kemudian append ke recipeEl
    if (recipe.title.length > 0) {
        titleEl.textContent = recipe.title
    } else {
        titleEl.textContent = 'Resep tanpa judul'
    }

    recipeEl.appendChild(titleEl)

    recipeEl.setAttribute('href', '/edit-resep.html#' + recipe.id)


    const statMessage = () => {
        if (recipe.ingredients.length<1){
            return 'Belum Ada Daftar Bahan '
        }
        const collected = recipe.ingredients.every((ev)=>{
            return ev.completed === true
        })
        const collectedSome = recipe.ingredients.some((sm)=>{
            return sm.completed === true
        })

        if (collected){
            return 'Semua Bahan Terkumpul'
        }else if (!collected&&collectedSome){
            return 'Ada Beberapa Bahan Yang Terkumpul'
        }
        else return 'Tidak Ada Bahan Yang Terkumpul'
    }
    statusEl.textContent = statMessage()

    recipeEl.appendChild(statusEl)

    removeEl.textContent = 'X'
    removeEl.addEventListener('click', (e) => {
        e.preventDefault()
        removeRecipes(recipe.id)
        renderRecipes()
    })
    recipeEl.appendChild(removeEl)

    return recipeEl
}

const renderRecipes = () => {
    const recipesEl = document.querySelector('#recipes')
    const filters = getFilters()
    const recipes = sortRecipes(filters.sortBy)

    const filteredRecipes = recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    recipesEl.innerHTML = ''
    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const recipeEl = generateRecipeDom(recipe)
            recipesEl.appendChild(recipeEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'Tidak ada resep,Ayo buat!'
        recipesEl.appendChild(emptyMessage)
    }
}
const generateIngredientDom = (ingredients, id) => {
    const containerEl = document.createElement('div')
    const ingredientEl = document.createElement('a')
    const completedEl = document.createElement('input')
    const removeEl = document.createElement('button')

    removeEl.textContent = 'x'
    completedEl.setAttribute('type', 'checkbox')

    completedEl.checked = ingredients.completed
    ingredientEl.textContent = ingredients.ingredient

    removeEl.addEventListener('click', (e) => {
        e.preventDefault()
        removeIngredient(id,ingredients)
        renderIngredient(id)
    })

    completedEl.addEventListener('change', (e) => {
        updateIngredient(id, e.target.checked, ingredients)
    })

    containerEl.appendChild(removeEl)
    containerEl.appendChild(completedEl)
    containerEl.appendChild(ingredientEl)

    return containerEl
}
const renderIngredient = (id) => {
    const ingredientsEl = document.querySelector('#ingredients')
    ingredientsEl.innerHTML = ''
    let recipe = recipes.find((recipe) => recipe.id === id)
    let ingredient = recipe.ingredients
    ingredient.forEach((ingredient) => {
        ingredientsEl.appendChild(generateIngredientDom(ingredient, id))
    })
}

const initializeEditPage = (id) => {
    const recipeTitleEl = document.querySelector('#recipe-title')
    const recipeStepsEl = document.querySelector('#recipe-Steps')
    const ingredientsEl = document.querySelector('#ingredients')
    let recipe = recipes.find((recipe) => recipe.id === id)
    if (!recipe) {
        return
    }
    recipeTitleEl.value = recipe.title
    recipeStepsEl.value = recipe.recipeSteps

    let ingredient = recipe.ingredients
    ingredient.forEach((ingredient) => {
        ingredientsEl.appendChild(generateIngredientDom(ingredient))
    })
}

export {renderRecipes, initializeEditPage, generateIngredientDom, renderIngredient}