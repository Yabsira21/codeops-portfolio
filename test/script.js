let foods = [
  {
    id: 1,
    name: "Doro wot",
    img: "../Group-assignment/Assets/doro.png",
    price: 800,
  },
  {
    id: 2,
    name: "gomen",
    img: "../Group-assignment/Assets/gomen.png",
    price: 400,
  },
  {
    id: 3,
    name: "kuret",
    img: "../Group-assignment/Assets/kuret.png",
    price: 1200,
  },
];

let cart = [];

const mainContainer = document.querySelector(".container");

for (let food of foods) {
  console.log(food);
  mainContainer.innerHTML += `
    <div class="card" data-id="${food.id}">
            <p>${food.name}</p>
            <img src="${food.img}" alt="food img not found">
            <p>${food.price} etb</p>
            <button class="add-to-cart">add to cart</button>
        </div>
    `;
}

// mainContainer.addEventListener("click", function (e) {
//   console.log(e);
// });
const btn = document.querySelector(".click-me");

// btn.addEventListener("click", function () {
//   //   console.log("hi");
//   //   console.log('hoowohwo');
//   //   document.querySelector("body").classList.add("green");
// //   document.querySelector(".box").classList.add("red");
// });

// mainContainer.innerHTML += `
// <div class="card">
//             <p>Doro wot</p>
//             <img src="../Group-assignment/Assets/doro.png" alt="">
//             <p>100 etb</p>
//         </div>
//         <div class="card">
//             <p>Gomen</p>
//             <img src="../Group-assignment/Assets/gomen.png" alt="">
//             <p>200 etb</p>
//         </div>
//         <div class="card">
//         <p>kuret</p>

//         </div>
// `;

mainContainer.addEventListener("click", function (e) {
  const btn = e.target.closest(".add-to-cart");
  if (!btn) return;

  const id = btn.parentElement.dataset.id;

  const food = foods.find((i) => i.id == id);

  console.log(food);

  if (cart.includes(food)) {
    console.log("Already in cart");
  } else {
    cart.push(food);
  }

  console.log(cart);
});

// document.querySelector(".add-to-cart").addEventListener("click", function (e) {
//   console.log("hi");
//   console.log(e.target);
//   console.log(e.target.parentElement.dataset.id);
// });
