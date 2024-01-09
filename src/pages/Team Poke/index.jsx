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
