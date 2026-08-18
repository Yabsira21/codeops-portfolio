async function load() {
  const list = document.getElementById("list");

  // Show loading state
  list.innerHTML = "<li>Loading…</li>";

  try {
    // Fetch the data
    const res = await fetch("http://localhost:3000/dishes");

    // Check for HTTP errors
    if (!res.ok) {
      throw new Error("Request failed");
    }

    // Get JSON data
    const data = await res.json();

    // Clear loading message
    list.innerHTML = "";

    // Render each dish
    data.forEach((dish) => {
      const li = document.createElement("li");

      li.textContent = `${dish.name} - ${dish.price} ETB`;

      list.appendChild(li);
    });
  } catch (e) {
    // Show error message
    list.innerHTML = "<li>Sorry, we couldn't load the dishes.</li>";
  } finally {
    console.log("Loading finished");
  }
}

// Refresh button
document.getElementById("refresh").addEventListener("click", load);

// Load dishes when page opens
load();
