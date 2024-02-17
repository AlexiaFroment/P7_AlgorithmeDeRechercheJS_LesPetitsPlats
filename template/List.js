class List {
  constructor(ingredient) {
    this.ingredient = ingredient;
  }

  createIngredientsList() {
    const $wrapper = document.createElement("li");

    const ingredientList = `
    <a class="dropdown-item" href="#">${this.ingredient}</a>
    `;

    $wrapper.innerHTML = ingredientList;
    return $wrapper;
  }
  createAppareilList() {
    const $wrapper = document.createElement("li");

    const appareilList = `
    <a class="dropdown-item" href="#">${this.ingredient}</a>
    `;

    $wrapper.innerHTML = appareilList;
    return $wrapper;
  }
  createUstensilesList() {
    const $wrapper = document.createElement("li");

    const ingredientList = `
    <a class="dropdown-item" href="#">${this.ingredient}</a>
    `;

    $wrapper.innerHTML = ingredientList;
    return $wrapper;
  }
}
