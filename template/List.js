class List {
  constructor(ingredient, appliance, ustensil) {
    this.ingredient = ingredient;
    this.appliance = appliance;
    this.ustensil = ustensil;
    console.log(this);
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
    <a class="dropdown-item" href="#">${this.ingredient}</a>
    `;

    $wrapper.innerHTML = applianceList;
    return $wrapper;
  }
  createUstensilsList() {
    const $wrapper = document.createElement("li");

    const ingredientList = `
    <a class="dropdown-item" href="#">${this.ingredient}</a>
    `;

    $wrapper.innerHTML = ingredientList;
    return $wrapper;
  }
  createCountList() {
    $wrapper = document.createElement("div");
    $wrapper.className = "py-2 px-4 fw-bold text-end";
    $wrapper.innerHTML = `${this.number} recettes`;
  }
}

{
  /* <div class="py-2 px-4 fw-bold text-end">1500 recettes</div> */
}
