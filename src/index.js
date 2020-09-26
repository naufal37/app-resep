import {createRecipes, loadRecipes} from './resep'
import {renderRecipes} from "./views";
import {setFilters} from "./filters";

const filterEl = document.querySelector('#filter-by')
const createNewRecipeEl = document.querySelector('#create-new-recipe')
const searchRecipeEl = document.querySelector('#search-recipe')

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