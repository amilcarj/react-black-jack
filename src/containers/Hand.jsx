import React from 'react';

import Card from '../components/Card';
import '../styles/blackJack.scss';

class Hand extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderCards = () => {
    const { hand } = this.props;

    return hand.map((card, idx) => {
      return (
        <Card key={`card-${idx}`} card={card} />
      );
    })
  };

  render() {
    const cards = this._renderCards();
    
    return (
      <div className='hand-container'>
        {cards}
      </div>
    );
  }
}

export default Hand;
