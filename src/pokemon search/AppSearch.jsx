//AppSearch.jsx
import React, { useState, useEffect } from "react";
import Card from "../Components/card/Card.tsx";
import "./assets/AppSearch.css";
import ApiFetch from "../Api/ApiFetch.jsx";
import Reload from "../Components/Reloads/Reload.tsx";

export default function SearchPokeApp(props) {
  //---------------------------
  const poke_obj = {
    number: "", name: "", img: "", gif: "", type: "",
    powers: 0, attack: 0, hp: 0, defense: 0, speed: 0,
  };
  const [pokemon, SetPokemon] = useState(poke_obj);
  const [is_hidden, SetIsHidden] = useState(true);
  const [error, SetError] = useState("");
  const [searchInp, SetInpSearch] = useState('');
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    const StoredPokemon = JSON.parse(localStorage.getItem("pokemon"));
    if (StoredPokemon) {
      SetPokemon(StoredPokemon);
      SetIsHidden(false);
    }
  }, []);
  //---------------------------

  /**
   * A function that sets the loading state to true after a delay of 0.5 seconds and then sets it to false.
   * @return {undefined} No return value.
   */
  function Loading_Page() {
    setTimeout(() => {
      SetLoading(true);
    }, 1000 * 0.5); //חצי שנייה דילי
    SetLoading(false);
  }
  /**
   * Asynchronously grabs a Poke.
   *
   * @param {type} e - the event object
     * @return {type} - None.
   */
  async function GrabPoke(e) {
    const input = e.target.value;
    if (input.trim() !== "") {
      SetInpSearch(input);
    } else {
      SetInpSearch("");
    }
    Loading_Page();
    await ChoosePokemon(input);
  }
  /**
   * Asynchronously chooses a Pokemon based on the input provided.
   *
   * @param {type} input - The input used to fetch the Pokemon data.
   * @return {type} - None.
   */
  async function ChoosePokemon(input) {
    try {
      const data = await ApiFetch(input);
      const { id, species, sprites, types, abilities, stats } = data;
      const number = data.id;
      const name = species.name.toUpperCase();
      const gif =
        sprites.versions["generation-v"]["black-white"].animated.front_default;
      const img = sprites.front_default;
      const type = types
        .map((type) => type.type.name)
        .join(",")
        .toUpperCase()
        .split(",");
      const powers = data.abilities.map((ability) => ability.ability.name)
        .join(", ")
        .toUpperCase();
      const hp = stats[5].base_stat;
      const attack = stats[4].base_stat;
      const defense = stats[3].base_stat;
      const speed = stats[0].base_stat;
      const new_pokemon = {
        number, name, img,
        gif, type, powers, hp,
        attack, defense, speed,
      };
      SetUseState(new_pokemon);
      localStorage.setItem("pokemon", JSON.stringify(new_pokemon));
    } catch (error) {
      console.log('err');
      SetError(error.message);
      if (input.trim() === "") {
        ClearPokemon();
        SetInpSearch("");
        ComeBack(false);
      }
    }
  }

  /**
   * Sets the state of the component with the new Pokemon value, and updates the hidden state and error state.
   *
   * @param {type} new_pokemon - The new Pokemon value.
   * @return {type} No return value.
   */
  function SetUseState(new_pokemon) {
    SetPokemon(new_pokemon);
    SetIsHidden(false);
    SetError("");
  }
  function GetRndInteger(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return `${num}`;
  }
  /**
   * Clears the Pokemon data and hides the Pokemon details.
   * @return {undefined} No return value.
   */

  /**
   * Clears the Pokemon data, sets the Pokemon object, hides the Pokemon, clears the search input,
   * and removes the Pokemon data from local storage.
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  function ClearPokemon() {
    SetPokemon(poke_obj);
    SetIsHidden(true);
    SetInpSearch("");
    localStorage.removeItem("pokemon");
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
    Loading_Page();
    ChoosePokemon(GetRndInteger(1, 1025));
  }
  return (
    <div className="PokemonApp content-img">
      <div className="Search-Poke">
        <input
          value={searchInp}
          id="search"
          placeholder="Enter name or ID"
          onInput={GrabPoke} />
          <button
            id="btn"
            onClick={() => { return }}>
            I choose you</button>
        <button id="btn" onClick={ClearPokemon}>
          Clear Pokemon
        </button>
        <button id="btn" onClick={RandomPokemon}>
          Random pokemon
        </button>
      </div>
      <div className="poke-info" style={{ visibility: is_hidden ? "collapse" : "visible" }}>
        {loading ? (
          <li >
            <Card pokemon={pokemon} err={error}></Card>
          </li>
        ) : (
          <Reload></Reload>
        )}
      </div>
    </div>
  );
}
