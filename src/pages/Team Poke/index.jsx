//Team.jsx
import React from "react";
import './assets/style.css'
import CatchingPokemonTwoToneIcon from '@mui/icons-material/CatchingPokemonTwoTone';
const ImageGrid = () => {

  const IconStyle = {
     fontSize: 100, color:'red', backgroundColor: '#90ee9073',borderRadius:'10%'  
  }
  return (
    <div className="team">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px'
      }}>

        {[...Array(6)].map((_, index) => (

          <CatchingPokemonTwoToneIcon sx={IconStyle} />))}
      </div>
      <h1 style={{ fontSize: "400%", color: 'red', fontFamily: 'Pokemon Solid', fontStyle: 'italic', textShadow: '2px 2px 0 #4074b5', outline: 'solid gold 20px', border: 'dotted orange 10px', backgroundColor: '#f0e68c9f', borderRadius: '10%', padding: '10px', width: '100%' }}>This page is a future build</h1>
      {  setTimeout(() => window.alert("This page is a future build and go to other pages"), 1000 * 12.5)}
    </div >
  );
};
export default function MyTeam() {
  return (
    <div className="app">
      <ImageGrid />
    </div>
  );
};
