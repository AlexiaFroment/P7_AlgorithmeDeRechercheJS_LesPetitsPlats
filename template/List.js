class List {
  // COUNTER
  createCountList(num) {
    const $wrapper = document.createElement("div");
    $wrapper.className = "py-2 px-4 fw-bold text-end";
    $wrapper.innerHTML = `${num} recettes`;
    return $wrapper;
  }
}
