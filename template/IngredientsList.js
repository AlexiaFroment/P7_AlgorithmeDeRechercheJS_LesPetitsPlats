class IngredientsList {
  constructor(ingredient, recipe) {
    this.ingredient = ingredient;
    this.recipe = recipe;
    // console.log(this, "✅");
  }

  // MEP FILTER ON RECIPESDATA TO DISPLAY RECIPES BY TAG
  displayFilteredRecipes(arr, recipes, ingredient) {
    const numberOfRecipes = document.getElementById("number_recipes");
    const recipesCards = document.getElementById("recipe");
    const recipesFiltered = [];

    for (let recipe of recipes) {
      let allValuesPresent = true;

      for (let ingredient of arr) {
        if (
          !recipe.ingredients.some(
            (recipeIngredient) => recipeIngredient.ingredient === ingredient
          )
        ) {
          allValuesPresent = false;

          break;
        }
      }
      if (allValuesPresent) {
        recipesFiltered.push(recipe);
      }
    }

    const number = recipesFiltered.length;
    numberOfRecipes.innerHTML = "";
    recipesCards.innerHTML = "";

    const templateCount = new List(number);
    numberOfRecipes.appendChild(templateCount.createCountList());

    recipesFiltered.forEach((recipe) => {
      const templateCard = new RecipeCard(recipe);
      recipesCards.appendChild(templateCard.createRecipeCard());
    });
  }
  //   ADD ACTIVE ON EACH NGREDIENT SELECTED IN DROPDOWN AND REMOVE THIS CLASS WHEN I CLICK ON THE CROSS
  toggleIsActive(e, arr, recipes, ingredient) {
    // console.log(recipes, ingredients, "✅");
    e.preventDefault();
    // ADD TAG IN DOM
    const tagDiv = document.querySelector("#tag");
    let value = e.target;
    value.classList.add("active");

    arr.forEach((ingredient, index) => {
      const template = new TagList(ingredient);
      const tag = template.createTag(ingredient);
      tagDiv.appendChild(tag);

      const closeBtnId = template.fixId(ingredient);
      const closeBtn = document.getElementById(closeBtnId);
      closeBtn.dataset.index = index;

      closeBtn.addEventListener("click", function () {
        const currentIndex = Number(this.dataset.index);
        arr.splice(currentIndex, 1);

        const updateIndexCloseBtns = document.querySelectorAll(".close");
        updateIndexCloseBtns.forEach((btn, index) => {
          if (index > currentIndex) {
            btn.dataset.index = Number(btn.dataset.index) - 1;
          }
        });

        value.classList.remove("active");
        this.parentNode.remove();
        const arrUpdate = new IngredientsList();
        arrUpdate.displayFilteredRecipes(arr, recipes, ingredient);
      });
    });
    this.displayFilteredRecipes(arr, recipes, ingredient);
  }

  // INGREDIENT
  createIngredientsList() {
    // console.log(this.ingredient, this.recipesData, "✅");
    const $wrapper = document.createElement("li");
    $wrapper.className = "item";

    const ingredientList = `
      <a class="dropdown-item" href="#" id="${this.ingredient}"> ${this.ingredient}  </a>
      `;

    $wrapper.innerHTML = ingredientList;

    return $wrapper;
  }
}
