import {initializeEditPage} from "./views";
import moment from "moment";
const recipeTitleEl = document.querySelector('#recipe-title')
const recipeStepsEl = document.querySelector('#recipe-Steps')
const ingredientsEl = document.querySelector('#ingredients')
const addIngredientButtonEl = document.querySelector('#add-ingredient')
const addIngredientEl = document.querySelector('#add-ingredient')
const removeRecipeButtonEl = document.querySelector('#delete-recipe')
const timeStamp = moment().valueOf()
const recipeID = location.hash.substring(1)
initializeEditPage(recipeID)