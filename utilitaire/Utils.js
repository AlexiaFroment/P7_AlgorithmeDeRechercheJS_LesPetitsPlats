class Utils {
  static capitalize(word) {
    const capitalize =
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    return capitalize;
  }

  static strNoAccent(word) {
    return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  static uniqItem(arr) {
    return arr.filter((x, i) => arr.indexOf(x) === i);
  }

  static fixId(word) {
    const cleanWord = Utils.strNoAccent(word).toLowerCase().replaceAll(" ", "");
    return cleanWord;
  }

  static sortLocaleCompare(arr) {
    arr.sort((a, b) => a.name.localeCompare(b.name));
  }

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

  static deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}
