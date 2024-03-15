class List {
  constructor(ingredient, appliance, ustensil, number) {
    this.ingredient = ingredient;
    this.appliance = appliance;
    this.ustensil = ustensil;
    this.number = number;
    // console.log(this);
  }

  addActive(e) {
    e.preventDefault();
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

    // FILTRE
    /**
     * read id
     * parcourir le tablo des ingrédients pour rechercher toutes les recettes
     */

    // DELETE TAG IN DOM
    const cross = document.querySelector(".close", `${e.target.id}`);
    console.log(cross);
    cross.addEventListener("click", (e) => {
      e.preventDefault();
      // if(e.target.id)
      console.log("clic", e.target, e.target.id);
    });
  }

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
  // APPLIANCE
  createApplianceList() {
    const $wrapper = document.createElement("li");

    const applianceList = `
    <a class="dropdown-item" href="#">${this.appliance}</a>
    `;

    $wrapper.innerHTML = applianceList;
    return $wrapper;
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
  // COUNTER
  createCountList() {
    const $wrapper = document.createElement("div");
    $wrapper.className = "py-2 px-4 fw-bold text-end";
    $wrapper.innerHTML = `${this.number} recettes`;
    return $wrapper;
  }
}
