class RecipeCard {
  constructor(recipe) {
    this.recipe = recipe;
  }
  createRecipeCard() {
    const $wrapper = document.createElement("div");
    $wrapper.className = "col";
    const recipeCard = `
    <div class="card">
    <img src="assets/imgCard/${this.recipe.image}" class="imgRecipe card-img-top d-block w-100" alt="${this.recipe.name}">
    <div class="card-body">
        <h3 class="card-title pb-3 fs-5 fw-bold">${this.recipe.name}</h3>
        <span class="card-text fs-6">RECETTE</span>
        <div id="recipe_details">
          <p class="card-text">${this.recipe.description}</p>
        </div>
        <span class="card-text fs-6">INGREDIENTS</span>
        <ul style="height: 150px; border: 1px solid #333;">
          <li class="card-text">${this.recipe.ingredients[0]}</li>
        </ul>
      
    </div>
    </div>
    `;
    $wrapper.innerHTML = recipeCard;
    return $wrapper;
  }
}
