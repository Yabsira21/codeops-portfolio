let cart = [
  { id: 1, name: "Teff", qty: 2 },
  { id: 2, name: "Berbere", qty: 1 },
];

const list = document.querySelector("#list");
const myform = document.querySelector("#add-form");
const name_input = document.querySelector("#name_value");

function render() {
  list.replaceChildren();

  cart.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = `${item.name} + ${item.qty}`;
    li.dataset.id = item.id;
    list.append(li);
  });
}

render();

myform.addEventListener("submit", function (e) {
  e.preventDefault();
  const itemText = name_input.value.trim();
  if (!itemText) return;
  const existingItem = cart.find(function (item) {
    return item.name.toLowerCase() === itemText.toLowerCase();
  });

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      name: itemText,
      id: Date.now(),
      qty: 1,
    });
  }

  render();
  myform.reset();
});

list.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    const clickedId = Number(e.target.dataset.id);
    const index = cart.findIndex(function (item) {
      return item.id === clickedId;
    });

    console.log(index);
    if (cart[index] && index !== -1) {
      cart[index].qty > 1 ? cart[index].qty-- : cart.splice(index, 1);
    }

    // if (index !== -1) {
    //   cart.splice(index, 1);
    // }

    render();
  }
});
