import { createElement } from "../functions/dom.js";
export class TagList {
  constructor(tag) {
    const item = `${e.target.id}`;
    const btn = createElement("button", {
      class: "tag btn btn-yellow d-block my-2 d-flex justify-content-between",
      id: item,
    });
    btn.innerText = item;
    const cross = createElement("span", {
      class: "close",
      id: item,
    });
    btn.append(cross);
  }
}
