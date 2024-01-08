import React, { useState, useEffect } from 'react';

function PokemonList() {
  const [pokemonNames, setPokemonNames] = useState([]);
  async function fetchPokemonData() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=200');
    const data = await response.json();
    const pokemonNames = data.results.map(pokemon => pokemon.name);
    return pokemonNames;
  }
  useEffect(() => {
    fetchPokemonData().then(data => setPokemonNames(data));
  }, []);

  return (
    <div>
      {pokemonNames.map((name, index) => (
        <p key={index}>{name}</p>
      ))}
    </div>
  );
}

export default PokemonList;