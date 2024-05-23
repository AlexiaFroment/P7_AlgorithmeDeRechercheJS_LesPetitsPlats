class Dropdown {
  constructor(recipe, ingredient, appliance, ustensil, dropdown) {
    this.recipe = recipe;
    this.ingredient = ingredient;
    this.appliance = appliance;
    this.ustensil = ustensil;
    this.tagList = dropdown;
    // this.dropdown = new TagList();
    // this.arr = [];
  }

  handleSearchSubmit(search, nodeList, arrValues, e) {
    e.preventDefault();
    const recipes = this.recipe;
    const searchValue = Utils.strNoAccent(search.querySelector("input").value);

    arrValues.forEach((value, index) => {
      const val = Utils.strNoAccent(value.toLowerCase());

      if (val === searchValue) {
        const node = nodeList[index];

        this.tagList.toggleIsActive(node, recipes, "ingr");
        // DELETE VALUE IN INPUT SEARCH
        search.querySelector("input").value = "";
        // CLOSE DROPDOWN MENU
        const dropdown = document.querySelector(".dropdown-menu");
        if (dropdown) {
          dropdown.classList.remove("show");
        }
      }
    });
  }

  searchDropdown(searchId, listId) {
    const search = document.getElementById(searchId);
    // ARRVALUES = INGREDIENTS LIST IN THE DROPDOWN
    const arrValues = [];
    const nodeList = document.querySelectorAll(`#${listId} li a`);

    nodeList.forEach((node) => {
      let nodeValue = node.innerText.trim();
      arrValues.push(nodeValue);
    });

    search.addEventListener(
      "submit",
      this.handleSearchSubmit.bind(this, search, nodeList, arrValues)
    );
  }

  static filteredRecipesByAllDropdowns(arr, recipes) {
    Dropdown.filteredRecipesByIngredient(arr, recipes);
    Dropdown.filteredRecipesByAppliance(arr, recipes);
    Dropdown.filteredRecipesByUstensil(arr, recipes);
  }
  // MEP FILTER ON RECIPESDATA TO DISPLAY RECIPES BY INGREDIENT TAG ✅
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

    FilterRecipesMainSearch.DropdownIngredients(recipesFiltered);
    FilterRecipesMainSearch.displayRecipes(recipesFiltered);
    return recipesFiltered;
  }

  static filteredRecipesByAppliance(arr, recipes) {
    const recipesFiltered = recipes.filter((recipe) => {
      return arr.every((value) => recipe.appliance === value);
    });

    FilterRecipesMainSearch.DropdownAppliances(recipesFiltered);
    FilterRecipesMainSearch.displayRecipes(recipesFiltered);
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
    FilterRecipesMainSearch.DropdownUstensils(recipesFiltered);
    FilterRecipesMainSearch.displayRecipes(recipesFiltered);
    return recipesFiltered;
  }

  // CREATE DROPDOWN
  createDropdown(value) {
    const $wrapper = document.createElement("li");
    const valuesList = `
        <a class="dropdown-item px-0" href="#" id="${value}"> ${value}  </a>
        `;
    $wrapper.innerHTML = valuesList;

    this.searchDropdown("searchL1", "List1");
    return $wrapper;
  }
}
