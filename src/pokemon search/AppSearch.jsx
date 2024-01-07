import React, { useState, useEffect } from 'react';
import {FindPokemon}  from './Components/FindPokemon.jsx';
import Reload from '../reload/Reload.tsx';//שתי נקודות יצא מתיקה
import './assets/AppSearch.css'
import ApiFetch from '../utils/ApiFetch.tsx';
export default function SearchPokeApp() {
  //---------------------------
  const poke_obj=    {
    number: '', name: '', img: '',gif:'',
    type: '', abilities: '', hp: 0,
    attack: 0, defense: 0, speed: 0,
  }
  const [pokemon, SetPokemon] = useState(
    poke_obj
  );
  const [is_hidden, SetIsHidden] = useState(true);
  const [error, SetError] = useState('');
  const [searchInp, SetInpSearch] = useState('');
  const [loading, SetLoading] = useState(true);
  useEffect(() => {
    const StoredPokemon = JSON.parse(localStorage.getItem('pokemon'));
    if (StoredPokemon) {
      SetPokemon(StoredPokemon);
      SetIsHidden(false);
    }
  }, []);
  //---------------------------
  
  function Loading_Page() {
    setTimeout(() => {
      SetLoading(true);
    }, 1000 * 0.5); //חצי שנייה דילי
    SetLoading(false);
  }
  async function GrabPoke(e) {
    const input = e.target.value;
    if (input.trim() !== '') {
      SetInpSearch(input);
    }
    else {
      SetInpSearch('')
    }
    Loading_Page();
    await ChoosePokemon(input);
  }
  async function ChoosePokemon(input) {
    try {
    
       const data = await ApiFetch(input);
      const { id,species, sprites, types, abilities, stats } = data;
      const number = data.id;
      const name = species.name.toUpperCase();
      const gif = sprites.versions['generation-v']['black-white'].animated.front_default;
      const img =sprites.front_default;

      const type = types.map((type) => type.type.name).join(",").toUpperCase().split(',');
      const pokeAbilities = abilities.map((ability) => ability.ability.name).join(", ").toUpperCase();
      const hp = stats[5].base_stat;
      const attack = stats[4].base_stat;
      const defense = stats[3].base_stat;
      const speed = stats[0].base_stat;
      const new_pokemon = {
        number, name, img,gif,
        type, abilities: pokeAbilities, hp,
        attack, defense, speed,
      };
      SetUseState(new_pokemon);
      localStorage.setItem('pokemon', JSON.stringify(new_pokemon));
    } catch (error) {
        SetError(error.message);
      if (input.trim() === '') {
        ClearPokemon();
        SetInpSearch('');
        ComeBack(false);
      }
    }
  }
   
  function SetUseState(new_pokemon) {
    SetPokemon(new_pokemon);
    SetIsHidden(false);
    SetError('');
  }

  function GetRndInteger(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return `${num}`
  }
  /**
   * Clears the Pokemon data and hides the Pokemon details.
   * @return {undefined} No return value.
   */
  
  function ClearPokemon() {
    SetPokemon(poke_obj);
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
  function RandomPokemon() {
    Loading_Page()
    ChoosePokemon(GetRndInteger(1, 1025))
  }
  return (
    <div className='PokemonApp'>
      <div className="Search-Poke">
        <input value={searchInp} id="search" placeholder="Enter name or ID" onInput={GrabPoke} />
        <button id='choose-poke' onClick={()=>{console.log("צריך לעוסים לאן זה מוביל")}}>I choose you</button>
        <button onClick={ClearPokemon}>Clear Pokemon</button>
        <button id='btn-radom' onClick={RandomPokemon} >Random pokemon</button>
      </div>
      <li className="Poke-info"  style={{visibility: is_hidden ? 'hidden' : 'visible'}}>{loading ? (
        <FindPokemon pokemon={pokemon} err={error} ></FindPokemon>
        ) : (<Reload></Reload>
      )}    </li>
      </div>
  );
}
