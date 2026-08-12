import format, { withVat } from "./pricing.js";

const orders = [
  {
    id: 1,
    items: [
      { price: 200, qty: 2 },
      { price: 900, qty: 3 },
    ],
  },
  { id: 2, items: [{ price: 120, qty: 1 }] },
];

const grandTotal = orders
  .map((p) => p.items)
  .map((p) => p.map(({ price, qty }) => price * qty))
  .map((p) => p.reduce((sum, p) => sum + p)) // [[500], [450]]
  .reduce((sum, p) => sum + p);

orders.map((order) => {
  order.total = order.items.reduce(
    (sum, { qty, price }) => sum + qty * price,
    0,
  );
});

let ordersMorethan500 = orders.filter((o) => o.total > 500);
// console.log(ordersMorethan500);

for (let i = 0; i < orders.length; i++) {
  console.log(`Order ${i + 1}: ${format(orders[i].total)}`);
}

console.log("\nOrders over 500 ETB:");

for (let o of ordersMorethan500) {
  console.log(`Order ${ordersMorethan500.indexOf(o) + 1}: ${format(o.total)}`);
}

console.log(`\nGrand Total: ${format(grandTotal)}`);
