let foods = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = [];

let cartContainer = document.querySelector(".cart-items");
let tableContainer = document.querySelector("tbody");

async function loadFoods() {
  // Show loading state
  dishesGrid.innerHTML = `
    <div class="loading">
      <img src="Assets/salad.gif" />
      <p>loading...</p>
    </div>
  `;

  try {
    // Fetch data from our "remote server"
    const response = await fetch("./data.json");

    const data = await response.json();

    await new Promise(function (resolve) {
      setTimeout(resolve, 2000);
    });

    // Store the fetched data
    foods = data;

    // Render the application
    render();
  } catch (error) {
    console.error("Failed to load foods:", error);

    dishesGrid.innerHTML = `
      <div class="loading">
        <p>Failed to load foods.</p>
      </div>
    `;
  }
}

function renderCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-cart-shopping"></i>
        <p>Your cart is empty</p>
        <span>Add something delicious to get started.</span>
      </div>
    `;

    return;
  }

  cart.forEach(function (i) {
    const li = document.createElement("div");

    li.classList.add("cart-item");
    li.dataset.id = i.food.id;

    li.innerHTML = `
      <div class="cart-item-info">

        <div class="cart-item-icon">
          <img src="${i.food.image}" alt="${i.food.name}">
        </div>

        <div class="cart-item-details">
          <h4>${i.food.name}</h4>
          <p>ETB ${i.food.price.toFixed(2)}</p>

          <div class="cart-item-qty">
            <button class="qty-btn" data-action="minus">
              <i class="fa-solid fa-minus"></i>
            </button>

            <span>${i.qty}</span>

            <button class="qty-btn" data-action="plus">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

      </div>

      <button class="edit-btn" data-action="trash">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

    cartContainer.appendChild(li);
  });
}
function renderMenu(foodList = foods) {
  const dishesGrid = document.querySelector(".dishes-grid");

  dishesGrid.innerHTML = "";

  if (foodList.length === 0) {
    dishesGrid.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-utensils"></i>
        <p>No dishes found</p>
        <span>Try searching for something else.</span>
      </div>
    `;

    return;
  }

  for (let food of foodList) {
    dishesGrid.innerHTML += `
      <div class="dish-card" data-id="${food.id}">

        <div class="dish-img">
          <img src="${food.image}" alt="${food.name}">
        </div>

        <div class="dish-name">
          ${food.name}
        </div>

        <div class="dish-subtext">
          Starting From
        </div>

        <div class="dish-price">
          ETB ${food.price.toFixed(2)}
        </div>

        <div class="dish-meta">

          <div class="dish-rating">
            <i class="fa-solid fa-star"></i>
            ${food.rating}
          </div>

          <div class="dish-add-to-cart">
            <button class="add-to-cart">
              Add to Cart
            </button>
          </div>

        </div>

      </div>
    `;
  }
}

function renderOrders() {
  tableContainer.innerHTML = "";

  orders.forEach(function (i) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <div class="customer-cell">

          <div
            class="avatar"
            style="background-image: url('https://i.pravatar.cc/100?img=12');">
          </div>

          ${i.customer.name}

        </div>
      </td>

      <td>${i.id}</td>

      <td>${i.customer.address}</td>

      <td>ETB ${i.total}</td>

      <td>
        <span class="status-badge pending">
          Pending
        </span>
      </td>
    `;

    tableContainer.appendChild(tr);
  });
}

function render(foodList = foods) {
  renderCart();
  renderMenu(foodList);
  renderOrders();

  const subTotal = calculateTotal(cart);

  if (subTotal <= 0) {
    document.querySelector(".sub-total").textContent = "ETB 0";
    document.querySelector(".grand-total").textContent = "ETB 0";
    return;
  }

  document.querySelector(".sub-total").textContent = `ETB ${subTotal}`;

  document.querySelector(".grand-total").textContent = `ETB ${subTotal + 10}`;
}

render();

function calculateTotal(cart) {
  return cart.reduce(function (total, item) {
    return total + item.food.price * item.qty;
  }, 0);
}

function validate(name, phone, address) {
  if (name.trim() === "") {
    return "Name is required.";
  }

  // Ethiopian mobile: 09XXXXXXXX or 07XXXXXXXX
  const phoneRegex = /^(09|07)\d{8}$/;

  if (!phoneRegex.test(phone.trim())) {
    return "Please enter a valid Ethiopian phone number.";
  }

  if (address.trim() === "") {
    return "Address is required.";
  }

  return null;
}

