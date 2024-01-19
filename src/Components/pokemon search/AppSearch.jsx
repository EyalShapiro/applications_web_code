import React, { useState, useEffect } from "react";
import Card from "../card/Card.tsx";
import "./assets/AppSearch.css";
import ApiFetch from "../../Api/ApiFetch.ts";
import Reload from "../Reloads/Reload.tsx";

export default function SearchPokeApp() {
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
   * @return  No return.
   */
  function Loading_Page() {
    setTimeout(() => {
      SetLoading(true);
    }, 1000 * 0.5);
    SetLoading(false);
  }

  /**
   * A function that grabs a Pokemon based on the input value.
   * @param {Event} event - the event object
   * @return {Promise<void>} a promise that resolves to undefined
   */
  async function GrabPoke(event) {
    const input = event.target.value;
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
   * @param {string|number} input - The input used to fetch the Pokemon data.
   * @return  No return.
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
   * Sets the state of the component with a new pokemon.
   *
   * @param {object} new_pokemon - The new pokemon to set the state with.
   * @return  No return.
   */
  function SetUseState(new_pokemon) {
    SetPokemon(new_pokemon);
    SetError("");
    SetIsHidden(false);
  }
  /**
   * Generates a random integer between the minimum and maximum values.
   *
   * @param {number} min - The minimum value.
   * @param {number} max - The maximum value.
   * @return {string} The randomly generated integer as a string.
   */
  function GetRndInteger(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return `${num}`;
  }


  /**
   * Clears the Pokemon data and resets the search input.
   * @return  No return.
   */
  function ClearPokemon() {
    SetPokemon(poke_obj);
    SetIsHidden(true);
    SetInpSearch("");
    localStorage.removeItem("pokemon");
  }

  /**
   * Generates a random Pokemon by executing the necessary steps.
   * @return  No return.
   */
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
        <button id="btn"
          onClick={() => ComeBack(is_hidden)}>
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
