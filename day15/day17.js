// 1. question 1
const subtotal = (...prices) => prices.reduce((acc, p) => acc + p, 0);
console.log(subtotal(10, 20, 30));

// 2. question 2
const discountBy = (percent) => (price) => price * (1 - percent);

const member = discountBy(0.1);
console.log(member(1000));

// 3. question 3
const withVat = (price) => price * 1.15; // => same as price + price * 0.15
const toETB = (n) => `${n.toFixed(2)} ETB`;

// 4. question 4
function makeReceiptMaker() {
  let orderNo = 0;
  const memberOff = discountBy(0.1);
  return function (...items) {
    orderNo++;
    const gross = subtotal(...items);
    const net = withVat(memberOff(gross));
    return `#${orderNo}: ${toETB(net)}`;
  };
}

const receipt = makeReceiptMaker();
const receipt_2 = makeReceiptMaker();
console.log(receipt(100, 50));
console.log(receipt(200));

console.log(receipt_2(10));
console.log(receipt_2(20));
