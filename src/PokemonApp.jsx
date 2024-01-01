import React, { useState } from 'react';
import './style/btn.css'
export default function PokemonApp() {
  //גלובלי
  const [pokemon, SetNewPokemon] = useState({
    number: '', name: '', pic: '',
    type: '', abilities: '', hp: 0,
    attack: 0, defense: 0, speed: 0,
  });

  const [is_hidden, SetIsHidden] = useState(true);
  const [error, SetError] = useState('');
  async function GrabPoke() {
    const searchInput = document.querySelector("#search");
    const query = searchInput.value;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      if (!response.ok) {
        throw new Error("Please make sure the Pokémon name or ID is typed correctly.");
      }

      const data = await response.json();
      const { id, species, sprites, types, abilities, stats } = data;
      const number = id;
      const name = species.name.toUpperCase();
      const pic = sprites.front_default;
      const type = types.map((type) => type.type.name).join(", ").toUpperCase();
      const pokeAbilities = abilities.map((ability) => ability.ability.name).join(", ").toUpperCase();
      const hp = stats[5].base_stat;
      const attack = stats[4].base_stat;
      const defense = stats[3].base_stat;
      const speed = stats[0].base_stat;

      SetNewPokemon({
        number, name, pic, type, abilities: pokeAbilities,
        hp, attack, defense, speed,
      });

      FindThePoke();
      SetError('');
      searchInput.style.border = ''; // Reset border style
    } catch (error) {
      SetError(error.message);
      searchInput.style.border = 'px solid orangered'; // Highlight the search input with a orangered border
    }
  }
  function ClearPokemon() {
    SetNewPokemon({
      number: '',
      name: '',
      pic: '',
      type: '',
      abilities: '',
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
    });
    SetIsHidden(true);
    SetError('');
    const searchInput = document.querySelector("#search");
    searchInput.value = '';
    searchInput.style.border = ''; // Reset border style
  }

  function FindThePoke() {
    if (is_hidden) {
      SetIsHidden(!is_hidden);
    }
  }

  return (
    <div>
      <div className="Search-Poke">
     
        <br />
        <input id="search" placeholder="Enter name or ID" onChange={GrabPoke} />
        <button onClick={ClearPokemon}>Clear Pokemon</button>

        <button id='btn-radom' >Random pokemon</button>
        <br />
        <p id='err-or-search'>{error || " Search a Pokémon..."}</p>
      </div>
      <div id="Find-Poke" style={{ visibility: is_hidden ? 'hidden' : 'visible' }}>
        <h1 id="number">#{pokemon.number}</h1>
        <h1 id="name">{pokemon.name}</h1>
        <img src={pokemon.pic} alt="Pokemon" />
        <h3 id="type">TYPE: {pokemon.type}</h3>
        <h3 id="abilities">ABILITIES: {pokemon.abilities}</h3>
        <h3 id="hp">BASE HEALTH(hp): {pokemon.hp}</h3>
        <h3 id="attack">ATTACK: {pokemon.attack}</h3>
        <h3 id="defense">DEFENSE: {pokemon.defense}</h3>
        <h3 id="speed">SPEED: {pokemon.speed}</h3>
      </div>
    </div>
  );
}
const style_err={
  
}