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

  // static bubbleSort(arr) {
  //   const n = arr.length;
  //   for (let i = 0; i < n - 1; i++) {
  //     console.log("bubbleSort_arr[i]", arr[i].ingredients, "✅");
  //     for (let j = 0; j < n - 1 - i; j++) {
  //       if (arr[j].ingredient > arr[j + 1].ingredient) {
  //         let temp = arr[j];
  //         arr[j] = arr[j + 1];
  //         arr[j + 1] = temp;
  //         console.log("bubbleSort_arr[j]", arr[j], arr[j + 1]);
  //       }
  //     }
  //   }
  //   console.log(arr);
  //   return arr;
  // }

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
}
