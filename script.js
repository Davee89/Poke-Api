"use strict";

const fetchNewPokemon = (id) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const newPokemonCard = document.createElement("div");
      newPokemonCard.classList.add("pokemon__card");
      newPokemonCard.innerHTML = `<h2>${data.name.toUpperCase()}</h2>
      <img src="${data.sprites.front_shiny}" />
      <p></p>
      <p></p>`;
      console.log(data);
      main.appendChild(newPokemonCard);
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