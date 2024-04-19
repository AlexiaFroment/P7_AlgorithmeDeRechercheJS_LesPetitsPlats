class Dropdown {
  constructor(recipe, ingredient, appliance, ustensil) {
    this.recipe = recipe;
    this.ingredient = ingredient;
    this.appliance = appliance;
    this.ustensil = ustensil;
  }

  // DISPLAY RECIPES FILTERED
  static displayFilteredRecipes(arr) {
    const numberOfRecipes = document.getElementById("number_recipes");
    const recipesCards = document.getElementById("recipe");

    const number = arr.length;

    numberOfRecipes.innerHTML = "";
    recipesCards.innerHTML = "";

    const templateCount = new List(number);
    numberOfRecipes.appendChild(templateCount.createCountList());

    arr.forEach((recipe) => {
      const templateCard = new RecipeCard(recipe);
      recipesCards.appendChild(templateCard.createRecipeCard());
    });
  }

  // MEP FILTER ON RECIPESDATA TO DISPLAY RECIPES BY INGREDIENT TAG
  static filteredRecipesByIngredient(arr, recipes) {
    const recipesFiltered = [];

    for (let recipe of recipes) {
      let allValuesPresent = true;
      for (let ingredient of arr) {
        if (
          !recipe.ingredients.some(
            (recipeIngredient) => recipeIngredient.ingredient === ingredient
          )
        ) {
          allValuesPresent = false;
          break;
        }
      }
      if (allValuesPresent) {
        recipesFiltered.push(recipe);
      }
    }
    Dropdown.displayFilteredRecipes(recipesFiltered);
    return recipesFiltered;
  }

  static filteredRecipesByAppliance(arr, recipes) {
    const recipesFiltered = recipes.filter((recipe) => {
      return arr.every((value) => recipe.appliance === value);
    });
    Dropdown.displayFilteredRecipes(recipesFiltered);
    return recipesFiltered;
  }

  static filteredRecipesByUstensil(arr, recipes) {
    let recipesFiltered = [];

    if (arr.length === 0) {
      recipesFiltered = recipes;
    } else {
      recipes.forEach((recipe) => {
        let allValuesPresent = true;

        for (let val of arr) {
          const ustensilsLowerCase = recipe.ustensils.map((u) =>
            u.toLowerCase()
          );

          if (!ustensilsLowerCase.includes(val.toLowerCase())) {
            allValuesPresent = false;
            break;
          }
        }
        if (allValuesPresent) {
          recipesFiltered.push(recipe);
        }
      });
    }
    Dropdown.displayFilteredRecipes(recipesFiltered);
    return recipesFiltered;
  }

  // CREATE DROPDOWN
  createDropdown(value) {
    const $wrapper = document.createElement("li");
    const valuesList = `
      <a class="dropdown-item" href="#" id="${value}"> ${value}  </a>
      `;
    $wrapper.innerHTML = valuesList;
    return $wrapper;
  }
}
