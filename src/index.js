import {createRecipes, loadRecipes,updateRecipe} from './resep'
import {renderRecipes} from "./views";
import {setFilters} from "./filters";
import moment from "moment";

const filterEl = document.querySelector('#filter-by')
const createNewRecipeEl = document.querySelector('#create-new-recipe')
const searchRecipeEl = document.querySelector('#search-recipe')

// updateRecipe("f9636639-d91d-4b69-86ed-57937caaf61c",{
//     title:'Jengkol Semur',
//     recipeSteps:'Disemur',
//     ingredients:{ingredient:'Air',completed:false}
// })

const co = [{a:'a'},{b:'b'},{c:'c'}]
co.splice(1,1)
console.log(co)

renderRecipes()

createNewRecipeEl.addEventListener('click', (e) => {
    const id = createRecipes()
    renderRecipes()
})
filterEl.addEventListener('change', (e) => {
    setFilters({
        sortBy: e.target.value
    })
    renderRecipes()
})
searchRecipeEl.addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderRecipes()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        loadRecipes()
        renderRecipes()
    }
})