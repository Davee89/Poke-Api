"use strict";

// ? Variables
const main = document.querySelector("main");
const buttonAdd = document.querySelector(".add");
let accountBalance = 100;
const balanceInfo = document.querySelector("#balance");
const shopLink = document.querySelector("#shop-link");
const homeContent = document.querySelector("#index__content");

// ! Main functions for calculating account balance
const updateBalance = () => {
  if (window.localStorage.getItem("accountBalance")) {
    accountBalance = JSON.parse(window.localStorage.getItem("accountBalance"));
    balanceInfo.innerText = accountBalance;
  } else balanceInfo.innerText = accountBalance;
};
if (balanceInfo) updateBalance();

const getLocalBalance = () => {
  if (window.localStorage.getItem("accountBalance")) accountBalance = JSON.parse(window.localStorage.getItem("accountBalance"));
};

const setLocalBalance = () => {
  window.localStorage.setItem("accountBalance", accountBalance);
};

// ! Displaying type - background //
const displayType = (type, card) => {
  switch (type) {
    case "fire":
      card.classList.add(`${type}`);
      break;
    case "water":
      card.classList.add(`${type}`);
      break;
    case "psychic":
      card.classList.add(`${type}`);
      break;
    case "normal":
      card.classList.add(`${type}`);
      break;
    case "electric":
      card.classList.add(`${type}`);
      break;
    case "grass":
      card.classList.add(`${type}`);
      break;
    case "fighting":
      card.classList.add(`${type}`);
      break;
    case "poison":
      card.classList.add(`${type}`);
      break;
    case "ghost":
      card.classList.add(`${type}`);
      break;
    case "dragon":
      card.classList.add(`${type}`);
      break;
    case "bug":
      card.classList.add(`${type}`);
      break;
    case "ground":
      card.classList.add(`${type}`);
      break;
    case "rock":
      card.classList.add(`${type}`);
      break;
    case "ice":
      card.classList.add(`${type}`);
      break;
    case "fairy":
      card.classList.add(`${type}`);
      break;
    default:
      console.log(type);
  }
};

const fetchNewPokemon = (id, place, info, timeout) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const newPokemonCard = document.createElement("div");
      newPokemonCard.classList.add("pokemon__card", "animated", "transition");
      newPokemonCard.setAttribute("data-id", `${data.id}`);
      displayType(data.types[0].type.name, newPokemonCard);
      if (info) info.innerText = "Let's see what you got this time.";
      newPokemonCard.style.width = "0rem";
      newPokemonCard.style.height = "0rem";
      if (!place) return;
      place.appendChild(newPokemonCard);
      VanillaTilt.init(document.querySelectorAll(".pokemon__card")),
        {
          glare: true,
          scale: 1.2,
        };

      if (openingContainer) openingContainer.style.minHeight = "65rem";
      requestAnimationFrame(() =>
        setTimeout(() => {
          if (sellPokemon) sellPokemon.scrollIntoView({ behavior: "smooth" });
          newPokemonCard.style.width = "30rem";
          newPokemonCard.style.height = "40rem";
          newPokemonCard.classList.add("hidden");
          if (info) info.innerText = "Let's see what you got this time..";
          setTimeout(() => {
            if (info) info.innerText = "Let's see what you got this time...";
            newPokemonCard.setAttribute("data-tilt", "");
            newPokemonCard.innerHTML = `<div class= 'pokemon__image'>
            <img src="${data.sprites.other.dream_world.front_default}" /></div>
            <h2 class = 'pokemon__name'>${data.name.toUpperCase()}</h2>
            <p class = 'pokemon__type'>${data.types[0].type.name.toUpperCase()}</p>
            <div class = "pokemon__stats">
            <div class = 'hp'>HP: <span>${data.stats[0].base_stat}</span></div>
            <div class = 'attack'>Attack: <span>${data.stats[1].base_stat}</span></div>
            <div class = 'def'>Defense: <span>${data.stats[2].base_stat}</span></div>
            <div class = 'sp-attack'>Sp. Att: <span>${data.stats[3].base_stat}</span></div>
            <div class = 'sp-def'>Sp. Def: <span>${data.stats[4].base_stat}</span></div>
            <div class = 'speed'>Speed: <span>${data.stats[5].base_stat}</span></div>
            </div>
            </div>`;
            newPokemonCard.classList.add("rotate-vert-center");
            setTimeout(() => {
              if (info) info.innerText = `Congratulations! You drew ${data.name.replace(data.name[0], data.name[0].toUpperCase())}`;
              newPokemonCard.classList.remove("hidden");
              newPokemonCard.classList.remove("transition");
              newPokemonCard.classList.remove("rotate-vert-center");
            }, timeout * 2);
          }, timeout);
        })
      );
    })
    .catch((error) => {
      console.log(error);
    });
};
setTimeout(() => {
  for (let i = 1; i <= 150; i++) {
    fetchNewPokemon(i, document.querySelector(".pokedex__main"));
    document.querySelectorAll(".newPokemonCard").forEach((element) => element.classList.add("hidden"));
  }
  setTimeout(() => {
    document.querySelectorAll(".newPokemonCard").forEach((element) => element.classList.remove("hidden"));
  }, 2000);
});

