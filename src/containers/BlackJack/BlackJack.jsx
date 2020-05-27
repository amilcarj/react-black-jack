import React from 'react';

import Header from '../../components/Header/Header';
import Action from '../../components/Action/Action';
import DealerHand from '../Hand/DealerHand';
import PlayerHand from '../Hand/PlayerHand';

import './blackJack.scss';

class BlackJack extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    //TODO: welcome player to get their username
    return (
      <div className="container">
        <Header />
        <DealerHand />
        <PlayerHand />
        <Action />
      </div>
    );
  }
}

export default BlackJack;
