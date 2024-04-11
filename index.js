class Index {
  constructor() {
    // call API to get data
    this.recipesApi = new ApiRecipes("./data/recipes.json");
  }

  /**
   * METHODS FILTER
   *  🟢 BY RECIPES
   *  🟢 BY INGREDIENTS
   *  🟢 BY APPLIANCE
   *  🟢 BY USTENSILS
   * */

  async filterRecipes() {
    const recipesData = await this.recipesApi.get();
    let recipesDataFilter = [...recipesData];

    Utils.sortArr(recipesDataFilter, "name");
    console.log(recipesDataFilter);

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
        const nameStandardised = Utils.strNoAccent(
          recipeData.name.toLowerCase()
        );
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
            const ustensilStandardised = Utils.strNoAccent(
              ustensil.toLowerCase()
            );
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
  }

  // CREATE INGREDIENTS DROPDOWN
  async ingredients() {
    const recipesData = await this.recipesApi.get();

    const filteredArr = recipesData.map((el) => el.ingredients);

    let list1 = [];
    filteredArr.forEach((ingredient) => {
      for (let i = 0; i < ingredient.length; i++) {
        list1.push(ingredient[i].ingredient);
      }
    });

    let capitalizeList1 = list1.map((el) => Utils.capitalize(el));

    Utils.sortArr(capitalizeList1);

    const uniqList = Utils.uniqItem(capitalizeList1);

    const btn1 = document.getElementById("List1");
    uniqList.forEach((ingredient) => {
      const template = new IngredientsList(ingredient, recipesData);
      btn1.appendChild(template.createIngredientsList());
    });

    // const dropDownIngredient = new TagList();
    const dropDownIngredient = new IngredientsList();
    const List1 = document.getElementById("List1");
    const tagDiv = document.getElementById("tag");
    const arr = [];

    List1.addEventListener("click", function (e) {
      e.preventDefault();
      tagDiv.innerHTML = "";
      arr.push(e.target.id);
      dropDownIngredient.toggleIsActive(e, arr, recipesData, uniqList);
    });
  }

  // CREATE APPLIANCE DROPDOWN
  async appliance() {
    const recipesData = await this.recipesApi.get();

    let filteredArr = recipesData.map((el) => el.appliance);
    let capitalizeList2 = filteredArr.map((el) => Utils.capitalize(el));
    Utils.sortArr(capitalizeList2);

    const btn2 = document.getElementById("List2");
    let uniqList = Utils.uniqItem(filteredArr);

    uniqList.forEach((appliance) => {
      const template = new AppliancesList(appliance, recipesData);
      btn2.appendChild(template.createApplianceList());
    });

    // ⚠️ TAG CLASS
    const dropDownAppliance = new AppliancesList();
    const List2 = document.getElementById("List2");
    const tagDiv = document.getElementById("tag");
    const arr = [];

    List2.addEventListener("click", function (e) {
      e.preventDefault();
      tagDiv.innerHTML = "";
      arr.push(e.target.id);
      dropDownAppliance.toggleIsActive(e, arr, recipesData, uniqList);
    });
  }

  // CREATE USTENSILS DROPDOWN
  async ustensils() {
    const recipesData = await this.recipesApi.get();
    let filteredArr = recipesData.map((el) => el.ustensils);

    let list3 = [];
    filteredArr.forEach((ustensil) => {
      for (let i = 0; i < ustensil.length; i++) {
        list3.push(ustensil[i]);
      }
    });
    let capitalizeList3 = list3.map((el) => Utils.capitalize(el));

    Utils.sortArr(capitalizeList3);

    let uniqList = Utils.uniqItem(capitalizeList3);

    const btn3 = document.getElementById("List3");
    uniqList.forEach((ustensil) => {
      const template = new UstensilsList(ustensil, recipesData);
      btn3.appendChild(template.createUstensilsList());
    });

    // ⚠️ MEP ON CLASS TAGLIST
    const dropDownUstensil = new UstensilsList();
    const List3 = document.getElementById("List3");
    const tagDiv = document.getElementById("tag");
    const arr = [];

    List3.addEventListener("click", function (e) {
      e.preventDefault();
      tagDiv.innerHTML = "";
      arr.push(e.target.id);
      dropDownUstensil.toggleIsActive(e, arr, recipesData, uniqList);
    });
  }

  // GET NUMBER OF RECIPES DISPLAY
  async numberOfRecipes() {
    const recipesData = await this.recipesApi.get();
    const number = recipesData.length;

    const numOfRecipes = document.querySelector("#number_recipes");

    const template = new List(number);
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
    await this.ingredients();
    await this.appliance();
    await this.ustensils();
    await this.numberOfRecipes();
    await this.recipes();
  }
}

const index = new Index();
index.init();
