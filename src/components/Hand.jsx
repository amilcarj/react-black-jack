import React from 'react';

import Card from './Card';
import '../styles/blackJack.scss';

const Hand = (props) => {
  const renderCards = () => {
    const { hand } = props;

    return hand.map((card, idx) => {
      return (
        <Card key={`card-${idx}`} card={card} />
      );
    })
  };

  const cards = renderCards();
  
  return (
    <div className='hand-container'>
      <div className='bold hand-label'>{props.label}'s Hand</div>
      <div className='hand'>
        {cards}
      </div>
    </div>
  );
}

export default Hand;
