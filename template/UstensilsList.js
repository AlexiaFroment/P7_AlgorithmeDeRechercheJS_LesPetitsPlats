class UstensilsList {
  constructor(recipes, ustensil) {
    this.recipes = recipes;
    this.ustensil = ustensil;
  }
  // USTENSILS
  createUstensilsList() {
    const $wrapper = document.createElement("li");

    const ingredientList = `
    <a class="dropdown-item" href="#">${this.ustensil}</a>
    `;

    $wrapper.innerHTML = ingredientList;
    return $wrapper;
  }
}
