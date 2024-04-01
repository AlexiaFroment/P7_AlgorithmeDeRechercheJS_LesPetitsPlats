class IngredientsList {
  constructor(ingredient, recipesData) {
    this.ingredient = ingredient;
    this.recipesData = recipesData;

    // console.log("ingredients", this, "✅");
  }

  //   ADD ACTIVE ON EACH NGREDIENT SELECTED IN DROPDOWN AND REMOVE THIS CLASS WHEN I CLICK ON THE CROSS

  toggleIsActive(e) {
    e.preventDefault();
    console.log("this", this.ingredient, this.recipesData, "✅");

    let value = e.target.id;
    let selection = document.getElementById(value);

    selection.classList.add("active");

    // ADD TAG IN DOM
    const tagDiv = document.querySelector("#tag");
    let $wrapper = document.createElement("button");
    $wrapper.id = value;
    $wrapper.className =
      "tag btn btn-yellow d-block my-2 d-flex justify-content-between";
    let btn = `${value}
    <span class="close" id="${value.id}"> X <span>
    `;
    $wrapper.innerHTML = btn;
    tagDiv.appendChild($wrapper);
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
    // console.log(this.ingredient, this.recipesData, "✅");
    const $wrapper = document.createElement("li");
    $wrapper.className = "item";

    const ingredientList = `
      <a class="dropdown-item" href="#" id="${this.ingredient}"> ${this.ingredient}  </a>
      `;

    $wrapper.innerHTML = ingredientList;

    const list1 = document.querySelector("#list1");
    list1.addEventListener("click", (e) => this.toggleIsActive(e));

    return $wrapper;
  }
}
