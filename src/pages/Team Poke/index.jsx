import React from "react";
import './assets/style.css'
import Svg from './assets/PokéBall.svg'
import SearchPokeApp from "../../pokemon search/AppSearch";
const ImageGrid = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px'
      }}>

        {[...Array(6)].map((_, index) => (
          <img key={index} src={Svg} alt={`Image ${index + 1}`} Link={SearchPokeApp } />
        ))}
      </div>
    </div >
  );
};
export default function MyTeam() {
  return (
    <div className="app">
      <h1>Image Grid</h1>
      <ImageGrid />
    </div>
  );
};
