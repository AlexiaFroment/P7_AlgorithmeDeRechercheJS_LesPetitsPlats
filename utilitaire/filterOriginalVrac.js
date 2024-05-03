let recipesDataFilter = [...recipesData];

Utils.sortArr(recipesDataFilter, "name");

const searchInput = document.querySelector(".search_input");
const recipesSection = document.querySelector("#recipe");
const numberOfRecipes = document.querySelector("#number_recipes");

searchInput.addEventListener("input", (e) => {
  // Delete current DOM
  recipesSection.innerHTML = "";
  numberOfRecipes.innerHTML = "";
  // Value entered in the input convert without accent and toLowerCase()
  let searchedItem = Utils.strNoAccent(e.target.value.toLowerCase());

  // Create new arr to store the sort items
  let filteredRecipeData = [];
  recipesDataFilter.filter((recipeData) => {
    // Recipe_name convert without accent and toLowerCase() and check it matches with the searchItem
    const nameStandardised = Utils.strNoAccent(recipeData.name.toLowerCase());
    const name = nameStandardised.includes(searchedItem);

    // Convert all values (ingredients, appliances, ustensils) without accent and toLowerCase() and check it matches with the searchItem
    const ingredient = () => {
      for (const ingredient of recipeData.ingredients) {
        const ingr = Utils.strNoAccent(ingredient.ingredient.toLowerCase());
        if (ingr === searchedItem) {
          return ingr;
        }
      }
    };

    const applianceStandardised = Utils.strNoAccent(
      recipeData.appliance.toLowerCase()
    );
    const appliance = applianceStandardised.includes(searchedItem);

    const ustensils = () => {
      for (const ustensil of recipeData.ustensils) {
        const ustensilStandardised = Utils.strNoAccent(ustensil.toLowerCase());
        if (ustensilStandardised === searchedItem) {
          return ustensilStandardised;
        }
      }
    };

    if (name || appliance || ingredient() || ustensils()) {
      filteredRecipeData.push(recipeData);
    }
  });

  // Create new DOM with filtered data
  const number = filteredRecipeData.length;
  const templateCount = new List(number);
  numberOfRecipes.appendChild(templateCount.createCountList());

  if (number === 50) {
    recipesData.forEach((recipe, ingredient, qty) => {
      let ingredientsAndQtyList = [];

      for (let i = 0; i < recipe.ingredients.length; i++) {
        ingredient = recipe.ingredients[i].ingredient;
        qty = recipe.ingredients[i].quantity;
        ingredientsAndQtyList.push(ingredient);
        ingredientsAndQtyList.push(qty);
      }

      const template = new RecipeCard(recipe, ingredientsAndQtyList);
      recipesSection.appendChild(template.createRecipeCard());
    });
  } else {
    filteredRecipeData.forEach((recipe, ingredient, qty) => {
      let ingredientsList = [];
      let qtyList = [];
      for (let i = 0; i < recipe.ingredients.length; i++) {
        ingredient = recipe.ingredients[i].ingredient;
        ingredientsList.push(ingredient);
        qty = recipe.ingredients[i].quantity;
        qtyList.push(qty);
      }

      const templateCard = new RecipeCard(recipe, ingredientsList, qtyList);
      recipesSection.appendChild(templateCard.createRecipeCard());
    });
  }
});
