class AppliancesList {
  constructor(appliance, recipes) {
    this.appliance = appliance;
    this.recipes = recipes;
    // console.log(this, "✅");
  }

  // MEP FILTER ON RECIPESDATA TO DISPLAY RECIPES BY TAG
  displayFilteredRecipes(arrAppliance, recipes, appliance) {
    // console.log("filterRecipes", arrAppliance, recipes, appliance, "✅");
    const numberOfRecipes = document.getElementById("number_recipes");
    const recipesCards = document.getElementById("recipe");

    const recipesFiltered = recipes.filter((recipe) => {
      return arrAppliance.every((value) => recipe.appliance === value);
    });

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

  // ADD AND REMOVE ACTIVE ON APPLIANCE CLASS AND RETURN ACTIVE VALUE
  toggleIsActive(e, arrAppliance, recipes, appliance) {
    // console.log("toggle", recipes, appliance, "✅");
    e.preventDefault();
    // ADD TAG IN DOM
    const tagDiv = document.querySelector("#tag");
    let value = e.target;
    value.classList.add("active");

    arrAppliance.forEach((appliance, index) => {
      const template = new TagList(appliance);
      const tag = template.createTag(appliance);
      tagDiv.appendChild(tag);

      const closeBtnId = template.fixId(appliance);
      const closeBtn = document.getElementById(closeBtnId);
      closeBtn.dataset.index = index;

      closeBtn.addEventListener("click", function () {
        const currentIndex = Number(this.dataset.index);
        arrAppliance.splice(currentIndex, 1);

        const updateIndexCloseBtns = document.querySelectorAll(".close");
        updateIndexCloseBtns.forEach((btn, index) => {
          if (index > currentIndex) {
            btn.dataset.index = Number(btn.dataset.index) - 1;
          }
        });

        value.classList.remove("active");
        this.parentNode.remove();
        const arrUpdate = new AppliancesList();
        arrUpdate.displayFilteredRecipes(arrAppliance, recipes, appliance);
        // return arrAppliance;
      });
    });
    this.displayFilteredRecipes(arrAppliance, recipes, appliance);
  }

  // APPLIANCE
  createApplianceList() {
    // console.log("create", this.recipes, "✅");
    const $wrapper = document.createElement("li");

    const applianceList = `
      <a class="dropdown-item" href="#" id="${this.appliance}">${this.appliance}</a>
      `;

    $wrapper.innerHTML = applianceList;
    return $wrapper;
  }
}
