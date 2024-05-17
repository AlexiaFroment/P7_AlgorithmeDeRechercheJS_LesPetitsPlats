class TagList {
  constructor() {
    this.arr = [];
  }

  filteredTagList(arr, recipes) {
    const originalArr = [...recipes];
    let arrIngredient = [];
    let arrAppliance = [];
    let arrUstensil = [];
    let filteredRecipes = [];

    this.arr.forEach((val) => {
      // INGREDIENTS
      for (let recipe of recipes) {
        for (let ingredient of recipe.ingredients) {
          if (val.valueId === ingredient.ingredient) {
            const isIngredient = val.type === "ingr";
            if (isIngredient) {
              arrIngredient.push(val.valueId);
            }
          }
        }
      }
      // APPLIANCES
      for (let recipe of recipes) {
        if (val.valueId === recipe.appliance) {
          const isAppliance = val.type === "app";
          if (isAppliance) {
            arrAppliance.push(val.valueId);
          }
        }
      }
      // USTENSILS
      for (let recipe of recipes) {
        for (let ustensil of recipe.ustensils) {
          if (val.valueId.toLowerCase() === ustensil.toLowerCase()) {
            const isUstensil = val.type === "ust";
            if (isUstensil) {
              arrUstensil.push(val.valueId.toLowerCase());
            }
          }
        }
      }
    });

    console.log("arrX3", arrIngredient, arrAppliance, arrUstensil);

    let result = [...arrIngredient, ...arrAppliance, ...arrUstensil];
    console.log("result", result);

    if (arrIngredient.length === 0) {
      // filteredRecipes = recipes;
      FilterRecipesMainSearch.displayRecipes(originalArr);
      console.log("originalArr", originalArr);
    } else {
      filteredRecipes = Dropdown.filteredRecipesByIngredient(
        arrIngredient,
        recipes
      );
      // FilterRecipesMainSearch.DropdownIngredients(filteredRecipes);
      // console.log(result, filteredRecipes);
      Dropdown.DropdownIngredients(filteredRecipes);
      Dropdown.DropdownAppliances(filteredRecipes);
      Dropdown.DropdownUstensils(filteredRecipes);
    }

    // if (arrAppliance.length > 0) {
    //   filteredRecipes = Dropdown.filteredRecipesByAppliance(
    //     arrAppliance,
    //     filteredRecipes
    //   );
    // }

    // if (arrUstensil.length > 0) {
    //   filteredRecipes = Dropdown.filteredRecipesByUstensil(
    //     arrUstensil,
    //     filteredRecipes
    //   );
    // }
  }

  // CHECK IF VALUE EXISTS BEFORE ADD IN THE ARRAY
  checkValueExists(valueId, type) {
    return this.arr.some(
      (value) => value.valueId === valueId && value.type === type
    );
  }

  // ADD AND REMOVE TAG IN DOM
  toggleIsActive(eventOrValue, recipes, type) {
    const tagDiv = document.querySelector("#tag");

    const value =
      eventOrValue instanceof Event ? eventOrValue.target : eventOrValue;
    value.classList.toggle("active");
    const valueId = value.id;

    // CHECK IF THE VALUE ALREADY EXIST IN THE ARRAY
    const tagExists = this.checkValueExists(valueId, type);
    if (!tagExists) {
      this.arr.push({ valueId, type });
    }

    tagDiv.innerHTML = "";
    this.arr.forEach((val, index) => {
      const tag = this.createTag(val.valueId, val.type);
      tagDiv.appendChild(tag);

      const closeBtnId = Utils.fixId(val.valueId);
      const closeBtn = document.getElementById(closeBtnId);
      closeBtn.dataset.index = index;

      const that = this;
      closeBtn.addEventListener("click", function () {
        const currentIndex = Number(this.dataset.index);
        that.arr.splice(currentIndex, 1);

        const updateIndexCloseBtns = document.querySelectorAll(".close");

        updateIndexCloseBtns.forEach((btn, index) => {
          if (index > currentIndex) {
            btn.dataset.index = Number(btn.dataset.index) - 1;
          }
        });

        value.classList.remove("active");
        this.parentNode.remove();
        console.log("toggleIsActive", that.arr, "✅");

        that.filteredTagList(that.arr, recipes);
      });
    });

    this.filteredTagList(this.arr, recipes);
  }

  createTag(value, type) {
    let id = Utils.fixId(value);

    let $wrapper = document.createElement("button");
    $wrapper.id = `${value}`;
    $wrapper.className = `tag btn btn-yellow d-block my-2 d-flex justify-content-between ${type}`;
    let btn = `${value}
        <span class="close" id="${id}"> X <span>`;
    $wrapper.innerHTML = btn;
    return $wrapper;
  }
}
