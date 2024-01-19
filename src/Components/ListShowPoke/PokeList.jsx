import React, { useState, useEffect } from "react";

import { fetchPokemonList } from "../../Api/list_DATA.ts";
import "./assets/PokemonList.css";
import { ShowPokeSelect } from './ShowPokeSelect';
import GetGen from "../../Api/data/Gen.json";

function PokemonList() {
   const [pokemonData, setPokemonData] = useState([]);
   const [page, setPage] = useState(1);
   const [selectedPokemon, setSelectedPokemon] = useState(null);
   const [selectedGen, setSelectedGen] = useState("all");
   const [start, SetStart] = useState(1);
   const [limit, SetLimit] = useState(10);
   const [loading, SetLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         const data = await fetchPokemonList(limit, page, start);
         setPokemonData(data);
      };
      fetchData();
   }, [page, limit, selectedGen, start]);

   const handleNextPage = () => {
      SetStart(start + limit);
   };

   const handlePrevPage = () => {
      SetStart(Math.max(start - limit, 1));
   };

   const handleCardClick = (pokemon) => {
      setSelectedPokemon(pokemon);
   };

   const handleGenChange = (event) => {
      const selectedGeneration = event.target.value;
      const selectedGenData = GetGen.find((generation) => generation.nome === selectedGeneration);
      const newStart = selectedGenData ? selectedGenData.start : 1;
      setSelectedGen(selectedGeneration);
      SetStart(newStart);
   };

   const handleLimitChange = (event) => {
      let newLimit = parseInt(event.target.value, 10);
      newLimit = isNaN(newLimit) ? 1 : Math.min(Math.max(newLimit, 1), 100);
      SetLimit(newLimit);
   };

   return (
      <div className="app-home">
         <p id='total'>Total Pokemon found: {pokemonData.length}</p>
         <p id='total'> gen {selectedGen}</p>
         <div className='pagination'>
            <div className="gen-filter">
               <select value={selectedGen} onChange={handleGenChange}>
                  <option value="all">All</option>
                  {GetGen.map((gen) => (
                     <option key={gen.nome} value={gen.nome}>
                        {gen.nome}
                     </option>
                  ))}
               </select>
               <length value='number poke show'></length>
               <input type='number' style={{ width: '50px' }} value={limit} onInput={handleLimitChange} />
            </div>
            <button onClick={handlePrevPage} id='prev'>Previous</button>
            <button onClick={handleNextPage} id='prev'>Next</button>
         </div>
         
         <div className="pokemon-list">
            {pokemonData.map((pokemon) => (
               <ShowPokeSelect handleCardClick={handleCardClick} pokemon={pokemon} />
            ))}
         </div>
      </div>
   );
}

export default PokemonList;
