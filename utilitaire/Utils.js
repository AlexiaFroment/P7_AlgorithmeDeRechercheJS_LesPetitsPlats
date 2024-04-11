class Utils {
  static capitalize(word) {
    const capitalize = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalize;
  }

  static strNoAccent(word) {
    return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  static uniqItem(arr) {
    return arr.filter((x, i) => arr.indexOf(x) === i);
  }

  static sortArr(arr, key) {
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
}
