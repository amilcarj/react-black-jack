import React from 'react';
import '../styles/blackJack.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { playerScore, houseScore, playerName } = this.props;

    return (
      <div className='header-container'>
        <p>{playerName} Score: {playerScore}</p>
        <p>House Score: {houseScore}</p>
      </div>
    );
  }
}

export default Header;
