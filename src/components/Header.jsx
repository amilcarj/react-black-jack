import React from 'react';
import '../styles/blackJack.scss';

const Header = (props) => { 
  const { playerScore, houseScore, playerName } = props;

  return (
    <div className='header-container'>
      <p>{playerName} Score: {playerScore}</p>
      <p>House Score: {houseScore}</p>
    </div>
  );
};

export default Header;
