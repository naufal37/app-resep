import moment from "moment";
import {getRecipes, removeRecipes, sortRecipes} from "./resep";
import {getFilters} from "./filters";

const generateRecipeDom = (recipe)=>{
    const recipeEl = document.createElement('a')
    const titleEl = document.createElement('p')
    const statusEl = document.createElement('p')
    const removeEl = document.createElement('button')

    //isi title resep kemudian append ke recipeEl
    if (recipe.title.length>0){
        titleEl.textContent = recipe.title
    }else {
        titleEl.textContent = 'Resep tanpa judul'
    }
    recipeEl.appendChild(titleEl)

    recipeEl.setAttribute('href','/edit-resep.html#'+recipe.id)
    statusEl.textContent = ''
    recipeEl.appendChild(statusEl)

    removeEl.textContent = 'X'
    removeEl.addEventListener('click',(e)=>{
        e.preventDefault()
        removeRecipes(recipe.id)
        renderRecipes()
    })
    recipeEl.appendChild(removeEl)

    return recipeEl
}

const renderRecipes = ()=>{
    const recipesEl = document.querySelector('#recipes')
    const filters = getFilters()
    const recipes = sortRecipes(filters.sortBy)

    const filteredRecipes = recipes.filter((recipe)=>{
        return recipe.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    recipesEl.innerHTML = ''
    if (filteredRecipes.length>0){
        filteredRecipes.forEach((recipe)=>{
            const recipeEl = generateRecipeDom(recipe)
            recipesEl.appendChild(recipeEl)
        })
    }else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'Tidak ada resep,Ayo buat!'
        recipesEl.appendChild(emptyMessage)
    }
}

const initializeEditPage = (id)=>{
    const recipeTitleEl = document.querySelector('#recipe-title')
    const recipeStepsEl = document.querySelector('#recipe-Steps')
    const ingredientsEl = document.querySelector('#ingredients')
    const addIngredientButtonEl = document.querySelector('#add-ingredient')
    const addIngredientEl = document.querySelector('#add-ingredient')
    const recipes = getRecipes()
    let recipe = recipes.find((recipe)=> recipe.id === id)
    if (!recipe){
        return
    }
    recipeTitleEl.value = recipe.title
    recipeStepsEl.value = recipe.recipeSteps
    let bahan = recipe.ingredients
    ingredientsEl.textContent = bahan.forEach((b)=>{
        return b.ingredient
    })

}

export {renderRecipes,initializeEditPage}