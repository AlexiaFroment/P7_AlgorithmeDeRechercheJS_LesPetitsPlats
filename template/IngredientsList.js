class IngredientsList {
  constructor(ingredient, recipesData) {
    this.ingredient = ingredient;
    this.recipesData = recipesData;
    // console.log("ingredients", this, "✅");
  }

  // MEP FILTER ON RECIPESDATA TO DISPLAY RECIPES BY TAG
  displayFilteredRecipes(arr, recipes, ingredient) {
    const numberOfRecipes = document.getElementById("number_recipes");
    const recipesCards = document.getElementById("recipe");
    let recipesFiltered = [];

    for (let recipe of recipes) {
      // console.log(recipe, "✅");

      for (let ingredient of recipe.ingredients) {
        // console.log("ligne18", ingredient, recipe);
        if (arr.includes(ingredient.ingredient)) {
          recipesFiltered.push({
            recipe,
          });
        }
      }
    }

    const number = recipesFiltered.length;
    numberOfRecipes.innerHTML = "";
    recipesCards.innerHTML = "";

    const templateCount = new List(number);
    numberOfRecipes.appendChild(templateCount.createCountList());
    // console.log("ingredient", recipesFiltered, "❌");
    console.log("filtered36", recipesFiltered);
    recipesFiltered.forEach((recipe) => {
      console.log("recipeIngredient", recipe);
      const templateCard = new RecipeCard(recipe);
      recipesCards.appendChild(templateCard.createRecipeCard());
    });
    return recipesFiltered;
  }
  //   ADD ACTIVE ON EACH NGREDIENT SELECTED IN DROPDOWN AND REMOVE THIS CLASS WHEN I CLICK ON THE CROSS
  toggleIsActive(e, arr, recipes, ingredient) {
    // console.log(recipes, ingredients, "✅");

    // ADD TAG IN DOM
    const tagDiv = document.querySelector("#tag");
    let value = e.target;
    console.log(value);
    value.classList.add("active");

    arr.forEach((ingredient, index) => {
      const template = new TagList(null, null, ingredient);
      const tag = template.createTag(ingredient);
      tagDiv.appendChild(tag);
      console.log(arr, "✅");

      const closeBtnId = template.fixId(ingredient);
      const closeBtn = document.getElementById(closeBtnId);
      closeBtn.dataset.index = index;
      // console.log(closeBtn);

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
        console.log(arr);
        return arr;
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