fetchNewPokemon(6, homeContent);
fetchNewPokemon(9, homeContent);

// ! Unboxing pokemon ! //
const basicBox = document.querySelector("#box-basic");
const advancedBox = document.querySelector("#box-advanced");
const legendaryBox = document.querySelector("#box-legendary");
const openingContainer = document.querySelector("#box-opening");
const drawnPokemonContainer = document.querySelector(".result");
const messageInfo = document.querySelector(".info");
const collectionAdd = document.querySelector("#add-to-collection");
const sellPokemon = document.querySelector("#sell");

// ! Pokeball shop interactions

advancedBox?.addEventListener("pointerover", () => {
  advancedBox.src = "/images/pokeball-advanced-active.png";
});
advancedBox?.addEventListener("pointerleave", () => {
  advancedBox.src = "/images/pokeball-advanced.png";
});

basicBox?.addEventListener("pointerover", () => {
  basicBox.src = "/images/pokeball-basic-active.png";
});
basicBox?.addEventListener("pointerleave", () => {
  basicBox.src = "/images/pokeball-basic.png";
});

legendaryBox?.addEventListener("pointerover", () => {
  legendaryBox.src = "/images/pokeball-legendary-active.png";
});
legendaryBox?.addEventListener("pointerleave", () => {
  legendaryBox.src = "/images/pokeball-legendary.png";
});
let collection = [];

const basicPokemons = [1, 4, 7, 10, 13, 16, 19, 21, 23, 25, 27, 29, 32, 35, 37, 39, 41, 43, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 74, 77, 79, 81, 83, 84, 86, 88, 90, 92, 96, 98, 100, 102, 104, 108, 109, 111, 114, 116, 118, 120, 129, 132, 133];

const advancedPokemons = [2, 5, 8, 11, 12, 14, 15, 18, 17, 20, 22, 24, 26, 28, 30, 33, 36, 38, 40, 42, 44, 47, 49, 51, 53, 55, 57, 59, 61, 64, 67, 70, 73, 75, 78, 80, 82, 85, 87, 89, 91, 93, 95, 97, 99, 101, 103, 105, 106, 107, 110, 112, 113, 115, 117, 119, 121, 122, 124, 127, 128, 131, 134, 135, 136, 137, 138, 140, 143, 147];

const legendaryPokemons = [3, 6, 9, 31, 34, 45, 65, 68, 71, 76, 94, 123, 125, 126, 130, 139, 141, 142, 144, 145, 146, 148, 149, 150];

// ! Function for unboxing ! //

