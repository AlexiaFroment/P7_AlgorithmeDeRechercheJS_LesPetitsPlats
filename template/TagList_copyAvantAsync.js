class TagList {
  constructor() {
    this.arr = [];
  }

  filteredTagList(arr, recipes) {
    console.log("filteredTagList", arr, "✅");
    const originalArr = [...recipes];
    let arrIngredient = [];
    let arrAppliance = [];
    let arrUstensil = [];

    arr.forEach((val) => {
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

    // console.log("arrX3", arrIngredient, arrAppliance, arrUstensil);

    let result = [...arrIngredient, ...arrAppliance, ...arrUstensil];
    // console.log("result", result);

    if (result.length === 0) {
      FilterRecipesMainSearch.displayRecipes(originalArr);
      FilterRecipesMainSearch.updateAllDropdowns(originalArr);
      console.log("originalArr", originalArr);
    } else {
      let filteredIngredient = Dropdown.filteredRecipesByIngredient(
        arrIngredient,
        recipes
      );
      let filteredAppliance = Dropdown.filteredRecipesByAppliance(
        arrAppliance,
        filteredIngredient
      );
      let filteredUstensil = Dropdown.filteredRecipesByUstensil(
        arrUstensil,
        filteredAppliance
      );
      let filteredRecipes = [
        ...filteredIngredient,
        ...filteredAppliance,
        ...filteredUstensil,
      ];
      return filteredRecipes;

      // console.log(
      //   "filter🖐🏼",
      //   filteredIngredient,
      //   filteredAppliance,
      //   filteredUstensil,
      //   filteredRecipes
      // );
    }
  }

  // DELETE TAG IN DOM
  deleteTagInDOM(id, recipes, value, e) {
    console.log("deleteTagInDOM", id, this.arr, value);
    e.preventDefault();
    const index = this.arr.findIndex((tag) => Utils.fixId(tag.valueId) === id); // tag.valueId === id);
    if (index !== -1) {
      this.arr.splice(index, 1);
      this.updateTagDisplay(recipes);
    }
  }
  // UPDATE CLOSE BTN WHEN I DELETE TAG IN DOM
  updateCloseBtn(recipes, value) {
    const closeButtons = document.querySelectorAll(".close");
    console.log("closeButtons", closeButtons, "✅");
    closeButtons.forEach((closeBtn) => {
      const id = closeBtn.id;
      closeBtn.removeEventListener("click", this.deleteTagInDOM.bind);
      closeBtn.addEventListener("click", (e) =>
        this.deleteTagInDOM(id, recipes, value, e)
      );
    });
    // console.log("closeButtons", closeButtons, "✅");
  }
  // DISPLAY TAG IN DOM
  updateTagDisplay(recipes, value) {
    const tagDiv = document.querySelector("#tag");
    tagDiv.innerHTML = "";

    this.arr.forEach((val) => {
      const tag = this.createTag(val.valueId, val.type);
      tagDiv.appendChild(tag);
    });

    this.updateCloseBtn(recipes, value);
    this.filteredTagList(this.arr, recipes);
  }
  // CHECK IF VALUE EXISTS BEFORE ADD IN ARRAY
  checkValueExists(valueId, type) {
    return this.arr.some(
      (value) => value.valueId === valueId && value.type === type
    );
  }
  // ADD TAG IN DOM
  toggleIsActive(eventOrValue, recipes, type) {
    const value =
      eventOrValue instanceof Event ? eventOrValue.target : eventOrValue;
    const valueId = value.id;

    const tagExists = this.checkValueExists(valueId, type);
    if (!tagExists) {
      this.arr.push({ valueId, type });
    }

    console.log("VALUE", value, valueId, type, this.arr, "✅");

    this.updateTagDisplay(recipes, value);
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
