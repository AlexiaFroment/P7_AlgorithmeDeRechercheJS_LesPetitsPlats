class Index {
  constructor() {
    // call API to get data
    this.recipesApi = new ApiRecipes("./data/recipes.json");
  }

  // METHODS
  capitalize(str) {
    const capitalize = str.charAt(0).toLowerCase() + str.slice(1);
    return capitalize;
  }

  uniqItem(arr) {
    return arr.filter((x, i) => arr.indexOf(x) === i);
  }

  sortAlpha(a, b) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * METHODS FILTER
   *  🟢 BY RECIPES
   *  🔴 BY INGREDIENTS
   *  🟢 BY APPLIANCE
   *  🔴 BY USTENSILS
   * */

  async filterRecipes() {
    const recipesData = await this.recipesApi.get();
    let recipesDataFilter = [...recipesData];

    // Sort in alphabetical order
    // console.log(recipesData);
    // recipesData.sort(this.sortAlpha(name));
    // console.log(recipesData);
    recipesDataFilter.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });

    const searchInput = document.querySelector(".search_input");
    const recipesSection = document.querySelector("#recipe");
    const numberOfRecipes = document.querySelector("#number_recipes");

    searchInput.addEventListener("input", (e) => {
      // Regex pour supprimer les accents
      const regex = /[a7y]/gi;
      console.log(regex.test("bC2t"));
      // console.log("AbC".match(/ab/gi));
      // Delete current DOM
      recipesSection.innerHTML = "";
      numberOfRecipes.innerHTML = "";
      // Value entered in the input
      let searchedItem = e.target.value.toLowerCase();
      // Create new arr to store the sort items
      let filteredRecipeData = [];
      recipesDataFilter.filter((recipeData) => {
        // Recipe_name
        const name = recipeData.name.toLowerCase().includes(searchedItem);

        // Ingredients
        const ingredient = () => {
          for (let i = 0; i < recipeData.ingredients.length; i++) {
            let ingr = recipeData.ingredients[i].ingredient.toLowerCase();
            if (ingr !== searchedItem) {
              return;
            }

            const ingredientSearch = ingr.includes(searchedItem);
            // console.log(
            //   ingr,
            //   searchedItem,
            //   "ingredient recherché :",
            //   ingredientSearch
            // );
            return ingredientSearch;
          }
        };

        // Appliance
        const appliance = recipeData.appliance
          .toLowerCase()
          .includes(searchedItem);
        // Ustensils

        const ustensils = () => {
          for (let i = 0; i < recipeData.ustensils.length; i++) {
            console.log(recipeData.ustensils);
            const ust = recipeData.ustensils[i].toLowerCase();
            if (ust !== searchedItem) {
              console.log("Ca ne match pas 🤖", ust, searchedItem);

              return;
            }
            console.log("Ca match 🎉", ust, searchedItem);
            const ustensilSearch = ust.includes(searchedItem);
            return ustensilSearch;
          }
        };

        if (name || appliance || ingredient() || ustensils()) {
          filteredRecipeData.push(recipeData);
          console.log("tablo", filteredRecipeData);
        }
      });

      // Create new DOM with filtered data
      const number = filteredRecipeData.length;
      const templateCount = new List(null, null, null, number);
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
          // console.log(filteredRecipeData);
          const templateCard = new RecipeCard(recipe, ingredientsList, qtyList);
          recipesSection.appendChild(templateCard.createRecipeCard());
        });
      }
    });
  }

  // GET INGREDIENTS
  async ingredients() {
    const recipesData = await this.recipesApi.get();
    const filteredArr = recipesData.map((el) => el.ingredients);

    let list1 = [];
    filteredArr.forEach((ingredient) => {
      for (let i = 0; i < ingredient.length; i++) {
        list1.push(ingredient[i].ingredient);
      }
    });

    list1.sort(this.sortAlpha);
    const uniqList = this.uniqItem(list1);

    const btn1 = document.querySelector("#list1");
    uniqList.forEach((ingredient) => {
      const template = new List(ingredient);
      btn1.appendChild(template.createIngredientsList());
    });
  }

  // GET APPLIANCES
  async appliance() {
    const recipesData = await this.recipesApi.get();
    let filteredArr = recipesData.map((el) => el.appliance);
    filteredArr.sort(this.sortAlpha);
    let list2 = filteredArr;
    let uniqList = this.uniqItem(list2);

    const btn2 = document.querySelector("#list2");
    uniqList.forEach((appliance) => {
      const template = new List(null, appliance, null);
      btn2.appendChild(template.createApplianceList());
    });
  }

  // GET USTENSILS
  async ustensils() {
    const recipesData = await this.recipesApi.get();
    let filteredArr = recipesData.map((el) => el.ustensils);

    let list3 = [];
    filteredArr.forEach((ustensil) => {
      for (let i = 0; i < ustensil.length; i++) {
        list3.push(ustensil[i]);
      }
    });
    let capitalizeList3 = list3.map((el) => this.capitalize(el));
    capitalizeList3.sort(this.sortAlpha);
    let uniqList = this.uniqItem(capitalizeList3);
    const btn3 = document.querySelector("#list3");
    uniqList.forEach((ustensil) => {
      const template = new List(null, null, ustensil);
      btn3.appendChild(template.createUstensilsList());
    });
  }

  // GET NUMBER OF RECIPES DISPLAY
  async numberOfRecipes() {
    const recipesData = await this.recipesApi.get();
    const number = recipesData.length;

    const numOfRecipes = document.querySelector("#number_recipes");

    const template = new List(null, null, null, number);
    numOfRecipes.appendChild(template.createCountList());
  }

  // GET RECIPES
  async recipes() {
    const recipesData = await this.recipesApi.get();
    const recipesSection = document.querySelector("#recipe");

    recipesData.forEach((recipe) => {
      const template = new RecipeCard(recipe);
      recipesSection.appendChild(template.createRecipeCard());
    });
  }

  async init() {
    await this.filterRecipes();
    // await this.filterIngredients();
    await this.ingredients();
    await this.appliance();
    await this.ustensils();
    await this.numberOfRecipes();
    await this.recipes();
  }
}

const index = new Index();
index.init();
