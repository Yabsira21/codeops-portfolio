let items = [
  { id: 1, name: "Teff", done: false },
  { id: 2, name: "Berbere", done: false },
];

const list = document.querySelector("#list");
const myform = document.querySelector("#form");
const name_input = document.querySelector("#input");
const count = document.querySelector("#count");

function render() {
  list.replaceChildren();

  items.forEach(function (item) {
    const li = document.createElement("li");

    li.textContent = item.name;
    li.dataset.id = item.id;

    if (item.done) {
      li.classList.add("done");
    }

    const button = document.createElement("button");

    button.textContent = "Remove";
    button.dataset.action = "remove";

    li.append(button);
    list.append(li);
  });

  const remaining = items.filter(function (item) {
    return !item.done;
  }).length;

  count.textContent = `${remaining} items remaining`;
}

render();

myform.addEventListener("submit", function (e) {
  e.preventDefault();

  const itemText = name_input.value.trim();

  if (!itemText) return;

  const alreadyExists = items.some(function (item) {
    return item.name.toLowerCase() === itemText.toLowerCase();
  });

  if (alreadyExists) {
    alert("This item is already on your list.");
    return;
  }

  items.push({
    id: Date.now(),
    name: itemText,
    done: false,
  });

  render();
  myform.reset();
});

list.addEventListener("click", function (e) {
  const li = e.target.closest("li");

  if (!li) return;

  const clickedId = Number(li.dataset.id);

  // Remove item
  if (e.target.dataset.action === "remove") {
    items = items.filter(function (item) {
      return item.id !== clickedId;
    });

    render();
    return;
  }

  // Mark as bought / unbought
  const item = items.find(function (item) {
    return item.id === clickedId;
  });

  if (item) {
    item.done = !item.done;
  }

  render();
});
