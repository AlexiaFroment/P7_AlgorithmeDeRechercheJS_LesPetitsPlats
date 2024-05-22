class FilterRecipesMainSearch {
  static init() {
    this.dropdown = new TagList();
    // console.log(this);
  }

  //   UPDATE VALUES DROPDOWN ON RECIPES FILTERED
  static updateAllDropdowns(recipes) {
    FilterRecipesMainSearch.DropdownIngredients(recipes);
    FilterRecipesMainSearch.DropdownAppliances(recipes);
    FilterRecipesMainSearch.DropdownUstensils(recipes);
  }
  static DropdownIngredients(recipes) {
    const filteredArr = recipes.map((el) => el.ingredients);

    let list1 = [];
    filteredArr.forEach((ingredient) => {
      for (let i = 0; i < ingredient.length; i++) {
        list1.push(ingredient[i].ingredient);
      }
    });

    let capitalizeList1 = list1.map((el) => Utils.capitalize(el));
    Utils.sortArr(capitalizeList1);
    const uniqList = Utils.uniqItem(capitalizeList1);
    console.log(
      "liste d'ingredients UNIQUE dans le dropdown 🥕",
      uniqList.length,
      "✅"
    );

    const btn1 = document.getElementById("List1");
    btn1.innerHTML = "";
    uniqList.forEach((ingredient) => {
      const template = new Dropdown(
        recipes,
        ingredient,
        null,
        null,
        this.dropdown
      );
      btn1.appendChild(template.createDropdown(ingredient));
    });

    let List1 = document.querySelectorAll("#List1 li");
    List1.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("this.arr_DropdownIngredient", this.arr);
        this.dropdown.toggleIsActive(e, recipes, "ingr");
      });
    });
  }

  static DropdownAppliances(recipes) {
    // I GET THE TABLES OF APPLIANCES COMPARED TO THE FILTERED RECIPES
    const filteredArr = recipes.map((el) => el.appliance);

    // I UPDATE APPLIANCES LIST
    let capitalizeList2 = filteredArr.map((el) => Utils.capitalize(el));
    Utils.sortArr(capitalizeList2);

    let uniqList = Utils.uniqItem(filteredArr);

    console.log(
      "liste d'appareils UNIQUE dans le dropdown 🌞",
      uniqList.length,
      "✅"
    );

    // I UPDATE THE DROPDOWN LIST BY CREATING A NEW DROPDOWN
    const btn2 = document.getElementById("List2");
    btn2.innerHTML = "";
    uniqList.forEach((appliance) => {
      const template = new Dropdown(
        recipes,
        null,
        appliance,
        null,
        this.dropdown
      );
      btn2.appendChild(template.createDropdown(appliance));
    });

    // SELECT A ITEM TO CLICK
    let List2 = document.querySelectorAll("#List2 li");
    List2.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.dropdown.toggleIsActive(e, recipes, "app");
      });
    });
  }

  static DropdownUstensils(recipes) {
    // I GET THE TABLES OF USTENSILS COMPARED TO THE FILTERED RECIPES
    const filteredArr = recipes.map((el) => el.ustensils);

    // I UPDATE USTENSILS LIST
    let list3 = [];
    filteredArr.forEach((ustensil) => {
      for (let i = 0; i < ustensil.length; i++) {
        list3.push(ustensil[i]);
      }
    });

    let capitalizeList3 = list3.map((el) => Utils.capitalize(el));
    Utils.sortArr(capitalizeList3);
    let uniqList = Utils.uniqItem(capitalizeList3);
    console.log(
      "liste d'ustensils UNIQUE dans le dropdown 🍳",
      uniqList.length,
      "✅"
    );

    // I UPDATE THE DROPDOWN LIST BY CREATING A NEW DROPDOWN
    const btn3 = document.getElementById("List3");
    btn3.innerHTML = "";
    uniqList.forEach((ustensil) => {
      const template = new Dropdown(
        recipes,
        null,
        null,
        ustensil,
        this.dropdown
      );
      btn3.appendChild(template.createDropdown(ustensil));
    });

    // SELECT A ITEM TO CLICK
    let List3 = document.querySelectorAll("#List3 li");
    List3.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.dropdown.toggleIsActive(e, recipes, "ust");
      });
    });
  }

  // DISPLAY RECIPES FILTERED
  static displayRecipes(recipes) {
    const numberOfRecipes = document.getElementById("number_recipes");
    const recipesCards = document.getElementById("recipe");

    const number = recipes.length;

    numberOfRecipes.innerHTML = "";
    recipesCards.innerHTML = "";

    const templateCount = new List();
    numberOfRecipes.appendChild(templateCount.createCountList(number));

    recipes.forEach((recipe) => {
      const templateCard = new RecipeCard(recipe);
      recipesCards.appendChild(templateCard.createRecipeCard());
    });
  }

  static filterRecipesByInput(recipes) {
    const searchInput = document.querySelector(".search_input");
    const recipesSection = document.querySelector("#recipe");
    const numberOfRecipes = document.querySelector("#number_recipes");

    // SORT BY NAME ✅
    const originalArr = [...recipes];
    Utils.sortArrByKey(recipes, "name");

    searchInput.addEventListener("input", (e) => {
      e.preventDefault();
      // Delete current DOM
      recipesSection.innerHTML = "";
      numberOfRecipes.innerHTML = "";
      // Value entered in the input convert without accent and toLowerCase()
      let searchedItem = Utils.strNoAccent(e.target.value.toLowerCase().trim());
      let startToSearch = searchedItem.length >= 3;

      // Create new arr to store the sort items
      let filteredRecipeData = [];

      if (startToSearch) {
        recipes.filter((recipeData) => {
          // SORT BY NAME ✅
          // Recipe_name convert without accent and toLowerCase() and check it matches with the searchItem
          const nameStandardised = Utils.strNoAccent(
            recipeData.name.toLowerCase()
          );
          const name = nameStandardised.includes(searchedItem);

          // SORT BY INGREDIENTS ✅
          const ingredient = () => {
            for (const ingredient of recipeData.ingredients) {
              // Convert ingredients without accent and toLowerCase() and check it matches with the searchItem
              const ingr = Utils.strNoAccent(
                ingredient.ingredient.toLowerCase()
              );

              if (ingr.match(searchedItem)) {
                return ingr;
              }
            }
          };

          // SORT BY DESCRIPTION ✅
          const descriptionStandardised = Utils.strNoAccent(
            recipeData.description.toLowerCase()
          );
          const description = descriptionStandardised.includes(searchedItem);

          if (name || description || ingredient()) {
            console.log("recipe_filter", recipeData, "✅");
            filteredRecipeData.push(recipeData);
          }
        });
      } else {
        filteredRecipeData = originalArr;
      }

      // Create new DOM with filtered data
      const number = filteredRecipeData.length;

      if (number === 50) {
        FilterRecipesMainSearch.displayRecipes(originalArr);
        FilterRecipesMainSearch.updateAllDropdowns(originalArr);
      } else {
        FilterRecipesMainSearch.displayRecipes(filteredRecipeData);
        FilterRecipesMainSearch.updateAllDropdowns(filteredRecipeData);
      }
    });
  }
}

FilterRecipesMainSearch.init();