const unBox = (boxName) => {
  const random = boxName.at(Math.random() * boxName.length);
  if (!openingContainer.querySelector(".pokemon__card")) {
    fetchNewPokemon(random, drawnPokemonContainer, messageInfo, 1000);
    openingContainer.style.display = "flex";

    switch (boxName.length) {
      case 55:
        getLocalBalance();
        accountBalance -= 20;
        setLocalBalance();
        updateBalance();
        break;

      case 180:
        getLocalBalance();
        accountBalance -= 40;
        setLocalBalance();
        updateBalance();
        break;

      case 384:
        getLocalBalance();
        accountBalance -= 60;
        setLocalBalance();
        updateBalance();
        break;

      default:
        console.log("Something went wrong with buying boxes!");
    }
  }
};

basicBox?.addEventListener("click", unBox.bind(null, basicPokemons));

advancedBox?.addEventListener("click", unBox.bind(null, [...basicPokemons, ...basicPokemons, ...advancedPokemons]));

legendaryBox?.addEventListener("click", unBox.bind(null, [...basicPokemons, ...basicPokemons, ...basicPokemons, ...basicPokemons, ...advancedPokemons, ...advancedPokemons, ...legendaryPokemons]));

// ! Adding to collection pokemon
collectionAdd?.addEventListener("click", (e) => {
  e.preventDefault();
  const pokemonCard = document.querySelector(".pokemon__card");
  // const pokemonName = document.querySelector(".pokemon__card h2").innerText.toLowerCase();
  const pokemonObject = {
    id: +pokemonCard.dataset.id,
    name: document.querySelector(".pokemon__card h2").innerText.toLowerCase(),
    type: document.querySelector(".pokemon__card p").innerText.toLowerCase(),
    stats: {
      hp: +document.querySelector(".hp span").innerText.toLowerCase(),
      attack: +document.querySelector(".attack span").innerText.toLowerCase(),
      def: +document.querySelector(".def span").innerText.toLowerCase(),
      spattack: +document.querySelector(".sp-attack span").innerText.toLowerCase(),
      spdef: +document.querySelector(".sp-def span").innerText.toLowerCase(),
      speed: +document.querySelector(".speed span").innerText.toLowerCase(),
    },
  };
  if (window.localStorage.getItem("userPokemonsCollection")) collection = JSON.parse(window.localStorage.getItem("userPokemonsCollection"));
  collection.push(pokemonObject);
  window.localStorage.setItem("userPokemonsCollection", JSON.stringify(collection));
  pokemonCard.remove();
  messageInfo.innerText = "";
  openingContainer.style.display = "none";
});
// ! Selling pokemons ! //
sellPokemon?.addEventListener("click", (e) => {
  e.preventDefault();
  const pokemonCard = document.querySelector(".pokemon__card");
  if (pokemonCard) {
    getLocalBalance();
    accountBalance += 10;
    pokemonCard.remove();
    setLocalBalance();
    messageInfo.innerText = "";
    updateBalance();
    openingContainer.style.display = "none";
  }
});

// ? SHOP CARDS
const shopItems = document.querySelector(".shop__items");

shopItems?.addEventListener("click", (e) => {
  e.preventDefault();
  const card = e.target.closest("a")?.innerText.toLowerCase();
  if (card) {
    shopItems.querySelectorAll("a").forEach((element) => {
      if (element.innerText.toLowerCase() === card) {
        document.querySelector(`#${card}`).style.display = "grid";
        element.classList.add("active");
      } else {
        document.querySelector(`#${element.innerText.toLowerCase()}`).style.display = "none";
        element.classList.remove("active");
      }
    });
  }
});

const collectionContainer = document.querySelector("#collection");
let currentCollection = [];
const refreshButton = document.querySelector("#refresh");

const simpleRefreshCollection = () => {
  if (currentCollection) {
    collectionContainer?.querySelectorAll("div").forEach((element) => element.remove());
    currentCollection?.forEach((pokemon) => fetchNewPokemon(pokemon.name, collectionContainer));
  }
};

