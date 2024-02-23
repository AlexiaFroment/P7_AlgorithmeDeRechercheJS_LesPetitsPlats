/**
 * Create each card in the json file ✅
 * Create a list of ingredients for each card ✅
 * Create a list of ingredients qty for each card ✅
 *    Don't display undefined qty 🟥
 * Display each ingredient of the recipe 🟥
 * Display each ingredient qty of the recipe 🟥
 */
class RecipeCard {
  constructor(recipe, ingredientsAndQtyList) {
    this.recipe = recipe;
    this.ingredientsAndQtyList = ingredientsAndQtyList;

    // console.log(this);
  }

  // Create card
  createRecipeCard() {
    // console.log(this);

    const $wrapper = document.createElement("div");
    $wrapper.className = "col";

    const recipeCard = `
    <div class="card">
    <img src="assets/imgCard/${this.recipe.image}" class="imgRecipe card-img-top d-block w-100" alt="${this.recipe.name}">
    <div class="card-body">
      <h3 class="anton card-title pb-3 fs-5 fw-bold">${this.recipe.name}</h3>
      <span class="card-text fs-6">RECETTE</span>
      <div id="recipe_details">
        <p class="card-text">${this.recipe.description}</p>
      </div>
      <span class="ingredients card-text fs-6">INGREDIENTS</span>
      
      <ul id="recipe_ingredients">
     
      </ul>
     
    </div>
    </div>
    `;

    const details = document.querySelector("#recipe_ingredients");
    console.log(details);

    this.ingredientsAndQtyList.forEach((ingredient) => {
      console.log(ingredient);
      let li = document.createElement("li");
      li.innerHTML = ingredient;
      console.log(details);
      // details.appendChild(li);
    });

    $wrapper.innerHTML = recipeCard;
    return $wrapper;
  }
}
