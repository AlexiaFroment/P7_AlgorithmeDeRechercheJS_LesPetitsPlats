class UstensilsList {
  constructor(ustensil, recipes) {
    this.ustensil = ustensil;
    this.recipes = recipes;
    // console.log(this.ustensil, "✅");
  }

  // MEP FILTER ON RECIPESDATA TO DISPLAY RECIPES BY TAG
  displayFilteredRecipes(arr, recipes, ustensil) {
    // console.log("filterRecipes", arr, recipes, ustensil, "✅");
    const numberOfRecipes = document.getElementById("number_recipes");
    const recipesCards = document.getElementById("recipe");
    let recipesFiltered = [];

    if (arr.length === 0) {
      recipesFiltered = recipes;
    } else {
      recipes.filter((recipe) => {
        for (let ustensil of recipe.ustensils) {
          let capitalizeUstensil = Utils.capitalize(ustensil);
          // console.log(ustensil, capitalizeUstensil, "✅");
          let allValuesPresent = true;

          for (let val of arr) {
            if (val !== capitalizeUstensil) {
              allValuesPresent = false;
              break;
            }
          }
          if (allValuesPresent) {
            recipesFiltered.push(recipe);
          }
        }
      });
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
    // return recipesFiltered;
  }

  // ADD AND REMOVE ACTIVE ON USTENSIL CLASS AND RETURN ACTIVE VALUE
  toggleIsActive(e, arr, recipes, ustensil) {
    // console.log("toggle", recipes, ustensil, "✅");
    e.preventDefault();
    // ADD TAG IN DOM
    const tagDiv = document.querySelector("#tag");
    let value = e.target;
    value.classList.add("active");

    arr.forEach((ustensil, index) => {
      const template = new TagList(ustensil);
      const tag = template.createTag(ustensil);
      tagDiv.appendChild(tag);

      const closeBtnId = template.fixId(ustensil);
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
        const arrUpdate = new UstensilsList();

        arrUpdate.displayFilteredRecipes(arr, recipes, ustensil);
      });
    });
    this.displayFilteredRecipes(arr, recipes, ustensil);
  }

  // USTENSILS
  createUstensilsList() {
    // console.log("create : ", this.ustensil, "✅");
    const $wrapper = document.createElement("li");

    const ustensilList = `
    <a class="dropdown-item" href="#" id="${this.ustensil}">${this.ustensil}</a>
    `;

    $wrapper.innerHTML = ustensilList;
    return $wrapper;
  }
}
