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
        for (let ingredient of recipe.ingredients) {
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
    console.log(result);

    if (arrIngredient.length === 0) {
      filteredRecipes = recipes;
      Dropdown.displayFilteredRecipes(filteredRecipes);
    } else {
      filteredRecipes = Dropdown.filteredRecipesByIngredient(
        arrIngredient,
        recipes
      );
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

  // ADD AND REMOVE ACTIVE ON EACH DROPDOWN VALUE
  toggleIsActive(e, recipes, type) {
    e.preventDefault();

    // ADD TAG IN DOM
    const tagDiv = document.querySelector("#tag");
    let value = e.target;
    value.classList.toggle("active");
    let valueId = e.target.id;
    this.arr.push({ valueId, type });
    tagDiv.innerHTML = "";

    this.arr.forEach((val, index) => {
      const tag = this.createTag(val.valueId, val.type);
      tagDiv.appendChild(tag);

      const closeBtnId = this.fixId(val.valueId);
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

        that.filteredTagList(that.arr, recipes);
      });
    });

    this.filteredTagList(this.arr, recipes);
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
