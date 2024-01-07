import React, { Component } from "react";
import ReactDOM from 'react-dom/client'
import SearchPokeApp from './pokemon search/AppSearch.jsx'
import './style/main.css'
import PokemonList from "./pokeList.jsx";

// import Pokemonboll_Title from'./style/Pokemonboll_Title.tsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div id='main'>
      {/* <Pokemonboll_Title></Pokemonboll_Title> */}
      <h1 className='header'>  Pokémon Info Search</h1>
      <SearchPokeApp></SearchPokeApp>
      {/* <PokemonList></PokemonList> */}
    </div>
  </React.StrictMode>,
)
