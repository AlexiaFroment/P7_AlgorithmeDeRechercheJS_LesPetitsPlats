class Index {
  constructor() {
    // call API to get data
    this.recipesApi = new ApiRecipes("./data/recipes.json");
    this.dropdown = new TagList();
  }

  async filterRecipes() {
    const recipesData = await this.recipesApi.get();
    const recipesDataFilter = [...recipesData];
    FilterRecipesMainSearch.filterRecipesByInput(recipesDataFilter);
    // FilterRecipesMainSearch.filterRecipesByInput(recipesDataFilter);
  }

  // CREATE INGREDIENTS DROPDOWN
  async ingredients() {
    console.log(this.dropdown);
    const recipesData = await this.recipesApi.get();
    const arrRecipes = [...recipesData];

    FilterRecipesMainSearch.updateDropdownIngredients(arrRecipes);

    let List1 = document.querySelectorAll("#List1 li");
    List1.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.dropdown.toggleIsActive(e, recipesData, "ingr");
      });
    });
  }

  // CREATE APPLIANCE DROPDOWN
  async appliance() {
    const recipesData = await this.recipesApi.get();
    const recipesDataFilter = [...recipesData];
    FilterRecipesMainSearch.updateDropdownAppliances(recipesDataFilter);

    let List2 = document.querySelectorAll("#List2 li");
    List2.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.dropdown.toggleIsActive(e, recipesData, "app");
      });
    });
  }

  // CREATE USTENSILS DROPDOWN
  async ustensils() {
    const recipesData = await this.recipesApi.get();
    const arrRecipes = [...recipesData];
    FilterRecipesMainSearch.updateDropdownUstensils(arrRecipes);

    let List3 = document.querySelectorAll("#List3 li");
    List3.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.dropdown.toggleIsActive(e, recipesData, "ust");
      });
    });
  }

  // GET NUMBER OF RECIPES DISPLAY
  async numberOfRecipes() {
    const recipesData = await this.recipesApi.get();
    FilterRecipesMainSearch.displayRecipes(recipesData);
  }

  // GET RECIPES
  async recipes() {
    const recipesData = await this.recipesApi.get();
    FilterRecipesMainSearch.displayRecipes(recipesData);
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
