const API_URL = "https://jsonplaceholder.typicode.com/users";

async function load() {
  const list = document.getElementById("list");

  list.innerHTML = "<li>Loading…</li>";

  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error("Request failed");
    }

    const data = await res.json();

    list.innerHTML = "";

    data.forEach((user) => {
      const li = document.createElement("li");

      li.textContent = `${user.name} - ${user.email}`;

      list.appendChild(li);
    });
  } catch (e) {
    list.innerHTML =
      "<li>Sorry, we couldn't load the users. Please try again.</li>";
  } finally {
    console.log("Loading finished");
  }
}

document.getElementById("refresh").addEventListener("click", load);

load();
