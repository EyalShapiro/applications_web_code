import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, GrabPoke } from './App.jsx'
import './style/style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Head_App></Head_App>
    <h1 id="main">Pokémon Info Search</h1>

    <App poke={GrabPoke} />
  </React.StrictMode>,
)
function Head_App() {
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="./src/style/image/poke.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>pokemon api</title>
  </head>

}