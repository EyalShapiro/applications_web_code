import React from 'react'
let hp = 0
let attack = 0
let defense = 0
let speed = 0
let is_hide = true;


export function App(props) {
  return (
    <div>
      <div className="Search-Poke">
        <label id="label1" htmlFor="query">Search a Pokémon... </label><br />
        <input id="search" placeholder="Enter name or ID" onChange={props.poke} /><br />
      </div>
      <div id="Find-Poke" style={{ visibility: 'hidden' }}>
        <h1 id="number"></h1>
        <h1 id="name"></h1>
        <img src="" id="poke_pic" />
        <h3 id="type"></h3>
        <h3 id="abilities"></h3>
        <h3 id="hp">BASE HEALTH(hp):  {hp}</h3>
        <h3 id="attack">ATTACK: {attack}</h3>
        <h3 id="defense">DEFENSE:{defense}</h3>
        <h3 id="speed">SPEED:{speed}</h3>
      </div>
    </div>
  );
}


export async function GrabPoke() {
  const query = document.querySelector("#search").value;
  fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Please make sure the Pokémon name or ID is typed correctly.");
      }
    })
    .then((out) => {
      console.log(out);

      let number = out.id;
      let name = out.species.name.toUpperCase();
      let pic = out.sprites.front_default;
      let type = out.types
        .map((type) => type.type.name)
        .join(", ")
        .toUpperCase();
      let abilities = out.abilities
        .map((ability) => ability.ability.name)
        .join(", ")
        .toUpperCase();

      //Displays reverse statistic names all at once, but can't figure out how to display values with them...
      // let test = out.stats.map((stats) => stats.stat.name).reverse().join(': '
      //                                                                   + '<br>').toUpperCase();
      hp = out.stats[5].base_stat;
      attack = out.stats[4].base_stat;
      defense = out.stats[3].base_stat;
      speed = out.stats[0].base_stat;
      //   document.getElementById("hp").innerHTML = "BASE HEALTH(hp): " + hp;
      //   document.getElementById("attack").innerHTML = "ATTACK: " + attack;
      //   document.getElementById("defense").innerHTML = "DEFENSE: " + defense;
      //   document.getElementById("speed").innerHTML = "SPEED: " + speed;
      FindThePoke(number, pic, name, type, abilities);
    });
}

function FindThePoke(number, pic, name, type, abilities) {

  if (is_hide) {
    Hidden_Div();
    is_hide = false;
  }
  document.getElementById("number").innerHTML = "# " + number;
  document.getElementById("poke_pic").src = pic;
  document.getElementById("name").innerHTML = name;
  document.getElementById("type").innerHTML = "TYPE: " + type;
  document.getElementById("abilities").innerHTML = "ABILITIES: " + abilities;

}


function Hidden_Div() {
  const div_find = document.querySelector("#Find-Poke");
  const is_hidden = div_find.style.visibility === 'hidden' || div_find.style.visibility == 'hidden'
  if (is_hidden) {
    div_find.style.visibility = 'visible';

  } else {
    div_find.style.visibility = 'hidden';
  }
  return is_hidden
}