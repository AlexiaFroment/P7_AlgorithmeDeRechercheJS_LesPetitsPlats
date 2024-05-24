class Utils {
  // FIRST CHARAC IN UPPERCASE AND THE REST IN LOWERCASE
  static capitalize(word) {
    const capitalize =
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    return capitalize;
  }

  // DELETE ACCENT WITH NORMALIZE AND REPLACE BY " "
  static strNoAccent(word) {
    return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // static uniqItem(arr) {
  //   return arr.filter((x, i) => arr.indexOf(x) === i);
  // }

  // CLEAN ID WITHOUT ACCENT, IN LOWERCASE AND REMOVE SPACE
  static fixId(word) {
    const cleanWord = Utils.strNoAccent(word).toLowerCase().replaceAll(" ", "");
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
}
