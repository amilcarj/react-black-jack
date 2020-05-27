import React from 'react';
import '../styles/blackJack.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { playerScore, houseScore } = this.props;

    return (
      <div className='header-container'>
        <p>Player Score: {playerScore}</p>
        <p>House Score: {houseScore}</p>
      </div>
    );
  }
}

export default Header;
