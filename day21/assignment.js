// 1. A,C,B => since it's a callback js will register it as i will do as soon as there is time
// 2.

// function getUser(id, callback) {
//   return setTimeout(() => {
//     callback({ id, name: "Almaz" });
//   }, 1000);
// }

// function printer(name) {
//   console.log(name);
// }

// getUser(1, printer);

// 3. Error: out of stock becuase the promise "orderPromise" didn't resolve or we are always rejecting this promise so it straight go to the catch block

// 4.
function checkStockPromise(item) {
  return setTimeout(() => {
    return new Promise((resolve, reject) => {
      if (item == "Doro Wat") return resolve("In stock");
      else reject(new Error("out of stock"));
    });
  });
}

function checkStockPromise(item) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (item === "Doro Wat") res("In stock");
      else rej(new Error("Not found"));
    }, 500);
  });
}

// checkStock("Doro Wat").then((res) => console.log(res));

// 5. since we didn't await for it to be resolved or rejected the promise we are just gonna get the promise itself
