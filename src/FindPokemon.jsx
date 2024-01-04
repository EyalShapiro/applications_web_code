/* eslint-disable react/prop-types */
import React from 'react';
import{ GetColorType,TypeColor, err_style,img_style,data_style } from './style-PokemonApp.jsx';
export function FindPokemon(props) {
  function PokeData(props) {
    const SewDataStyle ={ ...data_style, background: props.color } ;
    return (<li style={SewDataStyle} id={props.id}>{props.text}{props.set}</li>);
  }
  return (
    <div>
      <h1 id="name" >{props.pokemon.name} - #{props.pokemon.number}</h1>
      <img style={img_style} src={props.pokemon.pic} id='PokeImg' alt="Pokemon" />
      <p style={err_style} id='err-or-search'>{props.error}</p>
      <PokeData id="abilities" text="ABILITIES:" color='#A34FB8' set={props.pokemon.abilities}></PokeData>
      <PokeData id="type" text='TYPE:' color={TypeColor(props.pokemon.type)} set={props.pokemon.type}></PokeData>
      {/* <p><GetColorType type={s.pokemon.abilities}></GetColorType></p> */}
      <PokeData id="hp" text='BASE HEALTH(HP): ' color='#c26c21' set={props.pokemon.hp}></PokeData>
      <PokeData id="speed" text="SPEED:"  color='#94861b' set={props.pokemon.speed}></PokeData>
      <PokeData id="attack" text='ATTACK:'  color='#800f2b' set={props.pokemon.attack}></PokeData>
      <PokeData id="defense" text="DEFENSE: " color='#21c25f'  set={props.pokemon.defense}></PokeData>
    </div>
  );


}
