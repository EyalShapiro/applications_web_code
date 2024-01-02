import React, { useState, useEffect } from 'react';
import './style/btn.css';
import { FindPokemon } from './FindPokemon';


export default function PokemonApp() {
  const [pokemon, SetPokemon] = useState({
    number: '', name: '', pic: '',
    type: '', abilities: '', hp: 0,
    attack: 0, defense: 0, speed: 0,
  });

  const [is_hidden, SetIsHidden] = useState(true);
  const [error, SetError] = useState('');
  const [searchInp, SetInpSearch] = useState('');


  useEffect(() => {
    const storedPokemon = JSON.parse(localStorage.getItem('pokemon'));
    if (storedPokemon) {
      SetPokemon(storedPokemon);
      SetIsHidden(false);
    }
  }, []);

  async function GrabPoke(e) {
      const input = e.target.value;
      if (input.trim() !== '') {
        SetInpSearch(input);
      }
      else{
        SetInpSearch('')
      }

    await ChoosePokemon(input);
  }
  async function ChoosePokemon(input) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`);
      if (!response.ok) {
        throw new Error("Please make sure the Pokémon name or ID is typed correctly.");
      }
      const data = await response.json();
      const { id, species, sprites, types, abilities, stats } = data;
      const number = id; SetInpSearch;
      const name = species.name.toUpperCase();
      const pic = sprites.front_default;
      const type = types.map((type) => type.type.name).join(", ").toUpperCase();
      const pokeAbilities = abilities.map((ability) => ability.ability.name).join(", ").toUpperCase();
      const hp = stats[5].base_stat;
      const attack = stats[4].base_stat;
      const defense = stats[3].base_stat;
      const speed = stats[0].base_stat;

      const newPokemon = {
        number, name, pic,
        type, abilities: pokeAbilities, hp,
        attack, defense, speed,
      };

      SetPokemon(newPokemon);
      SetIsHidden(false);
      SetError('');
      document.querySelector('#search').style.border = ''; // Reset border style
      document.querySelector('#err-or-search').style.outline = '2px solid forestgreen';
      // Save to local storage
      localStorage.setItem('pokemon', JSON.stringify(newPokemon));
    } catch (error) {
      SetError(error.message);

      if (input.trim() === '') {
        ClearPokemon();
        SetInpSearch('');
        ComeBack(false);
      }

      document.querySelector('#err-or-search').style.outline = '2px solid #ad2323';
      document.querySelector('#search').style.border = '2px solid orangered';
    }
  }

  function GetRndInteger(min, max) {
    const num=Math.floor(Math.random() * (max - min + 1) ) + min;
    return `${num}`
  }
/**
 * Clears the Pokemon data and hides the Pokemon details.
 * @return {undefined} No return value.
 */

  function ClearPokemon() {
    SetPokemon({
      number: '', name: '', pic: '',
      type: '', abilities: '', hp: 0,
      attack: 0, defense: 0, speed: 0,
    });
    SetIsHidden(true);
    SetInpSearch('');
    localStorage.removeItem('pokemon');
  }

  /**
   * Toggles the value of the is_hidden parameter and returns its new value.
   * @param {boolean} is_hidden - The current value of the is_hidden parameter.
   * @return {boolean} The new value of the is_hidden parameter.
   */
  function ComeBack(is_hidden) {
    SetIsHidden(!is_hidden);
    return is_hidden;
  }

  return (
    <div>
      <div className="Search-Poke">
        <br />
        <input value={searchInp}id="search" placeholder="Enter name or ID" onChange={GrabPoke} />
        <button onClick={ClearPokemon}>Clear Pokemon</button>
        <button id='btn-radom' onClick={()=>ChoosePokemon(GetRndInteger(1,1025))} >Random pokemon</button>
        <br />
        <p id='err-or-search'>{error || " Search a Pokémon..."}</p>
      </div>
     <FindPokemon pokemon={pokemon} is_hidden={is_hidden}></FindPokemon>
    </div>
  );
}
