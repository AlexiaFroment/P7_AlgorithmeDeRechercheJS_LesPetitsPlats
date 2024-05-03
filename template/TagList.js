class TagList {
  constructor() {
    this.arr = [];
  }

  fixId(word) {
    const cleanWord = Utils.strNoAccent(word).toLowerCase().replaceAll(" ", "");
    return cleanWord;
  }

  // DISTRIBUTION OF TAGS BY CATEGORIES / DATA FILTERING ALWAYS IN THE SAME ORDER
  filteredTagList(arr, recipes) {
    let arrIngredient = [];
    let arrAppliance = [];
    let arrUstensil = [];
    let filteredRecipes = [];

    arr.forEach((val) => {
      for (let recipe of recipes) {
        // console.log("NEWtaglist", recipe, recipes, "✅");
        for (let ingredient of recipe.ingredients) {
          // console.log("NEWtaglist", ingredient);
          if (val.valueId === ingredient.ingredient) {
            const isIngredient = val.type === "ingr";
            if (isIngredient) {
              arrIngredient.push(val.valueId);
            }
          }
        }
      }
      for (let recipe of recipes) {
        if (val.valueId === recipe.appliance) {
          const isAppliance = val.type === "app";
          if (isAppliance) {
            arrAppliance.push(val.valueId);
          }
        }
      }
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

    let result = arrIngredient.concat(arrAppliance, arrUstensil);

    console.log("resultNew", result);

    if (arrIngredient.length === 0) {
      filteredRecipes = recipes;
      FilterRecipesMainSearch.displayRecipes(filteredRecipes);
    } else {
      filteredRecipes = Dropdown.filteredRecipesByIngredient(
        arrIngredient,
        recipes
      );
      // FilterRecipesMainSearch.updateDropdownIngredients(filteredRecipes);
      console.log(result, filteredRecipes);
      FilterRecipesMainSearch.updateDropdownIngredients(filteredRecipes);
      FilterRecipesMainSearch.updateDropdownAppliances(filteredRecipes);
      FilterRecipesMainSearch.updateDropdownUstensils(filteredRecipes);
    }

    if (arrAppliance.length > 0) {
      filteredRecipes = Dropdown.filteredRecipesByAppliance(
        arrAppliance,
        filteredRecipes
      );
    }

    if (arrUstensil.length > 0) {
      filteredRecipes = Dropdown.filteredRecipesByUstensil(
        arrUstensil,
        filteredRecipes
      );
    }
  }

  // DELETE TAG IN DOM
  // deleteTagInDom(arr, recipes) {
  //   console.log("deleteTag", arr, recipes);
  //   console.log("deleteTagInDOM_closeBtnId", closeBtnId);
  //   console.log("closeBtnIndex_deleteTagInDOM", closeBtn);
  //   const currentIndex = Number(this.dataset.index);
  //   this.arr.splice(currentIndex, 1);

  //   const updateIndexCloseBtns = document.querySelectorAll(".close");

  //   updateIndexCloseBtns.forEach((btn, index) => {
  //     if (index > currentIndex) {
  //       btn.dataset.index = Number(btn.dataset.index) - 1;
  //     }
  //   });

  //   value.classList.remove("active");
  //   this.parentNode.remove();
  //   console.log("sup_recipes", that.arr, recipes);

  //   that.filteredTagList(that.arr, recipes);
  //   console.log("that_arr", that.arr, recipes);
  //   FilterRecipesMainSearch.updateDropdownIngredients(recipes);
  //   FilterRecipesMainSearch.updateDropdownAppliances(recipes);
  //   FilterRecipesMainSearch.updateDropdownUstensils(recipes);
  //   console.log("sup_recipes_V2", that.arr, recipes);
  // }

  // ADD AND REMOVE ACTIVE ON EACH DROPDOWN VALUE
  toggleIsActive(arg, recipes, type) {
    console.log("toggleIsActive", recipes);
    // e.preventDefault();

    // ADD TAG IN DOM
    const tagDiv = document.querySelector("#tag");
    let value;
    if (arg instanceof Event) {
      value = arg.target;
    } else {
      value = arg;
    }
    // console.log("value_node", value, "✅");

    value.classList.toggle("active");
    let valueId = value.id;
    console.log("valueId_value", valueId, type, "✅");
    console.log("this_arr", this.arr);

    // CONTROLE SI LA VALEUR EXISTE DEJA DANS LE TABLEAU DE VALEURS
    const valueExists = this.arr.some(
      (value) => value.valueId === valueId && value.type === type
    );

    if (!valueExists) {
      this.arr.push({ valueId, type });
      console.log(
        "arr",
        this.arr,
        valueId,
        type,
        recipes,
        "✅click_plsrsValeurs",
        "❌search_plsrsValeurs"
      );
      tagDiv.innerHTML = "";
    }

    this.arr.forEach((val, index) => {
      console.log(
        "arr_index",
        val,
        index,
        recipes,
        "✅index_plsrsValeurs",
        "❌dropdown_plsrsValeurs"
      );
      const tag = this.createTag(val.valueId, val.type);
      // console.log("tag", tag, "✅");
      tagDiv.appendChild(tag);

      const closeBtnId = this.fixId(val.valueId);
      console.log("closeBtnId", closeBtnId);
      const closeBtn = document.getElementById(closeBtnId);
      closeBtn.dataset.index = index;
      console.log("closeBtnIndex", closeBtn);

      // closeBtn.addEventListener("click", () =>
      //   this.deleteTagInDom(this.closeBtnId, this.closeBtn)
      // );

      const that = this;
      closeBtn.addEventListener("click", function () {
        console.log("arr", that.arr);
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

        console.log("before", that.arr, recipes);
        that.deleteTag(that.arr, recipes);
        console.log("after", that.arr, recipes);

        // that.filteredTagList(that.arr, recipes);
        // console.log("that_arr", that.arr, recipes);
        // FilterRecipesMainSearch.updateDropdownIngredients(recipes);
        // FilterRecipesMainSearch.updateDropdownAppliances(recipes);
        // FilterRecipesMainSearch.updateDropdownUstensils(recipes);
        // console.log("sup_recipes_V2", that.arr, recipes);
      });
    });
    console.log("this_arr", this.arr);
    this.filteredTagList(this.arr, recipes, index);
  }

  deleteTag(arr, recipes) {
    this.filteredTagList(arr, recipes);
    FilterRecipesMainSearch.updateDropdownIngredients(recipes);
    FilterRecipesMainSearch.updateDropdownAppliances(recipes);
    FilterRecipesMainSearch.updateDropdownUstensils(recipes);
  }

  createTag(value, type) {
    let id = this.fixId(value);

    let $wrapper = document.createElement("button");
    $wrapper.id = `${value}`;
    $wrapper.className = `tag btn btn-yellow d-block my-2 d-flex justify-content-between ${type}`;
    let btn = `${value}
        <span class="close" id="${id}"> X <span>`;
    $wrapper.innerHTML = btn;
    return $wrapper;
  }
}
