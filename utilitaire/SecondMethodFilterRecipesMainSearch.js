class SecondMethodFilterRecipesMainSearch {
  static init() {
    this.dropdown = new TagList();
  }

  static filterRecipesByInput(recipes) {
    console.log("recipes", recipes);
    const searchInput = document.querySelector(".search_input");
    const recipesSection = document.querySelector("#recipe");
    const numberOfRecipes = document.querySelector("#number_recipes");

    // SORT BY  NAME ✅
    const originalArr = [...recipes];
    Utils.sortLocaleCompare(recipes);
    // console.log("localcompare", recipes, "✅");

    searchInput.addEventListener("input", (e) => {
      // Delete current DOM
      recipesSection.innerHTML = "";
      numberOfRecipes.innerHTML = "";
      // Value entered in the input convert without accent and toLowerCase()
      let searchedItem = Utils.strNoAccent(e.target.value.toLowerCase().trim());
      let startToSearch = searchedItem.length >= 3;
      // Create new arr to store the sort items
      let filteredRecipeData = [];

      if (startToSearch) {
        filteredRecipeData = recipes.filter((recipeData) => {
          // SORT BY NAME ✅
          const nameStandardised = Utils.strNoAccent(
            recipeData.name.toLowerCase()
          );
          if (nameStandardised.match(searchedItem)) {
            return true;
          }

          // SORT BY INGREDIENTS ✅
          let matchingIngredient = recipeData.ingredients.some((ingredient) => {
            let ingr = Utils.strNoAccent(ingredient.ingredient.toLowerCase());
            let search = Utils.strNoAccent(searchedItem.toLowerCase());
            return ingr.includes(search);
          });
          if (matchingIngredient) {
            return true;
          }

          // SORT BY DESCRIPTION ✅
          const regex = new RegExp(searchedItem, "gi");
          const descriptionStandardised = Utils.strNoAccent(
            recipeData.description.toLowerCase()
          );
          // return regex.test(descriptionStandardised);
          return regex.exec(descriptionStandardised);
        });
      } else {
        filteredRecipeData = originalArr;
      }

      // Crée le nouveau DOM avec les données filtrées
      const number = filteredRecipeData.length;

      if (number === 50) {
        FilterRecipesMainSearch.displayRecipes(originalArr);
        FilterRecipesMainSearch.updateAllDropdowns(originalArr);
      } else {
        FilterRecipesMainSearch.displayRecipes(filteredRecipeData);
        FilterRecipesMainSearch.updateAllDropdowns(filteredRecipeData);
      }
    });
  }
}

SecondMethodFilterRecipesMainSearch.init();
