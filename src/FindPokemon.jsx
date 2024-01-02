/* eslint-disable react/prop-types */
import React from 'react';

export  function FindPokemon(props) {
  return (<div>
    <h1 id="name" className=''>{props.pokemon.name} - #{props.pokemon.number}</h1>
    <img src={props.pokemon.pic} id='PokeImg' alt="Pokemon" />
    <h3 id="type">TYPE: {props.pokemon.type}</h3>
    <h3 id="abilities">ABILITIES: {props.pokemon.abilities}</h3>
    <h3 id="hp">BASE HEALTH(hp): {props.pokemon.hp}</h3>
    <h3 id="attack">ATTACK: {props.pokemon.attack}</h3>
    <h3 id="defense">DEFENSE: {props.pokemon.defense}</h3>
    <h3 id="speed">SPEED: {props.pokemon.speed}</h3>
  </div>);
}
