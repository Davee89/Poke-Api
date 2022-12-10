"use strict";

// ? VAriables
const main = document.querySelector("main");
const buttonAdd = document.querySelector(".add");
let accountBalance = 0;

const checkType = (type, card) => {
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

const fetchNewPokemon = (id, place, info) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const newPokemonCard = document.createElement("div");
      newPokemonCard.classList.add("pokemon__card", "animated", "red");
      checkType(data.types[0].type.name, newPokemonCard);
      newPokemonCard.setAttribute("data-tilt", "");
      newPokemonCard.innerHTML = `<div class= 'pokemon__image'>
      <img src="${data.sprites.other.dream_world.front_default}" /></div>
      <h2 class = 'pokemon__name'>${data.name.toUpperCase()}</h2>
      <p class = 'pokemon__type'>TYPE: ${data.types[0].type.name.toUpperCase()}</p>
      <div class = "pokemon__stats">
      <div class = 'hp'>HP: ${data.stats[0].base_stat}</div>
      <div class = 'attack'>Attack: ${data.stats[1].base_stat}</div>
      <div class = 'def'>Defense: ${data.stats[2].base_stat}</div>
      <div class = 'sp-attack'>Sp. Att: ${data.stats[3].base_stat}</div>
      <div class = 'sp-def'>Sp. Def: ${data.stats[4].base_stat}</div>
      <div class = 'speed'>Speed: ${data.stats[5].base_stat}</div>
      </div>
      </div>`;
      console.log(data);
      if (info) info.innerText = `Congratulations! You drew ${data.name.replace(data.name[0], data.name[0].toUpperCase())}`;

      place.appendChild(newPokemonCard);
      VanillaTilt.init(document.querySelectorAll(".pokemon__card")),
        {
          glare: true,
          scale: 1.2,
        };
    })
    .catch((error) => {
      console.log(error);
      console.error(error);
    });
};

buttonAdd.addEventListener("click", () => {
  const random = Math.floor(Math.random() * 149 + 1);
  fetchNewPokemon(random, main);
});
buttonAdd.addEventListener("pointerover", () => {
  buttonAdd.src = "logo2.png";
});
buttonAdd.addEventListener("pointerleave", () => {
  buttonAdd.src = "logo.png";
});

// ! Unboxing pokemon ! //
const basicBox = document.querySelector("#box-basic");
const advancedBox = document.querySelector("#box-advanced");
const legendaryBox = document.querySelector("#box-legendary");
const openingContainer = document.querySelector(".box-opening");
const messageInfo = document.querySelector(".info");
const collectionAdd = document.querySelector("#add-to-collection");
const sellPokemon = document.querySelector("#sell");

let collection = [];

const basicPokemons = [1, 4, 7, 10, 13, 16, 19, 21, 23, 25, 27, 29, 32, 35, 37, 39, 41, 43, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 74, 77, 79, 81, 83, 84, 86, 88, 90, 92, 96, 98, 100, 102, 104, 108, 109, 111, 114, 116, 118, 120, 129, 132, 133];

const advancedPokemons = [2, 5, 8, 11, 12, 14, 15, 18, 17, 20, 22, 24, 26, 28, 30, 33, 36, 38, 40, 42, 44, 47, 49, 51, 53, 55, 57, 59, 61, 64, 67, 70, 73, 75, 78, 80, 82, 85, 87, 89, 91, 93, 95, 97, 99, 101, 103, 105, 106, 107, 110, 112, 113, 115, 117, 119, 121, 122, 124, 127, 128, 131, 134, 135, 136, 137, 138, 140, 143, 147];

const legendaryPokemons = [3, 6, 9, 31, 34, 45, 65, 68, 71, 76, 94, 123, 125, 126, 130, 139, 141, 142, 144, 145, 146, 148, 149, 150];

const unBox = (boxName) => {
  const random = boxName.at(Math.random() * boxName.length);
  if (!openingContainer.querySelector(".pokemon__card")) fetchNewPokemon(random, openingContainer, messageInfo);
};

advancedBox.addEventListener("click", unBox.bind(null, [...basicPokemons, ...basicPokemons, ...advancedPokemons]));

legendaryBox.addEventListener("click", unBox.bind(null, [...basicPokemons, ...basicPokemons, ...basicPokemons, ...basicPokemons, ...advancedPokemons, ...advancedPokemons, ...legendaryPokemons]));

// ! Adding to collection pokemon
collectionAdd.addEventListener("click", (e) => {
  e.preventDefault();
  const pokemonCard = document.querySelector(".pokemon__card");
  const pokemonName = document.querySelector(".pokemon__card h2").innerText.toLowerCase();
  if (window.localStorage.getItem("userPokemonsCollection")) collection = JSON.parse(window.localStorage.getItem("userPokemonsCollection"));
  collection.push(pokemonName);
  window.localStorage.setItem("userPokemonsCollection", JSON.stringify(collection));
  pokemonCard.remove();
  messageInfo.innerText = "";
});

sellPokemon.addEventListener("click", (e) => {
  e.preventDefault();
  const pokemonCard = document.querySelector(".pokemon__card");
  if (pokemonCard) {
    if (window.localStorage.getItem("accountBalance")) accountBalance = JSON.parse(window.localStorage.getItem("accountBalance"));
    accountBalance += 10;
    pokemonCard.remove();
    window.localStorage.setItem("accountBalance", accountBalance);
    messageInfo.innerText = "";
  }
});
