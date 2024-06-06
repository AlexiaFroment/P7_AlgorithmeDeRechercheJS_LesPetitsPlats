class TagList {
  constructor() {
    this.arr = [];
    this.recipesApi = new ApiRecipes("../data/recipes.json");
  }

  async filteredTagList(arr, recipes) {
    const recipeData = await this.recipesApi.get();

    let arrIngredient = [];
    let arrAppliance = [];
    let arrUstensil = [];

    arr.forEach((val) => {
      // INGREDIENTS
      for (let recipe of recipes) {
        for (let ingredient of recipe.ingredients) {
          if (val.valueId === ingredient.ingredient) {
            const isIngredient = val.type === "ingr";
            if (isIngredient) {
              arrIngredient.push(val.valueId);
            }
          }
        }
      }
      // APPLIANCES
      for (let recipe of recipes) {
        if (val.valueId === recipe.appliance) {
          const isAppliance = val.type === "app";
          if (isAppliance) {
            arrAppliance.push(val.valueId);
          }
        }
      }
      // USTENSILS
      for (let recipe of recipes) {
        for (let ustensil of recipe.ustensils) {
          if (val.valueId.toLowerCase() === ustensil.toLowerCase()) {
            const isUstensil = val.type === "ust";
            if (isUstensil) {
              arrUstensil.push(val.valueId.toLowerCase());
            }
          }
        }
      }
    });

    let result = [...arrIngredient, ...arrAppliance, ...arrUstensil];

    // FILTER DATA, DROPDOWN AND DISPLAY
    const searchInput = document.querySelector(".search_input input");
    const searchInputValue = searchInput.value.trim();

    if (searchInputValue === "") {
      // JE FILTRE SUR LE CALL API RECIPEDATA
      if (result.length === 0) {
        SecondMethodFilterRecipesMainSearch.displayRecipes(recipeData);
        SecondMethodFilterRecipesMainSearch.updateAllDropdowns(recipeData);
        // FilterRecipesMainSearch.displayRecipes(recipeData);
        // FilterRecipesMainSearch.updateAllDropdowns(recipeData);
      } else {
        let filteredRecipes = recipeData;

        let filterByIngredient = Dropdown.filteredRecipesByIngredient(
          arrIngredient,
          filteredRecipes
        );

        let filterByAppliance = Dropdown.filteredRecipesByAppliance(
          arrAppliance,
          filterByIngredient
        );

        let filterByUstensil = Dropdown.filteredRecipesByUstensil(
          arrUstensil,
          filterByAppliance
        );

        // console.log(
        //   "filteredRecipesAfterFilter",
        //   filteredRecipes,
        //   "filterByIngredient",
        //   filterByIngredient,
        //   "filterByAppliance",
        //   filterByAppliance,
        //   "filterByUstensil",
        //   filterByUstensil,
        //   "✅"
        // );
      }
    } else {
      // JE FILTRE SUR RECIPE
      if (result.length === 0) {
        // console.log(searchInputValue);
        // const originalArr = FilterRecipesMainSearch.filterRecipesManually(
        //   recipeData,
        //   searchInputValue
        // );
        // FilterRecipesMainSearch.displayRecipes(originalArr);
        // FilterRecipesMainSearch.updateAllDropdowns(originalArr);
        const originalArr =
          SecondMethodFilterRecipesMainSearch.filterRecipesManually(
            recipeData,
            searchInputValue
          );
        SecondMethodFilterRecipesMainSearch.displayRecipes(originalArr);
        SecondMethodFilterRecipesMainSearch.updateAllDropdowns(originalArr);
      } else {
        // let filteredRecipes = FilterRecipesMainSearch.filterRecipesManually(
        //   recipeData,
        //   searchInputValue
        // );
        let filteredRecipes =
          SecondMethodFilterRecipesMainSearch.filterRecipesManually(
            recipeData,
            searchInputValue
          );

        let filterByIngredient = Dropdown.filteredRecipesByIngredient(
          arrIngredient,
          filteredRecipes
        );

        let filterByAppliance = Dropdown.filteredRecipesByAppliance(
          arrAppliance,
          filterByIngredient
        );

        let filterByUstensil = Dropdown.filteredRecipesByUstensil(
          arrUstensil,
          filterByAppliance
        );

        // console.log(
        //   "filteredRecipesAfterFilter",
        //   filteredRecipes,
        //   "filterByIngredient",
        //   filterByIngredient,
        //   "filterByAppliance",
        //   filterByAppliance,
        //   "filterByUstensil",
        //   filterByUstensil,
        //   "✅"
        // );
      }
    }
  }

  // DELETE TAG IN DOM
  deleteTagInDOM(id, recipes, value, e) {
    e.preventDefault();
    const index = this.arr.findIndex((tag) => Utils.fixId(tag.valueId) === id); // tag.valueId === id);
    if (index !== -1) {
      this.arr.splice(index, 1);
      this.updateCloseBtn(recipes, value);
      this.updateTagDisplay(recipes);
    }
  }
  // UPDATE CLOSE BTN WHEN I DELETE TAG IN DOM
  updateCloseBtn(recipes, value) {
    const closeButtons = document.querySelectorAll(".close");

    closeButtons.forEach((closeBtn) => {
      const id = closeBtn.id;
      closeBtn.removeEventListener("click", this.deleteTagInDOM.bind);
      closeBtn.addEventListener("click", (e) =>
        this.deleteTagInDOM(id, recipes, value, e)
      );
    });
  }
  // DISPLAY TAG IN DOM
  updateTagDisplay(recipes, value) {
    const tagDiv = document.querySelector("#tag");
    tagDiv.innerHTML = "";

    this.arr.forEach((val) => {
      const tag = this.createTag(val.valueId, val.type);
      tagDiv.appendChild(tag);
    });

    this.updateCloseBtn(recipes, value);
    this.filteredTagList(this.arr, recipes);
  }
  // CHECK IF VALUE EXISTS BEFORE ADD IN ARRAY
  checkValueExists(valueId, type) {
    return this.arr.some(
      (value) => value.valueId === valueId && value.type === type
    );
  }
  // ADD TAG IN DOM
  toggleIsActive(eventOrValue, recipes, type) {
    const value =
      eventOrValue instanceof Event ? eventOrValue.target : eventOrValue;
    const valueId = value.id;

    console.log(valueId);

    const tagExists = this.checkValueExists(valueId, type);
    if (!tagExists) {
      this.arr.push({ valueId, type });
    }

    // console.log("this.arr", this.arr, "✅");

    this.updateTagDisplay(recipes, value);
  }

  createTag(value, type) {
    let id = Utils.fixId(value);
    let $wrapper = document.createElement("button");
    $wrapper.id = `${value}`;
    $wrapper.className = `tag btn btn-yellow d-block my-2 d-flex justify-content-between ${type}`;
    let btn = `${value}
            <span class="close" id="${id}"> X <span>`;
    $wrapper.innerHTML = btn;
    return $wrapper;
  }
}
