class Index {
  constructor() {
    // call API to get data
    this.recipesApi = new ApiRecipes("./data/recipes.json");
  }

  // METHOD FILTER
  async filterRecipes() {
    const recipesData = await this.recipesApi.get();

    // Sort in alphabetical order
    recipesData.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });

    const recipesDataFilter = recipesData;
    const searchInput = document.querySelector(".search_input");
    const recipesSection = document.querySelector("#recipe");

    searchInput.addEventListener("input", (e) => {
      // Delete current DOM
      recipesSection.innerHTML = "";
      // Value entered in the input
      let searchedItem = e.target.value.toLowerCase();
      // Create new arr to store the sort items
      let filteredRecipeData = [];
      recipesDataFilter.filter((recipeData) => {
        if (recipeData.name.toLowerCase().includes(searchedItem)) {
          filteredRecipeData.push(recipeData);
        }
      });
      // Create new DOM with filtered data
      filteredRecipeData.forEach((recipe, ingredient, qty) => {
        let ingredientsList = [];
        let qtyList = [];
        for (let i = 0; i < recipe.ingredients.length; i++) {
          ingredient = recipe.ingredients[i].ingredient;
          ingredientsList.push(ingredient);
          qty = recipe.ingredients[i].quantity;
          qtyList.push(qty);
        }
        const template = new RecipeCard(recipe, ingredientsList, qtyList);
        recipesSection.appendChild(template.createRecipeCard());
      });
    });
  }

  // GET INGREDIENTS
  async ingredients() {
    const recipesData = await this.recipesApi.get();
    const filteredArr = recipesData.map((el) => el.ingredients);

    const btn1 = document.querySelector("#list1");
    const list1 = [];
    filteredArr.forEach((ingredient) => {
      for (let i = 0; i < ingredient.length; i++) {
        list1.push(ingredient[i].ingredient);
      }
    });

    list1.sort((a, b) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
    // console.log(list1);
    let uniqList = list1.filter((x, i) => list1.indexOf(x) === i);
    // console.log(uniqList);
    uniqList.forEach((ingredient) => {
      const template = new List(ingredient);
      btn1.appendChild(template.createIngredientsList());
    });
  }

  // GET RECIPES
  async recipes() {
    const recipesData = await this.recipesApi.get();

    const recipesSection = document.querySelector("#recipe");
    recipesData.forEach((recipe, ingredient, qty) => {
      let ingredientsList = [];
      let qtyList = [];
      for (let i = 0; i < recipe.ingredients.length; i++) {
        ingredient = recipe.ingredients[i].ingredient;
        ingredientsList.push(ingredient);
        qty = recipe.ingredients[i].quantity;
        qtyList.push(qty);
      }

      const template = new RecipeCard(recipe, ingredientsList, qtyList);
      recipesSection.appendChild(template.createRecipeCard());
    });
  }

  async init() {
    await this.filterRecipes();
    await this.ingredients();
    await this.recipes();
  }
}

const index = new Index();
index.init();
