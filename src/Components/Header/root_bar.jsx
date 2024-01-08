import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SearchPokeApp from '../../pokemon search/AppSearch';
import Home from '../../pages/Home';
import MyTeam from '../../pages/Team Poke/index.jsx';



function RootBar() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Search">Search Pokemon playground</Link>
            </li>
            {/* <li>
              <Link to="/MyTeam">MyTeam</Link>
            </li> */}
          </ul>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/Search" component={SearchPokeApp} />
        {/* <Route path="/MyTeam" component={MyTeam} /> */}
      </div>
    </Router>
  );
}

// PropTypes
RootBar.propTypes = {
  // Add any necessary prop types here
};

export default RootBar;
