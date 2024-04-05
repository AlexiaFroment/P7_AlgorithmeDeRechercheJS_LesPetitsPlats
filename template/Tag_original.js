class TagList {
  constructor(appliance, ustensil, ingredient) {
    this.appliance = appliance;
    this.ustensil = ustensil;
    this.ingredient = ingredient;
    // console.log("taglist", this);
  }

  strNoAccent(word) {
    return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  fixId(word) {
    return this.strNoAccent(word).toLowerCase().replaceAll(" ", "");
  }

  createTag(value) {
    let id = this.fixId(value);

    let $wrapper = document.createElement("button");
    $wrapper.id = `${value}`;
    $wrapper.className =
      "tag btn btn-yellow d-block my-2 d-flex justify-content-between";
    let btn = `${value}
          <span class="close" id="${id}"> X <span>`;
    $wrapper.innerHTML = btn;
    return $wrapper;
  }
}
