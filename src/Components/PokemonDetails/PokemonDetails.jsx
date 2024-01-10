import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Card from '../card/Card.tsx'
import ApiFetch from "../../Api/ApiFetch.jsx";
import './PokemonDetails.css'

async function NewData(input) {
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
   return new_pokemon;
}

function PokemonDetails() {
   const { id } = useParams();

   const [pokemonData, setPokemonData] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         const data = await NewData(id);
         setPokemonData(data);
      };

      fetchData();
   }, [id]);

   const StyleLink = {
      color: '#4DABF7', fontSize: '120%',
      border: 'solid #4DABF7 ', background: '#98fb9855'
   };
   return (
      <div className='PokemonDetails'>
         <Link style={StyleLink} to="/">Back to Pokemon List</Link>
          <div id='card'>
         {pokemonData &&<Card pokemon={pokemonData} />}
      </div></div>
   );
}

export default PokemonDetails;
