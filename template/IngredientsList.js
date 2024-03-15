class IngredientsList {
  constructor(ingredient, recipesData) {
    this.ingredient = ingredient;
    this.recipesData = recipesData;

    // console.log(this.recipesData);
  }

  //   ADD ACTIVE ON EACH NGREDIENT SELECTED

  addActive(e) {
    e.preventDefault();
    // console.log(this.recipesData);
    e.target.classList.add("active");

    // ADD TAG IN DOM
    const tag = document.querySelector("#tag");

    const $wrapper = document.createElement("button");
    $wrapper.className =
      "tag btn btn-yellow d-block my-2 d-flex justify-content-between";

    const btn = `${e.target.id} 
      <span class="close" id="${e.target.id}"> X <span>
      `;

    $wrapper.innerHTML = btn;
    tag.appendChild($wrapper);

    console.log(e.target, e.target.id);
    return $wrapper;
  }

  // FILTRE
  /**
   * read id
   * parcourir le tablo des ingrédients pour rechercher toutes les recettes
   */
  filterByIngredient() {
    console.log(this.recipesData);
  }

  // DELETE TAG IN DOM

  // INGREDIENT
  createIngredientsList() {
    const $wrapper = document.createElement("li");
    $wrapper.className = "item";

    const ingredientList = `
      <a class="dropdown-item" href="#" id="${this.ingredient}">${this.ingredient}</a>
      `;

    $wrapper.innerHTML = ingredientList;

    const list1 = document.querySelector("#list1");
    list1.addEventListener("click", this.addActive);

    return $wrapper;
  }
}
