document.addEventListener("DOMContentLoaded", () => {
  const dogList = document.getElementById("dog-list");
  const favorites = document.getElementById("favorites");
  const searchInput = document.getElementById("search");

  let dogs = [];

  // Fetch random dog images
  fetch("https://dog.ceo/api/breeds/image/random/10")
    .then(res => res.json())
    .then(data => {
      dogs = data.message.map(url => {
        // Extract breed from URL
        const parts = url.split("/");
        const breed = parts[parts.indexOf("breeds") + 1];
        return { url, breed };
      });
      renderDogs(dogs);
    });

  // Render dogs
  function renderDogs(dogArray) {
    dogList.innerHTML = "";
    dogArray.forEach(dog => {
      const card = document.createElement("div");
      card.className = "dog-card";

      const img = document.createElement("img");
      img.src = dog.url;

      const breedName = document.createElement("p");
      breedName.textContent = `Breed: ${dog.breed}`;

      const adoptBtn = document.createElement("button");
      adoptBtn.textContent = "Adopt ❤️";
      adoptBtn.addEventListener("click", () => adoptDog(dog));

      card.appendChild(img);
      card.appendChild(breedName);
      card.appendChild(adoptBtn);

      dogList.appendChild(card);
    });
  }

  // Adopt dog
  function adoptDog(dog) {
    const favCard = document.createElement("div");
    favCard.className = "dog-card";

    const img = document.createElement("img");
    img.src = dog.url;

    const breedName = document.createElement("p");
    breedName.textContent = `Breed: ${dog.breed}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove 🗑️";
    removeBtn.addEventListener("click", () => favCard.remove());

    favCard.appendChild(img);
    favCard.appendChild(breedName);
    favCard.appendChild(removeBtn);

    favorites.appendChild(favCard);
  }

  // Search/filter
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = dogs.filter(dog =>
      dog.breed.toLowerCase().includes(term)
    );
    renderDogs(filtered);
  });
});

