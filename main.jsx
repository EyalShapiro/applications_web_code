import React from 'react'
import ReactDOM from 'react-dom/client'
import PokemonApp from './src/PokemonApp.jsx'
import Reload from './src/reload/Reload.jsx'
import './src/style/style.css'
import './src/style/poke_info.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <h1 id="main" >Pokémon Info Search</h1>
   <PokemonApp></PokemonApp>
  </React.StrictMode>,
)
