class Utils {
  // FIRST CHARAC IN UPPERCASE AND THE REST IN LOWERCASE
  static capitalize(word) {
    const capitalize =
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    return capitalize;
  }
  // DELETE ACCENT AND USE TO LOWERCASE()
  static normalizeString(word) {
    return Utils.strNoAccent(word.toLowerCase());
  }
  // DELETE ACCENT WITH NORMALIZE AND REPLACE BY " "
  static strNoAccent(word) {
    return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  // CLEAN ID WITHOUT ACCENT, IN LOWERCASE AND REMOVE SPACE
  static fixId(word) {
    const cleanWord = Utils.normalizeString(word).replaceAll(" ", "");
    return cleanWord;
  }
  // SORT ARRAY BY NAME
  static sortLocaleCompare(arr) {
    arr.sort((a, b) => a.name.localeCompare(b.name));
  }
  //SORT ARRAY BY KEY VALUE
  static sortArrByKey(arr, key) {
    arr.sort((a, b) => {
      if (a[key] < b[key]) {
        return -1;
      } else if (a[key] > b[key]) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  // SORT ARRAY IN ASCENDING ORDER
  static sortArr(arr) {
    arr.sort((a, b) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  // DEBOUNCING FUNCTION
  static debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
}
