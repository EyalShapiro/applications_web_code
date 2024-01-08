import React, { Component } from "react";
import SearchPokeApp from '../../pokemon search/AppSearch.jsx';
// import Pokemonboll_Title from'./style/Pokemonboll_Title.tsx'
export default function Home({ }) {
  return (<>  <React.StrictMode>
    <div id='main'>
      <SearchPokeApp></SearchPokeApp>
    </div>
  </React.StrictMode></>);

}