// add to cart functionality
const dishesGrid = document.querySelector(".dishes-grid");

dishesGrid.addEventListener("click", function (e) {
  if (!e.target.classList.contains("add-to-cart")) {
    return;
  }

  const card = e.target.closest(".dish-card");

  const id = card.dataset.id;

  const food = foods.find(function (food) {
    return food.id === id;
  });

  const existingItem = cart.find(function (item) {
    return item.food.id === id;
  });

  if (existingItem) {
    return;
  } else {
    cart.push({
      food: food,
      qty: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  render();
});

// cart functionality
cartContainer.addEventListener("click", function (e) {
  //trash
  if (e.target.closest(".edit-btn")) {
    const btn = e.target.closest(".edit-btn");
    const id = btn.parentElement.dataset.id;
    // const item = cart.find(function (item) {
    //   return item.food.id === id;
    // });
    cart = cart.filter(function (item) {
      return item.food.id !== id;
    });
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log(cart);

    render();
    return;
  }

  const button = e.target.closest(".qty-btn");

  if (!button) {
    return;
  }

  const cartItem = button.closest(".cart-item");

  const id = cartItem.dataset.id;

  const item = cart.find(function (item) {
    return item.food.id === id;
  });

  if (button.dataset.action === "plus") {
    item.qty++;
  }

  if (button.dataset.action === "minus") {
    item.qty--;

    if (item.qty === 0) {
      cart = cart.filter(function (item) {
        return item.food.id !== id;
      });
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  console.log(cart);

  render();
});

// filter functionality

const categories = document.querySelector(".categories-list");

categories.addEventListener("click", function (e) {
  const category = e.target.closest(".category-item");

  if (!category) {
    return;
  }

  const type = category.dataset.category;

  let filteredFoods;

  if (type === "all") {
    filteredFoods = foods;
  }

  if (type === "affordable") {
    filteredFoods = foods.filter(function (food) {
      return food.price < 500;
    });
  }

  if (type === "classy") {
    filteredFoods = foods.filter(function (food) {
      return food.price >= 1200;
    });
  }

  if (type === "spicy") {
    filteredFoods = foods.filter(function (food) {
      return food.spicy === true;
    });
  }

  if (type === "fasting") {
    filteredFoods = foods.filter(function (food) {
      return food.fasting === true;
    });
  }

  if (type === "non-fasting") {
    filteredFoods = foods.filter(function (food) {
      return food.fasting === false;
    });
  }

  render(filteredFoods);
});

// checkout functionality

const checkoutBtn = document.querySelector(".checkout-btn");
const checkoutModal = document.querySelector("#checkout-modal");
const closeModal = document.querySelector("#close-modal");

checkoutBtn.addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  checkoutModal.classList.add("active");
});

closeModal.addEventListener("click", function () {
  checkoutModal.classList.remove("active");
});

const checkoutForm = document.querySelector("#checkout-form");

checkoutForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.querySelector("#customer-name").value.trim();
  const phone = document.querySelector("#customer-phone").value.trim();
  const address = document.querySelector("#customer-address").value.trim();

  const error = validate(name, phone, address);

  const errorMessage = document.querySelector(".error-msg-form-p");

  if (error) {
    errorMessage.textContent = error;
    return;
  }

  errorMessage.textContent = "";

  const order = {
    id: Date.now(),
    foods: [...cart],
    customer: {
      name: name,
      phone: phone,
      address: address,
    },
    total: calculateTotal(cart) + 10,
    // status: "Pending",
  };

  orders.push(order);

  console.log("Order created:", order);
  console.log("All orders:", orders);

  // Clear cart
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  // Close modal
  checkoutModal.classList.remove("active");

  document.querySelector(".table-wrapper").classList.remove("hidden");

  checkoutForm.reset();

  render();
});

const searchInput = document.querySelector(".search-input");

searchInput.addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase().trim();

  const filteredFoods = foods.filter(function (food) {
    return food.name.toLowerCase().includes(searchTerm);
  });

  render(filteredFoods);
});

loadFoods();

// task done
// 1 render function instead of 3
// 2 data.json
// 3 searching with keystroke
// 4 change calulcate price to reduce
// 5 validate and clean error message
// 6 friendly menu and cart empties
