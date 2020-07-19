import React from 'react';
import '../styles/blackJack.scss';

const Card = (props) => {
  const { card } = props;
  const imgURL = card.images.png; //TODO: use svg if available

  return (
    <img className='card' src={imgURL} alt={`Card ${card.name} of ${card.suit}`} />
  );
};

export default Card;
