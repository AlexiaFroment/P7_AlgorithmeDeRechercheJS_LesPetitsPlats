class AppliancesList {
  constructor(recipes, appliance) {
    this.recipes = recipes;
    this.appliance = appliance;
    // console.log("constructor", this.recipes, "✅");
  }

  // MEP FILTER ON RECIPESDATA TO DISPLAY RECIPES BY TAG
  displayFilteredRecipes(arrAppliance, recipes, appliance) {
    // console.log("filterRecipes", arrAppliance, recipes, appliance, "✅");
    const numberOfRecipes = document.getElementById("number_recipes");
    const recipesCards = document.getElementById("recipe");
    let recipesFiltered = [];

    for (let app of arrAppliance) {
      recipesFiltered = recipesFiltered.concat(
        recipes.filter((recipe) => recipe.appliance === app)
      );
      console.log("FilteredAppliance19", recipesFiltered);
    }
    console.log("FilteredAppliance21", recipesFiltered);

    const number = recipesFiltered.length;
    numberOfRecipes.innerHTML = "";
    recipesCards.innerHTML = "";

    const templateCount = new List(number);
    numberOfRecipes.appendChild(templateCount.createCountList());

    console.log("FilteredAppliance30", recipesFiltered);
    recipesFiltered.forEach((recipe) => {
      const templateCard = new RecipeCard(recipe);
      recipesCards.appendChild(templateCard.createRecipeCard());
    });
    return recipesFiltered;
  }

  // ADD AND REMOVE ACTIVE ON APPLIANCE CLASS AND RETURN ACTIVE VALUE
  // toggleIsActive(e, arrAppliance, recipes, appliance) {
  //   console.log("toggle", recipes, appliance, "✅");
  //   e.preventDefault();
  //   // ADD TAG IN DOM
  //   const tagDiv = document.querySelector("#tag");
  //   let value = e.target;
  //   console.log(value, "✅");

  //   value.classList.add("active");

  //   arrAppliance.forEach((appliance, index) => {
  //     const template = new TagList(appliance, null);
  //     const tag = template.createTag(appliance);
  //     tagDiv.appendChild(tag);
  //     console.log(arrAppliance, "✅");

  //     const closeBtnId = template.fixId(appliance);
  //     const closeBtn = document.getElementById(closeBtnId);
  //     closeBtn.dataset.index = index;
  //     // console.log(closeBtn);

  //     closeBtn.addEventListener("click", function () {
  //       const currentIndex = Number(this.dataset.index);
  //       arrAppliance.splice(currentIndex, 1);

  //       const updateIndexCloseBtns = document.querySelectorAll(".close");
  //       updateIndexCloseBtns.forEach((btn, index) => {
  //         if (index > currentIndex) {
  //           btn.dataset.index = Number(btn.dataset.index) - 1;
  //         }
  //       });

  //       value.classList.remove("active");
  //       this.parentNode.remove();
  //       const toto = new AppliancesList();

  //       toto.displayFilteredRecipes(arrAppliance, recipes, appliance);
  //       // return arrAppliance;
  //     });
  //   });
  //   this.displayFilteredRecipes(arrAppliance, recipes, appliance);
  // }

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
