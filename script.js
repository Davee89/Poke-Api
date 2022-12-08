"use strict";

const fetchNewPokemon = (id) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const newPokemonCard = document.createElement("div");
      newPokemonCard.classList.add("pokemon__card", "animated");
      newPokemonCard.setAttribute("data-tilt", "");
      newPokemonCard.innerHTML = `<div class= 'pokemon__image'>
      <img src="${data.sprites.other.dream_world.front_default}" /></div>
      <h2 class = 'pokemon__name'>${data.name.toUpperCase()}</h2>
      <p class = 'pokemon__type'>TYPE: ${data.types[0].type.name.toUpperCase()}</p>
      <div class = "pokemon__stats">
      <div class = 'hp'>HP: ${data.stats[0].base_stat}</div>
      <div class = 'attack'>Attack: ${data.stats[1].base_stat}</div>
      <div class = 'def'>Defense: ${data.stats[2].base_stat}</div>
      </div>
      </div>`;
      console.log(data);
      main.appendChild(newPokemonCard);
      VanillaTilt.init(document.querySelectorAll(".pokemon__card")),
        {
          glare: true,
          scale: 1.2,
        };
    })
    .catch((error) => {
      console.error(error);
    });
};
const main = document.querySelector("main");
const buttonAdd = document.querySelector(".add");
buttonAdd.addEventListener("click", () => {
  const random = Math.floor(Math.random() * 149 + 1);
  fetchNewPokemon(random);
});
