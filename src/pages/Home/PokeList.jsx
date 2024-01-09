// PokeList.jsx

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { fetchPokemonList } from "../../Api/list_DATA.jsx";
import "./assets/PokemonList.css";
import PokemonBallImg from "../../Components/pokeImg/pokeImg.tsx";
import PokemonDetails from "../../Components/PokemonDetails/PokemonDetails.jsx";

function PokemonList() {
   const [pokemonData, setPokemonData] = useState([]);
   const [page, setPage] = useState(1);
   const [selectedPokemon, setSelectedPokemon] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         const data = await fetchPokemonList(2, page);
         setPokemonData(data);
      };

      fetchData();
   }, [page]);

   const handleNextPage = () => {
      setPage((prevPage) => prevPage + 1);
   };

   const handlePrevPage = () => {
      setPage((prevPage) => Math.max(prevPage - 1, 1));
   };

   const handleCardClick = (pokemon) => {
      setSelectedPokemon(pokemon);
   };

   const handleCloseDetails = () => {
      setSelectedPokemon(null);
   };


   return (
      <div className="app-home">
         <p id='total'>Total Pokemon found: {pokemonData.length}</p>
         <div className='pagination'>
            <button onClick={handlePrevPage} id='prev'>Previous</button>
            <button onClick={handleNextPage} id='prev'>Next</button>
         </div>
         <div className="pokemon-list">
            {pokemonData.map((pokemon) => (
               // הוסף קישור שמצביע לדף PokemonDetails עם id מתאים
               <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
                  <div className='pokemon-container'>
                     <PokemonBallImg Gif={pokemon.image} Img={pokemon.image} alt={`pokemon:\n ${pokemon.name}`} />
                     <p className="pokemon-name">
                        {pokemon.name} (ID: {pokemon.id})
                     </p>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   );
}
export default PokemonList;
