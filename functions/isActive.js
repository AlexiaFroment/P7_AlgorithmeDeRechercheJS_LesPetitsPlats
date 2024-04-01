// ADD AND REMOVE ACTIVE ON APPLIANCE CLASS AND RETURN ACTIVE VALUE
function toggleIsActive(e) {
  e.preventDefault();
  let value = e.target;
  value.classList.add("active");
  console.log(value);

  // ADD TAG IN DOM
  const tagDiv = document.querySelector("#tag");
  const activeTag = document.querySelector(".dropdown-menu .active");

  let $wrapper = document.createElement("button");
  $wrapper.id = `${e.target.id}`;
  $wrapper.className =
    "tag btn btn-yellow d-block my-2 d-flex justify-content-between";
  let btn = `${e.target.id}
      <span class="close" id="${e.target.id}"> X <span>
      `;
  $wrapper.innerHTML = btn;
  tagDiv.appendChild($wrapper);

  // DELETE TAG IN DOM
  document.querySelectorAll(".close", `${e.target.id}`).forEach((v) => {
    v.addEventListener("click", (e) => {
      tagDiv.removeChild($wrapper);
      activeTag.classList.remove("active");
    });
  });

  if (value.classList.contains("active")) {
    // console.log(value.id);
    return value.id;
  }
}
