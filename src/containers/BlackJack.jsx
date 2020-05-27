import React from 'react';

import Header from '../components/Header';
import Action from '../components/Action';
import Hand from './Hand';
import BlackJackApi from '../api/BlackJackApi';
import '../styles/blackJack.scss';

const ACE = 'ACE';
const PLAYER = 'PLAYER';
const HOUSE = 'HOUSE';
const WINNING_SCORE = 21;

class BlackJack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deckId: '',
      remainingCards: 0,

      playerHand: [],
      houseHand: [],

      playerScore: 0,
      houseScore: 0,

      winner: '',
    }
  }

  componentDidMount() {
    this._initializeGame();
  }

  _initializeGame = () => {
    //TODO: welcome player to get their username then create deck
    BlackJackApi.shuffleCards(6)
      .then(deck => {
        const playerCardsRequest = BlackJackApi.drawCard(deck.deckId, 2);
        const houseCardsRequest = BlackJackApi.drawCard(deck.deckId, 2);

        Promise.all([playerCardsRequest, houseCardsRequest])
          .then(cardSets => {
            this.setState({ 
              playerHand: cardSets[0], 
              playerScore: this._getScoreFromHand(cardSets[0], true),
              houseHand: cardSets[1], 
              houseScore: this._getScoreFromHand(cardSets[1]),
              deckId: deck.deckId, 
              remainingCards: deck.remaining
            });
          });
      }).then(() => {
        this._endGame();
      }).catch(err => {
        console.log(err);
        //TODO: better error handling
      });
  };

  _endGame = () => {
    const { playerScore, houseScore } = this.state;

    if (playerScore < WINNING_SCORE && houseScore < playerScore) {
      this.setState({ winner: PLAYER });
    } else if (playerScore === WINNING_SCORE && houseScore !== WINNING_SCORE) {
      this.setState({ winner: PLAYER });
    } else if (playerScore > WINNING_SCORE) {
      this.setState({ winner: HOUSE });
    } else if (playerScore === houseScore) {
      this.setState({ winner: HOUSE });
    } else if (playerScore < WINNING_SCORE && playerScore < houseScore) {
      this.setState({ winner: HOUSE });
    }
  };

  _getScoreFromHand = (hand, isPlayer = false) => {
    let score = 0;
    let aceCount = 0;

    hand.forEach(card => {
      if (card.value === ACE && isPlayer) {
        //the instructions weren't clear about the Ace's value for the house
        //so I'm assuming it'll be 10 for the house but 11 or 1 for thee player
        aceCount++;
      } else {
        score += card.value;
      }
    });

    for (let i = 0; i < aceCount; i++) {
      const diff = WINNING_SCORE - score;
      if (diff >= 11) {
        score += 11;
      } else {
        score += 1; 
      }
    }

    return score;
  };

  _drawCard = () => {
    const { deckId, playerHand } = this.state;

    BlackJackApi.drawCard(deckId, 1)
      .then(card => {
        const curr = [...playerHand];
        curr.push(card);

        this.setState({ playerHand: curr, playerScore: this._getScoreFromHand(curr, true) }, () => {
          this._endGame()
        });
      }).catch(err => {
        console.log(err);
        //TODO: better error handling
      });
  };

  _stand = () => {
    this._endGame();
  };

  render() {
    const { playerHand, houseHand, playerScore, houseScore, winner } = this.state;

    if (winner) {
      //TODO: modal of the winner and restart prompt
      console.log(winner)
    }

    return (
      <div className='container'>
        <Header playerScore={playerScore} houseScore={houseScore} />
        <Hand hand={houseHand} />
        <Hand hand={playerHand} />
        <div className='container action-container'>
          <Action onPress={this._drawCard} title='Hit' />
          <Action onPress={this._stand} title='Stand' />
        </div>
      </div>
    );
  }
}

export default BlackJack;
