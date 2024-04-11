class List {
  constructor(number) {
    this.number = number;
  }

  // COUNTER
  createCountList() {
    const $wrapper = document.createElement("div");
    $wrapper.className = "py-2 px-4 fw-bold text-end";
    $wrapper.innerHTML = `${this.number} recettes`;
    return $wrapper;
  }
}
