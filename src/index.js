document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://api.thedogapi.com/v1/breeds";
  const dogsContainer = document.getElementById("dogsContainer");
  const favoritesList = document.getElementById("favoritesList");
  const searchInput = document.getElementById("searchInput");
  const spinner = document.getElementById("spinner");
  const themeToggle = document.getElementById("themeToggle");

  let dogsData = [];

  // Toggle light/dark mode
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent =
      document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
  });

  function showSpinner() {
    spinner.classList.remove("hidden");
  }

  function hideSpinner() {
    spinner.classList.add("hidden");
  }

  function displayDogs(dogs) {
    dogsContainer.innerHTML = "";

    dogs.forEach(dog => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${dog.image?.url || 'https://placedog.net/400'}" alt="${dog.name}">
        <h3>${dog.name}</h3>
        <p><strong>Group:</strong> ${dog.breed_group || "N/A"}</p>
        <button>Add 💖</button>
      `;

      const button = card.querySelector("button");
      button.addEventListener("click", () => {
        button.textContent = "Added! ✅";
        button.disabled = true;
        addToFavorites(dog.name);
      });

      dogsContainer.appendChild(card);
    });
  }

  function addToFavorites(name) {
    const li = document.createElement("li");
    li.textContent = name;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.addEventListener("click", () => li.remove());

    li.appendChild(removeBtn);
    favoritesList.appendChild(li);
  }

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = dogsData.filter(dog => dog.name.toLowerCase().includes(value));
    displayDogs(filtered);
  });

  showSpinner();
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      dogsData = data;
      displayDogs(data);
    })
    .catch(err => console.error("Fetch error:", err))
    .finally(() => hideSpinner());
});
