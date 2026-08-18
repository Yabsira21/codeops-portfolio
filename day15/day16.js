const bill = Number(process.argv[2]);
const partySize = Number(process.argv[3]);
const paymentMethod = process.argv[4];

let tipRate;

if (bill > 300) {
  tipRate = 0.1;
} else {
  tipRate = 0.05;
}

const tip = bill * tipRate;

let serviceFee;

switch (paymentMethod) {
  case "Telebirr":
    serviceFee = 5;
    break;

  case "CBE":
    serviceFee = 3;
    break;

  default:
    serviceFee = 0;
}

const total = bill + tip + serviceFee;
const perPerson = total / partySize;

console.log(`Total: ${total} ETB`);
console.log(`Each person pays: ${perPerson} ETB`);
