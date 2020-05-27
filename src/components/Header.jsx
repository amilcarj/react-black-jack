import React from 'react';
import '../styles/blackJack.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { playerScore, houseScore, playerName } = this.props;
    const user = playerName || 'Player';

    return (
      <div className='header-container'>
        <p>{user} Score: {playerScore}</p>
        <p>House Score: {houseScore}</p>
      </div>
    );
  }
}

export default Header;
