// index.js

document.addEventListener("DOMContentLoaded", () => {
  const breedList = document.getElementById("breed-list");
  const favoritesList = document.getElementById("favorites-list");
  const adoptedList = document.getElementById("adopted-list");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  let adopted = JSON.parse(localStorage.getItem("adopted")) || [];

  function fetchBreeds() {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then(res => res.json())
      .then(data => {
        const breeds = Object.keys(data.message).slice(0, 12); // limit to 12 breeds
        breeds.forEach(breed => fetchBreed(breed));
      })
      .catch(err => console.error("Error fetching breeds:", err));
  }

  function fetchBreed(breed) {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then(res => res.json())
      .then(data => renderDog(breed, data.message))
      .catch(err => console.error(`Error fetching image for ${breed}:`, err));
  }

  function renderDog(breed, imageUrl) {
    const card = document.createElement("div");
    card.className = "dog-card";
    card.innerHTML = `
      <img src="${imageUrl}" alt="${breed}" class="dog-img"/>
      <h3 class="dog-name">${breed}</h3>
      <div class="dog-buttons">
        <button class="fav-btn">Favorite</button>
        <button class="adopt-btn">Adopt</button>
      </div>
    `;

    const favBtn = card.querySelector(".fav-btn");
    const adoptBtn = card.querySelector(".adopt-btn");

    favBtn.addEventListener("click", () => handleFavorite(breed));
    adoptBtn.addEventListener("click", () => handleAdopt(breed));

    breedList.appendChild(card);
  }

  function handleFavorite(breed) {
    if (!favorites.includes(breed)) {
      favorites.push(breed);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateFavoritesUI();
    }
  }

  function handleAdopt(breed) {
    if (!adopted.includes(breed)) {
      adopted.push(breed);
      localStorage.setItem("adopted", JSON.stringify(adopted));
      updateAdoptedUI();
    }
  }

  function updateFavoritesUI() {
    favoritesList.innerHTML = "";
    favorites.forEach(breed => {
      const li = document.createElement("li");
      li.textContent = breed;
      favoritesList.appendChild(li);
    });
  }

  function updateAdoptedUI() {
    adoptedList.innerHTML = "";
    adopted.forEach(breed => {
      const li = document.createElement("li");
      li.textContent = breed;
      adoptedList.appendChild(li);
    });
  }

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
      breedList.innerHTML = "";
      fetchBreed(query);
    }
  });

  // Hover effect for header title
  const headerTitle = document.getElementById("header-title");
  headerTitle.addEventListener("mouseover", () => {
    headerTitle.style.color = "#ff4081";
  });
  headerTitle.addEventListener("mouseout", () => {
    headerTitle.style.color = "#fff";
  });

  // Initial render
  fetchBreeds();
  updateFavoritesUI();
  updateAdoptedUI();
});
