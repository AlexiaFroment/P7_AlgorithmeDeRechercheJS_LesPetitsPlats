class FilterRecipesMainSearch {
  static init() {
    this.dropdown = new TagList();
    // console.log(this);
  }

  //   UPDATE VALUES DROPDOWN ON RECIPES FILTERED
  static updateDropdownIngredients(arr) {
    // console.log("tableau de 50 recettes", arr, "✅");
    // I GET THE TABLES OF INGREDIENTS COMPARED TO THE FILTERED RECIPES
    const filteredArr = arr.map((el) => el.ingredients);
    // console.log("ingredients_update", filteredArr, "✅");

    // I UPDATE INGREDIENTS LIST
    let list1 = [];
    filteredArr.forEach((ingredient) => {
      for (let i = 0; i < ingredient.length; i++) {
        list1.push(ingredient[i].ingredient);
      }
    });
    console.log(
      "liste d'ingredients UNIQUE dans le dropdown 🥕",
      list1.length,
      "✅"
    );

    let capitalizeList1 = list1.map((el) => Utils.capitalize(el));
    Utils.sortArr(capitalizeList1);
    const uniqList = Utils.uniqItem(capitalizeList1);

    // I UPDATE THE DROPDOWN LIST BY CREATING A NEW DROPDOWN
    const btn1 = document.getElementById("List1");
    btn1.innerHTML = "";
    uniqList.forEach((ingredient) => {
      const template = new Dropdown(arr, ingredient);
      btn1.appendChild(template.createDropdown(ingredient));
    });

    // SELECT A ITEM TO CLICK
    let List1 = document.querySelectorAll("#List1 li");
    List1.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.dropdown.toggleIsActive(e, arr, "ingr");
      });
    });
  }

  static updateDropdownAppliances(arr) {
    // I GET THE TABLES OF APPLIANCES COMPARED TO THE FILTERED RECIPES
    // console.log("arr", arr);
    const filteredArr = arr.map((el) => el.appliance);
    // console.log("appliances_update", filteredArr, "✅");

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
      const template = new Dropdown(arr, null, appliance);
      btn2.appendChild(template.createDropdown(appliance));
    });

    // SELECT A ITEM TO CLICK
    let List2 = document.querySelectorAll("#List2 li");
    List2.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.dropdown.toggleIsActive(e, arr, "app");
      });
    });
  }

  static updateDropdownUstensils(arr) {
    // I GET THE TABLES OF USTENSILS COMPARED TO THE FILTERED RECIPES
    const filteredArr = arr.map((el) => el.ustensils);

    // I UPDATE USTENSILS LIST
    let list3 = [];
    filteredArr.forEach((ustensil) => {
      for (let i = 0; i < ustensil.length; i++) {
        list3.push(ustensil[i]);
      }
    });
    console.log(
      "liste d'ustensils UNIQUE dans le dropdown 🍳",
      list3.length,
      "✅"
    );

    let capitalizeList3 = list3.map((el) => Utils.capitalize(el));
    Utils.sortArr(capitalizeList3);
    let uniqList = Utils.uniqItem(capitalizeList3);

    // I UPDATE THE DROPDOWN LIST BY CREATING A NEW DROPDOWN
    const btn3 = document.getElementById("List3");
    btn3.innerHTML = "";
    uniqList.forEach((ustensil) => {
      const template = new Dropdown(arr, null, null, ustensil);
      btn3.appendChild(template.createDropdown(ustensil));
    });

    // SELECT A ITEM TO CLICK
    let List3 = document.querySelectorAll("#List3 li");
    List3.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.dropdown.toggleIsActive(e, arr, "ust");
      });
    });
  }

  // DISPLAY RECIPES FILTERED
  static displayRecipes(arr) {
    const numberOfRecipes = document.getElementById("number_recipes");
    const recipesCards = document.getElementById("recipe");

    const number = arr.length;

    numberOfRecipes.innerHTML = "";
    recipesCards.innerHTML = "";

    const templateCount = new List();
    numberOfRecipes.appendChild(templateCount.createCountList(number));

    arr.forEach((recipe) => {
      const templateCard = new RecipeCard(recipe);
      recipesCards.appendChild(templateCard.createRecipeCard());
    });
  }

  static filterRecipesByInput(arr) {
    const searchInput = document.querySelector(".search_input");
    const recipesSection = document.querySelector("#recipe");
    const numberOfRecipes = document.querySelector("#number_recipes");

    // SORT BY NAME ✅
    Utils.sortArrByKey(arr, "name");

    searchInput.addEventListener("input", (e) => {
      // Delete current DOM
      recipesSection.innerHTML = "";
      numberOfRecipes.innerHTML = "";
      // Value entered in the input convert without accent and toLowerCase()
      let searchedItem = Utils.strNoAccent(e.target.value.toLowerCase().trim());
      let startToSearch = searchedItem.length >= 3;

      // Create new arr to store the sort items
      let filteredRecipeData = [];

      if (startToSearch) {
        arr.filter((recipeData) => {
          // Recipe_name convert without accent and toLowerCase() and check it matches with the searchItem
          const nameStandardised = Utils.strNoAccent(
            recipeData.name.toLowerCase()
          );
          const name = nameStandardised.includes(searchedItem);

          // Convert all values (ingredients, appliances, ustensils) without accent and toLowerCase() and check it matches with the searchItem
          const ingredient = () => {
            for (const ingredient of recipeData.ingredients) {
              // console.log(ingredient, recipeData, "ingredient", "✅");
              const ingr = Utils.strNoAccent(
                ingredient.ingredient.toLowerCase()
              );
              // console.log("ingr_filter", ingr, "ingredient", "✅");
              if (ingr.match(searchedItem)) {
                // console.log("match", ingr, searchedItem, "🎉");
                return ingr;
              }
              // console.log("filter", ingr, "string", "✅");
            }
          };

          const descriptionStandardised = Utils.strNoAccent(
            recipeData.description.toLowerCase()
          );
          const description = descriptionStandardised.includes(searchedItem);

          if (name || description || ingredient()) {
            filteredRecipeData.push(recipeData);
          }
        });
      } else {
        filteredRecipeData = arr;
      }

      // Create new DOM with filtered data
      const number = filteredRecipeData.length;

      if (number === 50) {
        FilterRecipesMainSearch.displayRecipes(arr);
      } else {
        FilterRecipesMainSearch.displayRecipes(filteredRecipeData);
        FilterRecipesMainSearch.updateDropdownIngredients(filteredRecipeData);
        FilterRecipesMainSearch.updateDropdownAppliances(filteredRecipeData);
        FilterRecipesMainSearch.updateDropdownUstensils(filteredRecipeData);
      }
    });
  }
}

FilterRecipesMainSearch.init();
