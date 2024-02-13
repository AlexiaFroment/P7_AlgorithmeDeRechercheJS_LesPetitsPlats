class ApiRecipes {
  constructor(url) {
    this._url = url;
  }
  async get() {
    return fetch(this._url)
      .then((res) => res.json())
      .then((res) => eval(res))
      .catch((err) => console.log("an error occurs", err));
  }
}
