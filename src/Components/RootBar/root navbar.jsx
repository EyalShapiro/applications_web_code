import React from 'react';
import { NavLink } from 'react-router-dom';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import BungalowIcon from '@mui/icons-material/Bungalow';
import CatchingPokemonTwoToneIcon from '@mui/icons-material/CatchingPokemonTwoTone';
import './assets/root-navbar.css'

const ico_style={color: 'auto', fontSize: 24,position: 'relative' }

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className='navbar'>
        <ul>
          <li className="pag_bar">
            <NavLink to="/" activeClassName="activeLink"><BungalowIcon sx={ico_style} />→Home</NavLink>
          </li>
          <li className="pag_bar">
          <NavLink to="/Search" activeClassName="activeLink">
            <CatchingPokemonTwoToneIcon sx={ico_style} /> →Search Pokemon playground</NavLink>
          </li> 
            <li className="pag_bar">
            <NavLink to="/MyTeam" activeClassName="activeLink">
              <GroupsOutlinedIcon sx={ico_style} />→MyTeam</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}


