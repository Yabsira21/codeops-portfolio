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

const dishesGrid = document.querySelector(".dishes-grid");

dishesGrid.addEventListener("click", function (e) {
  if (!e.target.classList.contains("add-to-cart")) {
    return;
  }

  const card = e.target.closest(".dish-card");
  const id = card.dataset.id;

  const food = foods.find((food) => food.id === id);

  console.log(food);
});
