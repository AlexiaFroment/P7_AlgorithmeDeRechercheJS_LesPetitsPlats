class Dropdown {
  constructor(recipe, ingredient, appliance, ustensil) {
    this.recipe = recipe;
    this.ingredient = ingredient;
    this.appliance = appliance;
    this.ustensil = ustensil;
    this.dropdown = new TagList();
    this.arr = [];
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

    // console.log(
    //   "arrValues",
    //   arrValues,
    //   "=> tableau avec toutes les valeurs du dropdown sous forme de string",
    //   "✅"
    // );

    const dropdown = this.dropdown;
    //   // SWITCH TOGGLEISACTIVE TO SUBMIT ✅
    search.addEventListener("submit", function (e, dropdown) {
      e.preventDefault();

      const searchValue = Utils.strNoAccent(
        search.querySelector("input").value
      );

      // console.log(
      //   "searchValue",
      //   searchValue,
      //   "ingredient tapé dans l'input",
      //   "✅"
      // );
      console.log("arrYAvantForEach", this.arr, "✅");

      arrValues.forEach((value, index) => {
        const val = Utils.strNoAccent(value.toLowerCase());

        if (val === searchValue) {
          console.log("match", val, searchValue, "✅");
          const node = nodeList[index];
          console.log("node", node, "✅");
          console.log("arrYAvantPush", this.arr, "✅");

          dropdown.toggleIsActive(node, this.recipe, "ingr", this.arr);

          // console.log("node", node, this.recipe, "ingr", "✅");
          console.log("arr", this.arr, "✅");
          console.log("search", search);
          search.querySelector("input").value = "";
        }
      });
    });
  }

  static filteredRecipesByAllDropdowns(arr, recipes) {
    Dropdown.filteredRecipesByIngredient(arr, recipes);
    Dropdown.filteredRecipesByAppliance(arr, recipes);
    Dropdown.filteredRecipesByUstensil(arr, recipes);
  }
  // MEP FILTER ON RECIPESDATA TO DISPLAY RECIPES BY INGREDIENT TAG ✅
  static filteredRecipesByIngredient(arr, recipes) {
    console.log("ingredients", arr.length, recipes);
    const recipesFiltered = [];
    console.log(
      "recipesFiltered",
      recipes,
      recipesFiltered,
      "liste des recettes filtrées",
      "✅"
    );

    for (let recipe of recipes) {
      let allValuesPresent = true;
      for (let ingredient of arr) {
        if (
          !recipe.ingredients.some(
            (recipeIngredient) => recipeIngredient.ingredient === ingredient
          )
        ) {
          // console.log("dropdown", ingredient, "✅");
          allValuesPresent = false;
          break;
        }
      }
      if (allValuesPresent) {
        recipesFiltered.push(recipe);
      }
    }
    FilterRecipesMainSearch.updateAllDropdowns(recipesFiltered);
    FilterRecipesMainSearch.displayRecipes(recipesFiltered);
    return recipesFiltered;
  }

  static filteredRecipesByAppliance(arr, recipes) {
    const recipesFiltered = recipes.filter((recipe) => {
      return arr.every((value) => recipe.appliance === value);
    });
    FilterRecipesMainSearch.updateAllDropdowns(recipesFiltered);
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
    FilterRecipesMainSearch.updateAllDropdowns(recipesFiltered);
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
