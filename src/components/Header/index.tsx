import React from 'react';
import './styles.css';

function Header() {
    return (
        <div id='header-container'>
          <div className="box">
            <h1><a href='/'>Weather Search</a></h1>
          </div>
        </div>
    )
}

export default Header;