class List {
  constructor(ingredient, appliance, ustensil, number) {
    this.ingredient = ingredient;
    this.appliance = appliance;
    this.ustensil = ustensil;
    this.number = number;
  }

  createIngredientsList() {
    const $wrapper = document.createElement("li");

    const ingredientList = `
    <a class="dropdown-item" href="#">${this.ingredient}</a>
    `;

    $wrapper.innerHTML = ingredientList;
    return $wrapper;
  }
  createApplianceList() {
    const $wrapper = document.createElement("li");

    const applianceList = `
    <a class="dropdown-item" href="#">${this.appliance}</a>
    `;

    $wrapper.innerHTML = applianceList;
    return $wrapper;
  }
  createUstensilsList() {
    const $wrapper = document.createElement("li");

    const ingredientList = `
    <a class="dropdown-item" href="#">${this.ustensil}</a>
    `;

    $wrapper.innerHTML = ingredientList;
    return $wrapper;
  }
  createCountList() {
    const $wrapper = document.createElement("div");
    $wrapper.className = "py-2 px-4 fw-bold text-end";
    $wrapper.innerHTML = `${this.number} recettes`;
    return $wrapper;
  }
}
