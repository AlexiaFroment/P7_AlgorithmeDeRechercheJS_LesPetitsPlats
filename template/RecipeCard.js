/**
 * Create each card in the json file ✅
 * Create a list of ingredients for each card ✅
 * Create a list of ingredients qty for each card ✅
 *    Don't display undefined qty 🟥
 * Display each ingredient of the recipe 🟥
 * Display each ingredient qty of the recipe 🟥
 */
class RecipeCard {
  constructor(recipe) {
    this.recipe = recipe;
  }

  // Create card
  createRecipeCard() {
    const $wrapper = document.createElement("div");
    $wrapper.className = "col";

    const recipeCard = `
    <div class="card">
    <img src="assets/imgCard/${this.recipe.image}" 
    class="imgRecipe card-img-top d-block w-100" 
    alt="${this.recipe.name}">
    <div class="card-body">
      <h3 class="anton card-title pb-3 fs-5 fw-bold">${this.recipe.name}</h3>
      <span class="subtitle card-text text-darkGrey fs-6 fw-bold">RECETTE</span>
      <div id="recipe_details">
        <p class="card-text">${this.recipe.description}</p>
      </div>

      <span class="subtitle card-text text-darkGrey fs-6 fw-bold">INGREDIENTS</span>
      <div class="container">
      <ul class="row" id="recipe_ingredients">

      ${this.recipe.ingredients
        .map(
          (item) => `
      <li class="col-6 p-0 g-3"> 
      <span class="ingredient">${item.ingredient} </span> <br/>
      <span class="qty text-darkGrey">${item.quantity ? item.quantity : ""} ${
            item.unit ? item.unit : ""
          }</span>
      </li>
    `
        )
        .join("")}
      
      </ul>
    </div>
    </div>
    `;

    $wrapper.innerHTML = recipeCard;
    return $wrapper;
  }
}
