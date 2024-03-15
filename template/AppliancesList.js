class AppliancesList {
  constructor(recipes, appliance) {
    this.recipes = recipes;
    this.appliance = appliance;
    console.log(this);
  }

  addActive(e) {
    // e.preventDefault();
    console.log(this.recipesData);
    e.target.classList.add("active");

    // ADD TAG IN DOM
    const tag = document.querySelector("#tag");

    let $wrapper = document.createElement("button");
    $wrapper.className =
      "tag btn btn-yellow d-block my-2 d-flex justify-content-between";
    console.log("id", e.target.id);

    let btn = `${e.target.id} 
      <span class="close" id="${e.target.id}"> X <span>
      `;

    $wrapper.innerHTML = btn;
    tag.appendChild($wrapper);

    // FILTRE
    /**
     * read id
     * parcourir le tablo des ingrédients pour rechercher toutes les recettes
     */

    // DELETE TAG IN DOM
    let cross = document.querySelector(".close", `${e.target.id}`);
    console.log(cross);
    cross.addEventListener("click", (e) => {
      //   e.preventDefault();
      // if(e.target.id)
      console.log("clic", e.target, e.target.id);
      $wrapper.remove(e.target);
    });
  }

  // APPLIANCE
  createApplianceList() {
    console.log(this.recipesData);
    const $wrapper = document.createElement("li");

    const applianceList = `
      <a class="dropdown-item" href="#" id="${this.appliance}">${this.appliance}</a>
      `;

    const list2 = document.getElementById("list2");
    list2.addEventListener("click", this.addActive);

    $wrapper.innerHTML = applianceList;
    return $wrapper;
  }
}
