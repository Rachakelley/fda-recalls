import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="App-header">
      <img 
        src="https://open.fda.gov/img/gov-fda-new-white.svg" 
        alt="FDA Logo" 
        className="fda-logo"
      />
      <div className="hhs-container">
        <img 
          height="16px" 
          width="15px" 
          src="https://open.fda.gov/img/l_HHS_white.png" 
          alt="HHS Logo"
        />
        <div className="hhs-text">
          U.S. Department of Health and Human Services
          <strong>Food and Drug Administration</strong>
        </div>
      </div>
    </header>
  );
};

export default Header;