
import React, { useRouteMatch } from "react";
import { useLocation } from 'react-router-dom';

export default function TextBuild() {
  const path = useLocation();

  function EventAlert() {
    //?!window.location.pathname=path.pathname
    if (path.pathname === '/MyTeam') {
      return  window.alert("This page is a future build and go to other pages")
    }
    else {
      console.log("This page is a future build and go to other pages");
    }
  }
  
  const pageStyle = { fontSize: "400%", color: 'red', fontFamily: 'Pokemon Solid', fontStyle: 'italic', textShadow: '2px 2px 0 #4074b5', outline: 'solid gold 20px', border: 'dotted orange 10px', backgroundColor: '#f0e68c9f', borderRadius: '10%', padding: '10px', width: '100%' };
  return (<>
    <h1 style={pageStyle}>This page is a future build</h1>
    {setInterval(EventAlert(), 1000 * 10.5)} 
  </>)

}

