class SecondMethodFilterRecipesMainSearch {
  static init() {
    this.dropdown = new TagList();
  }

  static filterRecipesByInput(recipes) {
    const searchInput = document.querySelector(".search_input");
    const recipesSection = document.querySelector("#recipe");
    const numberOfRecipes = document.querySelector("#number_recipes");

    // SORT BY  NAME ✅
    const originalArr = [...recipes];
    Utils.sortLocaleCompare(recipes);

    searchInput.addEventListener("input", (e) => {
      // DELETE CURRENT DOM
      recipesSection.innerHTML = "";
      numberOfRecipes.innerHTML = "";

      let searchedItem = Utils.strNoAccent(e.target.value.toLowerCase().trim());
      let startToSearch = searchedItem.length >= 3;

      // CREATE NEW ARR TO STORE THE SORT ITEMS
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
          return regex.exec(descriptionStandardised);
        });
      } else {
        filteredRecipeData = originalArr;
      }

      // CREATE NEW DOM WITH THE FILTERED DATA
      const number = filteredRecipeData.length;

      if (number === 50) {
        FilterRecipesMainSearch.displayRecipes(originalArr);
        FilterRecipesMainSearch.updateAllDropdowns(originalArr);
      } else {
        FilterRecipesMainSearch.displayRecipes(filteredRecipeData);
        FilterRecipesMainSearch.updateAllDropdowns(filteredRecipeData);
      }
    });

    // DELETE VALUE IN INPUT
    const searchInputValue = searchInput.querySelector("input");

    searchInputValue.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        searchInputValue.value = "";
      }
    });
  }
}

SecondMethodFilterRecipesMainSearch.init();
