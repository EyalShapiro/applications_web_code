import { Link } from 'react-router-dom';
import React from "react";
import PokemonBallImg from "../pokeImg/pokeImg.tsx";


export function ShowPokeSelect({handleCardClick,pokemon}) {
   return <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
      <div className='pokemon-container' onClick={() => handleCardClick(pokemon)}>
         <PokemonBallImg Gif={pokemon.image} Img={pokemon.image} alt={`pokemon:\n ${pokemon.name}`} />
         <p className="pokemon-name">
            {pokemon.name} (ID: {pokemon.id})
         </p>
      </div>
   </Link>;
}
