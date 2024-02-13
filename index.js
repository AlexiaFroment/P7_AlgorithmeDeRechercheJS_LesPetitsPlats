/**
 * 1_Create object API ✅
 * 2_Create index page that calls the API and map data ✅
 * 3_Create object RecipesData that returns the keys and values of the API ✅
 * 4_Create component recipeCard ✅
 * 5_Apply method foreach() on data for create all recipeCard
 */

class Index {
  constructor() {
    // call API to get data
    this.recipesApi = new ApiRecipes("./data/recipes.json");
  }

  async recipesSection() {
    const recipesData = await this.recipesApi.get();
    console.log(recipesData);

    const recipesSection = document.querySelector("#recipe");
    console.log(recipesSection);
    recipesData.forEach((recipe) => {
      const template = new RecipeCard(recipe);
      recipesSection.appendChild(template.createRecipeCard());
    });
  }

  async ingredients() {
    const recipesData = await this.recipesApi.get();
    recipesData.forEach((item) => {
      // console.log(item.ingredients);
    });
  }
  async ingredientsMap() {
    const recipesData = await this.recipesApi.get();
    const ingredientsMap = recipesData.map((el) => {
      return el.ingredients;
    });
    console.log(ingredientsMap);
    ingredientsMap.forEach((el) => console.log(el));
    // for (let i = 0; i < ingredientsMap.length; i++) {
    //   for (let y = 0; y < ingredients.length; y++) {
    //     console.log(ingredientsMap[i][y].ingredient);
    //   }
    // }
    console.log(ingredientsMap[0]);
    console.log(ingredientsMap[0][0].ingredient);
  }

  async init() {
    await this.recipesSection();
    await this.ingredients();
    await this.ingredientsMap();
  }
}

const index = new Index();
index.init();
