class TagList {
  fixId(word) {
    const cleanWord = Utils.strNoAccent(word).toLowerCase().replaceAll(" ", "");
    return cleanWord;
  }

  // ADD AND REMOVE ACTIVE ON EACH DROPDOWN VALUE
  toggleIsActive(e, arr, recipes, values) {
    // console.log("toggle", recipes, values, "✅");
    e.preventDefault();
    // ADD TAG IN DOM
    const tagDiv = document.querySelector("#tag");
    let value = e.target;
    value.classList.add("active");

    arr.forEach((values, index) => {
      const tag = this.createTag(values);
      tagDiv.appendChild(tag);
      // console.log(arr, "✅");

      const closeBtnId = this.fixId(values);
      const closeBtn = document.getElementById(closeBtnId);
      closeBtn.dataset.index = index;

      closeBtn.addEventListener("click", function () {
        const currentIndex = Number(this.dataset.index);
        arr.splice(currentIndex, 1);
        const updateIndexCloseBtns = document.querySelectorAll(".close");
        updateIndexCloseBtns.forEach((btn, index) => {
          if (index > currentIndex) {
            btn.dataset.index = Number(btn.dataset.index) - 1;
          }
        });

        value.classList.remove("active");
        this.parentNode.remove();
        const arrUpdate = new AppliancesList();
        arrUpdate.displayFilteredRecipes(arr, recipes, values);
      });
    });
    this.displayFilteredRecipes(arr, recipes, values);
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
