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
    // console.log("LOGTEST", "✅", "sur search et au clic");
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

    // console.log("resultNew", result);

    // console.log("coucou cestTOI 🥕⭐❌🍋✅🎉");
    if (arrIngredient.length === 0) {
      // console.log("coucou cestmoi 🥕⭐❌🍋✅🎉");
      filteredRecipes = recipes;
      FilterRecipesMainSearch.displayRecipes(filteredRecipes);
    } else {
      // console.log("coucou 🥕⭐❌🍋✅🎉");
      filteredRecipes = Dropdown.filteredRecipesByIngredient(
        arrIngredient,
        recipes
      );
      // FilterRecipesMainSearch.updateDropdownIngredients(filteredRecipes);
      // console.log(result, filteredRecipes);
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
    // e.preventDefault();

    // ADD TAG IN DOM
    const tagDiv = document.querySelector("#tag");
    let value;
    if (arg instanceof Event) {
      value = arg.target;
    } else {
      value = arg;
    }
    // console.log(
    //   "value_node",
    //   value,
    //   "✅",
    //   "OK click et submit=> même comportement"
    // );

    value.classList.toggle("active");
    let valueId = value.id;
    console.log(
      "valueId_value",
      valueId,
      type,
      "✅",
      "OK click et submit=> même comportement"
    );
    // console.log(
    //   "this_arr",
    //   this.arr,
    //   "✅",
    //   "OK click et submit=> même comportement"
    // );

    // CONTROLE SI LA VALEUR EXISTE DEJA DANS LE TABLEAU DE VALEURS
    console.log("contexte de this avant la condition :", this);
    console.log("valueExist", valueId, type);
    let valueExists = this.arr.some(
      (value) => value.valueId === valueId && value.type === type
    );
    console.log("valueExist", valueId, type, valueExists);

    if (!valueExists) {
      this.arr.push({ valueId, type });
      console.log("contexte de this dans la condition :", this);
      console.log("valueID🌞", valueId);
      tagDiv.innerHTML = "";
    }
    console.log("thisArr", this.arr);

    this.arr.forEach((val, index) => {
      const tag = this.createTag(val.valueId, val.type);
      tagDiv.appendChild(tag);

      const closeBtnId = this.fixId(val.valueId);
      // console.log("closeBtnId", closeBtnId);
      const closeBtn = document.getElementById(closeBtnId);
      closeBtn.dataset.index = index;
      // console.log("closeBtnIndex", closeBtn);

      // closeBtn.addEventListener("click", () =>
      //   this.deleteTagInDom(this.closeBtnId, this.closeBtn)
      // );

      const that = this;
      closeBtn.addEventListener("click", function () {
        // console.log("arr", that.arr);
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

        // console.log("before", that.arr, recipes);
        that.deleteTag(that.arr, recipes);
        // console.log("after", that.arr, recipes);

        // that.filteredTagList(that.arr, recipes);
        // console.log("that_arr", that.arr, recipes);
        // FilterRecipesMainSearch.updateDropdownIngredients(recipes);
        // FilterRecipesMainSearch.updateDropdownAppliances(recipes);
        // FilterRecipesMainSearch.updateDropdownUstensils(recipes);
        // console.log("sup_recipes_V2", that.arr, recipes);
      });
    });
    // console.log("this_arr", this.arr);
    this.filteredTagList(this.arr, recipes, index);
  }

  // PAS DE RAPPEL SUR CETTE FONCTION ❌
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
