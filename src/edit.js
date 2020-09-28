import {initializeEditPage, renderIngredient} from "./views";
import {removeRecipes, updateRecipe} from "./resep";

const recipeTitleEl = document.querySelector('#recipe-title')
const recipeStepsEl = document.querySelector('#recipe-Steps')
const addIngredientButtonEl = document.querySelector('#add-ingredient-button')
const addIngredientEl = document.querySelector('#add-ingredient')
const saveRecipe = document.querySelector('#save-recipe')
const removeRecipe = document.querySelector('#remove-recipe')
const recipeID = location.hash.substring(1)

initializeEditPage(recipeID)
renderIngredient(recipeID)
recipeTitleEl.addEventListener('input', (e) => {
    updateRecipe(recipeID, {
        title: e.target.value
    })
})

recipeStepsEl.addEventListener('input', (e) => {
    updateRecipe(recipeID, {
        recipeSteps: e.target.value
    })
})

addIngredientButtonEl.addEventListener('click', (e) => {
    e.preventDefault()
    updateRecipe(recipeID, {
        ingredients: {
            ingredient: addIngredientEl.value,
            completed: false
        }
    })
    addIngredientEl.value = ''
    renderIngredient(recipeID)
})

addIngredientEl.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        updateRecipe(recipeID, {
            ingredients: {
                ingredient: addIngredientEl.value,
                completed: false
            }
        })
        addIngredientEl.value = ''
        renderIngredient(recipeID)
    }
})

removeRecipe.addEventListener('click', (e) => {
    removeRecipes(recipeID)
    location.href = '/index.html'
})

saveRecipe.addEventListener('click', (e) => {
    location.href = '/index.html'
})