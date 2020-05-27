import React from 'react';
import '../styles/blackJack.scss';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { card } = this.props;
    const imgURL = card.images.png; //TODO: use svg if available

    return (
      <img className='card' src={imgURL} alt={`Card ${card.name} of ${card.suit}`} />
    );
  }
}

export default Card;
