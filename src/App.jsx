import React from "react";
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { NavBar } from "./Components/RootBar/root navbar.jsx";
import Home from "./pages/Home/index.jsx";
import SearchPokeApp from "./Components/pokemon search/AppSearch.jsx";
import MyTeam from "./pages/Team Poke/Team.jsx";
import NotFoundPage from "./pages/NotFoundPage/index.jsx";
import barIco from '../assets/img/start.png';
import PokemonDetails from "./Components/PokemonDetails/PokemonDetails.jsx";


function App() {
  return (
    <div id='main-header' >
      <h1 className='header'> Pokémon</h1>
      <img sx={{ p: 0, m: 0 }} src={barIco} width='3%' alt="logo" />
      <Box>
        <Router>
          <div>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Search" element={<SearchPokeApp />} />
              <Route path="/pokemon/:id" element={<PokemonDetails />} />
              <Route path="/MyTeam" element={<MyTeam />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
      </Box>
    </div>

  );
}

export default App;