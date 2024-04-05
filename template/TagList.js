class TagList {
  // constructor(appliance, ustensil, ingredient) {
  //   this.appliance = appliance;
  //   this.ustensil = ustensil;
  //   this.ingredient = ingredient;
  //   console.log("taglist", this);
  // }

  strNoAccent(word) {
    return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  fixId(word) {
    return this.strNoAccent(word).toLowerCase().replaceAll(" ", "");
  }

  // MEP FILTER ON RECIPESDATA TO DISPLAY RECIPES BY TAG
  displayFilteredRecipes(arr, recipes, values) {
    // console.log("filterRecipes", arrAppliance, recipes, appliance, "✅");
    const numberOfRecipes = document.getElementById("number_recipes");
    const recipesCards = document.getElementById("recipe");

    const recipesFiltered = recipes.filter((recipe) => {
      return arr.every((value) => recipe.appliance === value);
    });

    const number = recipesFiltered.length;
    numberOfRecipes.innerHTML = "";
    recipesCards.innerHTML = "";

    const templateCount = new List(number);
    numberOfRecipes.appendChild(templateCount.createCountList());
    // console.log("appliance", recipesFiltered, "✅");
    console.log("FilteredAppliance_39", recipesFiltered);
    recipesFiltered.forEach((recipe) => {
      console.log("recipeAppliance", recipe);
      const templateCard = new RecipeCard(recipe);
      recipesCards.appendChild(templateCard.createRecipeCard());
    });
    return recipesFiltered;
  }

  // ADD AND REMOVE ACTIVE ON EACH DROPDOWN VALUE
  toggleIsActive(e, arr, recipes, values) {
    // console.log("toggle", recipes, values, "✅");
    e.preventDefault();
    // ADD TAG IN DOM
    const tagDiv = document.querySelector("#tag");
    let value = e.target;
    console.log(value, "✅");

    value.classList.add("active");

    arr.forEach((values, index) => {
      const tag = this.createTag(values);
      tagDiv.appendChild(tag);
      console.log(arr, "❌");

      const closeBtnId = this.fixId(values);
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
        const arrUpdate = new AppliancesList();
        console.log(arr, "❌");
        arrUpdate.displayFilteredRecipes(arr, recipes, values);
        // return arrAppliance;
      });
    });
    this.displayFilteredRecipes(arr, recipes, values);
  }

  createTag(value) {
    console.log("tag", value);
    let id = this.fixId(value);

    let $wrapper = document.createElement("button");
    $wrapper.id = `${value}`;
    $wrapper.className =
      "tag btn btn-yellow d-block my-2 d-flex justify-content-between";
    let btn = `${value}
        <span class="close" id="${id}"> X <span>`;
    $wrapper.innerHTML = btn;
    return $wrapper;
  }
}
