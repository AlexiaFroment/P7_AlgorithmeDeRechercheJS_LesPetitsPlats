class TagList {
  constructor(appliance) {
    this.appliance = appliance;
  }

  strNoAccent(a) {
    return a.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  fixId(word) {
    return this.strNoAccent(word).toLowerCase().replaceAll(" ", "");
  }

  createTag() {
    let id = this.fixId(this.appliance);

    let $wrapper = document.createElement("button");
    $wrapper.id = `${this.appliance}`;
    $wrapper.className =
      "tag btn btn-yellow d-block my-2 d-flex justify-content-between";
    let btn = `${this.appliance}
        <span class="close" id="${id}"> X <span>`;
    $wrapper.innerHTML = btn;
    return $wrapper;
  }
}
