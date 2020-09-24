const baseEndpoint = `http://www.recipepuppy.com/api`;
const proxyServer = `https://cors-anywhere.herokuapp.com/`;
const form = document.querySelector('form.search');
const recipeWrapper = document.querySelector('.recipes');

async function fetchRecipes(query, ingredients = '') {
  const resp = await fetch(`${proxyServer}${baseEndpoint}?q=${query}&i=${ingredients}`);
  const data = await resp.json();
  // console.log(data);
  return data;
}

async function handleSubmit(e) {
  e.preventDefault();
  const formEl = e.currentTarget;
  console.log('query: ',formEl.query.value, 'ingredients: ',formEl.ingredients.value);
  fetchAndDisplay(formEl.query.value, formEl.ingredients.value);
}

async function fetchAndDisplay(query, ingredients) {
  // turn the form off
  form.submit.disabled = true;
  // submit the search
  const recipes = await fetchRecipes(query, ingredients);
  console.log('recipe results: ', recipes.results);
  form.submit.disabled = false;
  displayRecipes(recipes.results);
}



function displayRecipes(recipes) {
  console.log("Creating HTML");
  const html = recipes
    .map(
      recipe => {
        return `<div class="recipe">
        <h2>${recipe.title}</h2>
        <p>${recipe.ingredients}</p>
        ${recipe.thumbnail && `<img src="${recipe.thumbnail}" alt="Photo of ${recipe.title}">`}
        <a class="recipe-link" href="${recipe.href}">View Recipe ⟹</a>
        </div>`
      }
    )
    .join('');
  recipeWrapper.innerHTML = html;
}

form.addEventListener('submit', handleSubmit);

// on page load, run with pizza
fetchAndDisplay('pizza');

 // TO DO
 /*
  input box for comma delimited ingredients
  perhaps checkboxes of ingredients?


 */
