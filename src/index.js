document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://api.thedogapi.com/v1/breeds";
  const dogsContainer = document.getElementById("dogsContainer");
  const searchInput = document.getElementById("searchInput");
  const favoritesList = document.getElementById("favoritesList");
  const themeToggle = document.getElementById("themeToggle");

  let allDogs = [];

  // Toggle light/dark theme
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";
  });

  // Load dogs from API
  fetch(API_URL)
    .then((res) => res.json())
    .then((dogs) => {
      allDogs = dogs;
      displayDogs(dogs);
    })
    .catch((err) => {
      dogsContainer.innerHTML = `<p class="error">⚠️ Failed to load dogs. Check your internet and try again.</p>`;
      console.error("Fetch error:", err);
    });

  function displayDogs(dogs) {
    dogsContainer.innerHTML = ""; // Clear previous
    dogs.forEach((dog) => {
      const card = document.createElement("div");
      card.classList.add("dog-card");

      card.innerHTML = `
        <img src="${dog.image?.url || 'https://placedog.net/500'}" alt="${dog.name}" />
        <h3>${dog.name}</h3>
        <p>Group: ${dog.breed_group || "Unknown"}</p>
        <button>Add to Favorites</button>
      `;

      const button = card.querySelector("button");
      button.addEventListener("click", () => addToFavorites(dog.name, button));

      dogsContainer.appendChild(card);
    });
  }

  function addToFavorites(dogName, button) {
    const li = document.createElement("li");
    li.textContent = dogName;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.addEventListener("click", () => li.remove());

    li.appendChild(removeBtn);
    favoritesList.appendChild(li);

    button.disabled = true;
    button.textContent = "✅ Added";
  }

  // Live search filter
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filteredDogs = allDogs.filter((dog) =>
      dog.name.toLowerCase().includes(query)
    );
    displayDogs(filteredDogs);
  });
});
