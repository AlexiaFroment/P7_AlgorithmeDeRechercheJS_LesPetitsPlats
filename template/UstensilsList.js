class UstensilsList {
  constructor(recipes, ustensil) {
    this.recipes = recipes;
    this.ustensil = ustensil;
  }

  // USTENSILS
  createUstensilsList() {
    // console.log("create : ", this.ustensil, "✅");
    const $wrapper = document.createElement("li");

    const ustensilList = `
    <a class="dropdown-item" href="#" "id="${this.ustensil}">${this.ustensil}</a>
    `;

    $wrapper.innerHTML = ustensilList;
    return $wrapper;
  }
}
