const items = [];

const form = document.querySelector("#add-form");
const input = document.querySelector("#name");
const list = document.querySelector("#list");
const count = document.querySelector("#count");

function render() {
  list.innerHTML = "";

  count.textContent = `${items.length} items`;

  items.forEach(function (item) {
    const li = document.createElement("li");

    // Give each row its ID
    li.dataset.id = item.id;

    // Add done class if item is bought
    if (item.done) {
      li.classList.add("done");
    }

    li.innerHTML = `
            ${item.name}
            <button class="buy">Bought</button>
            <button class="remove">Remove</button>
        `;

    list.appendChild(li);
  });
}

// Add item
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = input.value.trim();

  if (name === "") {
    return;
  }

  items.push({
    id: Date.now(),
    name: name,
    done: false,
  });

  input.value = "";

  // Rebuild the list
  render();
});

// Handle clicks on the list
list.addEventListener("click", function (event) {
  const row = event.target.closest("li");

  if (!row) {
    return;
  }

  const id = Number(row.dataset.id);

  const item = items.find(function (item) {
    return item.id === id;
  });

  if (!item) {
    return;
  }

  if (event.target.classList.contains("buy")) {
    item.done = !item.done;

    render();
  }

  if (event.target.classList.contains("remove")) {
    const index = items.findIndex(function (item) {
      return item.id === id;
    });

    items.splice(index, 1);

    render();
  }
});

// Initial render
render();
