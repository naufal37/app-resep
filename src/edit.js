import {initializeEditPage, renderIngredient, renderRecipes} from "./views";
import moment from "moment";
import {updateRecipe} from "./resep";
const recipeTitleEl = document.querySelector('#recipe-title')
const recipeStepsEl = document.querySelector('#recipe-Steps')
const ingredientsEl = document.querySelector('#ingredients')
const addIngredientButtonEl = document.querySelector('#add-ingredient-button')
const addIngredientEl = document.querySelector('#add-ingredient')
const removeRecipeButtonEl = document.querySelector('#delete-recipe')
const timeStamp = moment().valueOf()
const recipeID = location.hash.substring(1)
initializeEditPage(recipeID)

recipeTitleEl.addEventListener('input',(e)=>{
    updateRecipe(recipeID,{
        title:e.target.value
    })
})

recipeStepsEl.addEventListener('input',(e)=>{
    updateRecipe(recipeID,{
        recipeSteps:e.target.value
    })
})

addIngredientButtonEl.addEventListener('click',(e)=>{
    e.preventDefault()
    updateRecipe(recipeID,{
        ingredients:{
            ingredient:addIngredientEl.value,
            completed:false
        }
    })
    addIngredientEl.value=''
    renderIngredient(recipeID)
})