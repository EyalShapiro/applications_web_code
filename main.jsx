import React from 'react'
import ReactDOM from 'react-dom/client'
import PokemonApp from './src/PokemonApp.jsx'
import './src/style/style.css'
import Reload from './src/reload/Reload.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Reload></Reload> */}
    {/* להוסיף שרק זה יעוד בדק כל פעם שאני מחפש פוקימון  */}
    <h1 id="main" className='text-sky-400'>Pokémon Info Search</h1>
    <PokemonApp />
  </React.StrictMode>,
)
