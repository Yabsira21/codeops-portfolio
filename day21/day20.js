let nameInput = document.querySelector("#name");
let phoneInput = document.querySelector("#phone");

function verify(name, phone) {
  if (!name) {
    return "Name shouldn't be empty";
  }
  if (!phone) {
    return "Phone shouldn't be empty";
  }
}

document.querySelector("#signup").addEventListener("submit", function (e) {
  e.preventDefault();
  let name = nameInput.value;
  let phone = phoneInput.value;
  let errorMsg = verify(name, phone);
  if (!errorMsg) {
    document.querySelector("#error").textContent = "Success!!!";
  } else {
    document.querySelector("#error").textContent = errorMsg;
  }
});
