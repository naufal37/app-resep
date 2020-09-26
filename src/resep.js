import {v4 as uuidv4} from 'uuid'
import moment from "moment";

class Recipes {
    constructor(title, recipeSteps, ingredients) {
        this.id = uuidv4()
        this.title = title
        this.recipeSteps = recipeSteps
        this.ingredients = ingredients
        this.createdAt = moment().valueOf()
        this.updatedAt = moment().valueOf()
    }
}

let recipes = []

const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')
    try {
        recipes = recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        recipes = []
    }
}
loadRecipes()
const getRecipes = () => recipes
const createRecipes = () => {
    const newRecipes = new Recipes('', '', [])
    recipes.push(newRecipes)
    saveRecipes()
    return newRecipes.id
}
const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const removeRecipes = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => {
        return recipe.id === id
    })
    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipes()
    }
}


const removeIngredient = (id, ingredientsToRemove) => {
    let se = recipes.find((rec) => rec.id === id)
    let su = se.ingredients.findIndex((re) => re.ingredient === ingredientsToRemove.ingredient)
    se.ingredients.splice(su, 1)
    saveRecipes()
}

const sortRecipes = (sortBy) => {
    if (sortBy === 'byEdited') {
        return recipes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else return 0
        })
    } else if (sortBy === 'byCreated') {
        return recipes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else return 0
        })
    } else if (sortBy === 'alphabetical') {
        return recipes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else return 0
        })
    } else return recipes
}
const updateIngredient = (id, completed, ing) => {
    const recipe = recipes.find((recipe) => {
        return recipe.id === id
    })
    if (!recipe) {
        return
    }
    if (typeof completed === "boolean") {
        ing.completed = completed
    }
    saveRecipes()
}
const updateRecipe = (id, updates) => {
    const recipe = recipes.find((recipe) => {
        return recipe.id === id
    })
    if (!recipe) {
        return
    }
    if (typeof updates.title === "string") {
        recipe.title = updates.title
        recipe.updatedAt = moment().valueOf()
    }
    if (typeof updates.ingredients === "object") {
        recipe.ingredients.push(updates.ingredients)
        recipe.updatedAt = moment().valueOf()
    }
    if (typeof updates.recipeSteps === 'string') {
        recipe.recipeSteps = updates.recipeSteps
        recipe.updatedAt = moment().valueOf()
    }
    saveRecipes()
    return recipe
}

export {
    loadRecipes,
    getRecipes,
    createRecipes,
    removeRecipes,
    updateRecipe,
    sortRecipes,
    removeIngredient,
    updateIngredient
}