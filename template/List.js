class List {
  constructor(ingredient, appliance, ustensil, number) {
    this.ingredient = ingredient;
    this.appliance = appliance;
    this.ustensil = ustensil;
    this.number = number;
  }

  addActive(e) {
    e.preventDefault();
    e.target.classList.add("active");

    // ADD LABEL IN DOM
    const label = document.querySelector("#label");
    const $wrapper = document.createElement("button");
    $wrapper.className =
      "label btn btn-yellow d-block my-2 d-flex justify-content-between";
    const btn = `${e.target.id}
    <span id="close"> X <span>
    `;
    $wrapper.innerHTML = btn;
    label.appendChild($wrapper);

    // DELETE LABEL IN DOM
    const cross = document.getElementById("close");
    cross.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("clic", e.target, e.currentTarget);
    });
  }

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
