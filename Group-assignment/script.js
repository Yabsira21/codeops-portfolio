// // 1. food
// const food = {
//   id: "1",
//   category: "Main",
//   price: 240, // ETB
//   spicy: true,
//   image: "doro.jpg",
// };

// // 2. cart
// const cart = [{ food, qty: 1 }];

// // 3. order
// const order = {
//   id: 1,
//   foods: [{ food, qty: 2 }],
//   customer: {
//     name: "Yabsira",
//     phone: "0912345678",
//     address: "Bole, Addis Ababa",
//   },
// };

let foods = [
  {
    id: "1",
    category: "Main",
    name: "Doro wot",
    price: 600, // ETB
    spicy: true,
    fasting: false,
    image: "Assets/doro.png",
    rating: 4.5,
  },
  {
    id: "2",
    category: "Main",
    name: "Gomen",
    price: 300, // ETB
    spicy: false,
    fasting: true,
    image: "Assets/gomen.png",
    rating: 3.45,
  },
];
// let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cart = [];
let cartContainer = document.querySelector(".cart-items");
for (let food of foods) {
  document.querySelector(".dishes-grid").innerHTML += `
  <div class="dish-card" data-id="${food.id}">
        <div class="dish-img"><img src="${food.image}" alt=""></div>
        <div class="dish-name">${food.name}</div>
        <div class="dish-subtext">Starting From</div>
        <div class="dish-price">ETB ${food.price.toFixed(2)}</div>
        <div class="dish-meta">
            <div class="dish-rating"><i class="fa-solid fa-star"></i> ${food.rating}</div>
            <div class="dish-add-to-cart"><button class="add-to-cart">Add to Cart</button></div>
        </div>
    </div>
  `;
}

function render() {
  cartContainer.innerHTML = "";

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

      <div class="edit-btn">
        <i class="fa-solid fa-pen"></i>
      </div>
    `;

    cartContainer.appendChild(li);
  });
}

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
    existingItem.qty++;
  } else {
    cart.push({
      food: food,
      qty: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  render();
  console.log(cart);
});

cartContainer.addEventListener("click", function (e) {
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
