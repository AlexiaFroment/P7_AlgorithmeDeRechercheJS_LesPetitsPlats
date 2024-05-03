class Dropdown {
  constructor(recipe, ingredient, appliance, ustensil) {
    this.recipe = recipe;
    this.ingredient = ingredient;
    this.appliance = appliance;
    this.ustensil = ustensil;
    this.dropdown = new TagList();
  }

  searchDropdown() {
    const search = document.getElementById("searchL1");
    // ARRVALUES = INGREDIENTS LIST IN THE DROPDOWN
    const arrValues = [];
    const nodeList = document.querySelectorAll("#List1 li a");
    nodeList.forEach((node) => {
      let nodeValue = node.innerText.trim();
      arrValues.push(nodeValue);
    });

    // SWITCH TOGGLEISACTIVE TO SUBMIT
    search.addEventListener("submit", (e) => {
      // console.log("search", search, "✅");
      e.preventDefault();

      const searchValue = Utils.strNoAccent(
        search.querySelector("input").value
      );
      // console.log("searchValue", searchValue, "✅");
      arrValues.forEach((value, index) => {
        // NE MATCHE PAS SUR LES MOTS COMPOSE (MATCH ET INCLUDES PARTENT EN BOUCLE INFINIE)
        if (value.toLowerCase() === searchValue.toLowerCase()) {
          // console.log(value.toLowerCase(), searchValue.toLowerCase());
          const node = nodeList[index];
          const recipesData = this.recipe;
          // console.log("node", node);

          // const tag = new TagList();
          console.log(this.dropdown);
          this.dropdown.toggleIsActive(node, recipesData, "ingr");
          console.log("dropdown", this.dropdown);
          // console.log(value, this.recipe, "✅");
          search.querySelector("input").value = "";
        }
        return;
      });
    });
  }

  // MEP FILTER ON RECIPESDATA TO DISPLAY RECIPES BY INGREDIENT TAG
  static filteredRecipesByIngredient(arr, recipes) {
    console.log("ingredients", arr.length);
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
    FilterRecipesMainSearch.displayRecipes(recipesFiltered);
    return recipesFiltered;
  }

  static filteredRecipesByAppliance(arr, recipes) {
    const recipesFiltered = recipes.filter((recipe) => {
      return arr.every((value) => recipe.appliance === value);
    });
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

    this.searchDropdown();
    return $wrapper;
  }
}