const updateCollection = () => {
  currentCollection = JSON.parse(window.localStorage.getItem("userPokemonsCollection"));
  simpleRefreshCollection();
};
updateCollection();

refreshButton?.addEventListener("click", () => {
  if (currentCollection) updateCollection();
});

const sortLinks = document.querySelector(".collection__sort");

sortLinks?.addEventListener("click", (e) => {
  const link = e.target.closest("button")?.innerText.toLowerCase();
  console.log(link);
  if (link) {
    sortLinks.querySelectorAll("button").forEach((element) => {
      if (element.innerText.toLowerCase() === link) {
        if (document.querySelector(`.${link}`).classList.contains("active")) {
          document.querySelector(`#${link}-sort`).style.display = "none";
          element.classList.remove("active");
        } else {
          document.querySelector(`#${link}-sort`).style.display = "flex";
          element.classList.add("active");
        }
      } else {
        document.querySelector(`#${element.innerText.toLowerCase()}-sort`).style.display = "none";
        element.classList.remove("active");
      }
    });
  }
});

// ! SORTING MECHANISM ! //

const sortByTypeContainer = document.querySelector("#type-sort");
const sortByIdContainer = document.querySelector("#id-sort");
const sortByStatsContainer = document.querySelector("#stats-sort");
const sortByNameContainer = document.querySelector("#name-sort");

const makeActive = (container, e) => {
  container.querySelectorAll("a").forEach((button) => button.classList.remove("active"));
  e.target.classList.add("active");
};

sortByIdContainer?.querySelectorAll("a").forEach((button) =>
  button.addEventListener("click", (e) => {
    const sortButton = e.target.innerText.at(-1);
    if (sortButton > 0) {
      currentCollection.sort((a, b) => b.id - a.id);
      makeActive(sortByIdContainer, e);
    } else {
      currentCollection.sort((a, b) => a.id - b.id);
      makeActive(sortByIdContainer, e);
    }
    simpleRefreshCollection();
  })
);

sortByNameContainer?.querySelectorAll("a").forEach((button) =>
  button.addEventListener("click", (e) => {
    const sortButton = e.target.innerText.at(0);
    if (sortButton === "A") {
      currentCollection.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
      });
      makeActive(sortByNameContainer, e);
    } else {
      currentCollection.sort((a, b) => {
        if (b.name > a.name) return 1;
        if (b.name < a.name) return -1;
      });
      makeActive(sortByNameContainer, e);
    }
    simpleRefreshCollection();
  })
);

const sortByStats = (stat, e) => {
  if (!e.target.classList.contains("sortedUp")) {
    currentCollection.sort((a, b) => a.stats[stat] - b.stats[stat]);
    sortByStatsContainer.querySelectorAll("a").forEach((button) => button.classList.remove("sortedDown", "sortedUp"));
    e.target.classList.add("sortedUp");
  } else {
    currentCollection.sort((a, b) => b.stats[stat] - a.stats[stat]);
    e.target.classList.remove("sortedUp");
    e.target.classList.add("sortedDown");
  }
};

sortByStatsContainer?.querySelectorAll("a").forEach((button) =>
  button.addEventListener("click", (e) => {
    const sortButton = e.target.innerText.toLowerCase();
    console.log(sortButton);
    console.log(e.target);
    switch (sortButton) {
      case "hp":
        sortByStats(sortButton, e);
        break;
      case "attack":
        sortByStats(sortButton, e);
        break;
      case "def":
        sortByStats(sortButton, e);
        break;
      case "spattack":
        sortByStats(sortButton, e);
        break;
      case "spdef":
        sortByStats(sortButton, e);
        break;
      case "speed":
        sortByStats(sortButton, e);
        break;
      default:
        console.log("Oops something went wrong with sorting");
    }
    simpleRefreshCollection();
  })
);
