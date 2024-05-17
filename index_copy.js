class Index {
  constructor() {
    // call API to get data
    this.recipesApi = new ApiRecipes("./data/recipes.json");
    this.recipesData = [];
    this.dropdown = new TagList();
  }

  // 2 METHODS TO FILTER RECIPES ON THE INPUT MAIN SEARCH
  async filterRecipes() {
    // const recipesData = await this.recipesApi.get();
    const recipesDataFilter = [...this.recipesData];
    FilterRecipesMainSearch.filterRecipesByInput(recipesDataFilter);
    // SecondMethodFilterRecipesMainSearch.filterRecipesByInput(recipesDataFilter);
  }

  // CREATE INGREDIENTS DROPDOWN
  async ingredients() {
    let List1 = document.querySelectorAll("#List1 li");
    List1.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("ingredient", recipesData);
        this.dropdown.toggleIsActive(e, recipesData, "ingr");
      });
    });

    FilterRecipesMainSearch.DropdownIngredients(this.recipesData);
  }

  // CREATE APPLIANCE DROPDOWN
  async appliance() {
    let List2 = document.querySelectorAll("#List2 li");
    List2.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.dropdown.toggleIsActive(e, recipesData, "app");
      });
    });
    FilterRecipesMainSearch.DropdownAppliances(this.recipesData);
  }

  // CREATE USTENSILS DROPDOWN
  async ustensils() {
    let List3 = document.querySelectorAll("#List3 li");
    List3.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.dropdown.toggleIsActive(e, recipesData, "ust");
      });
    });
    FilterRecipesMainSearch.DropdownUstensils(this.recipesData);
  }

  // GET NUMBER OF RECIPES DISPLAY
  async numberOfRecipes() {
    // const recipesData = await this.recipesApi.get();
    FilterRecipesMainSearch.displayRecipes(this.recipesData);
  }

  // GET RECIPES
  async recipes() {
    // const recipesData = await this.recipesApi.get();
    FilterRecipesMainSearch.displayRecipes(this.recipesData);
  }

  async init() {
    this.recipesData = await this.recipesApi.get();
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
