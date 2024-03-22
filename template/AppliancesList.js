class AppliancesList {
  constructor(recipes, appliance) {
    this.recipes = recipes;
    this.appliance = appliance;
    // console.log(this.recipes, this.appliance);
  }

  displayActive() {
    /**
     * IF (ISACTIVE) RETURN RECIPES WITH ACTIVE APPLIANCE
     */
    console.log(pomme);
  }

  // ADD AND REMOVE ACTIVE ON APPLIANCE CLASS
  toggleActive(e) {
    e.preventDefault();
    e.target.classList.add("active");

    // ADD TAG IN DOM
    const tagDiv = document.querySelector("#tag");
    const activeTag = document.querySelector(".dropdown-menu .active");

    let $wrapper = document.createElement("button");
    $wrapper.id = `${e.target.id}`;
    $wrapper.className =
      "tag btn btn-yellow d-block my-2 d-flex justify-content-between";
    let btn = `${e.target.id}
      <span class="close" id="${e.target.id}"> X <span>
      `;
    $wrapper.innerHTML = btn;
    tagDiv.appendChild($wrapper);
    this.displayActive();

    // DELETE TAG IN DOM
    document.querySelectorAll(".close", `${e.target.id}`).forEach((v) => {
      v.addEventListener("click", (e) => {
        tagDiv.removeChild($wrapper);
        activeTag.classList.remove("active");
      });
    });
  }

  // APPLIANCE
  createApplianceList() {
    const $wrapper = document.createElement("li");

    const applianceList = `
      <a class="dropdown-item" href="#" id="${this.appliance}">${this.appliance}</a>
      `;

    const list2 = document.getElementById("list2");
    list2.addEventListener("click", this.toggleActive);

    $wrapper.innerHTML = applianceList;
    return $wrapper;
  }
}
