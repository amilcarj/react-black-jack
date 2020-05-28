import React from 'react';

import WinnerModal from '../components/WinnerModal';
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

      playerHand: [],
      houseHand: [],

      playerScore: 0,
      houseScore: 0,

      winner: '',
      playerName: ''
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
              winner: '',
            }, () => {
              if (this.state.playerScore >= WINNING_SCORE || this.state.houseScore >= WINNING_SCORE) {
                this._endGame();
              }
            });
          });
      }).catch(err => {
        console.log(err);
        //TODO: better error handling
      });
  };

  _endGame = () => {
    const { playerScore, houseScore } = this.state;

    let winner = '';
    if (playerScore < WINNING_SCORE && houseScore < playerScore) {
      winner = PLAYER;
    } else if (playerScore === WINNING_SCORE && houseScore !== WINNING_SCORE) {
      winner = PLAYER;
    } else if (playerScore > WINNING_SCORE) {
      winner = HOUSE;
    } else if (playerScore === houseScore) {
      winner = HOUSE;
    } else if (playerScore < WINNING_SCORE && playerScore < houseScore) {
      winner = HOUSE;
    }

    if (winner) {
      this.setState({ winner }, () => {
        this.modal.openModal();
      });
    }
  };

  _getScoreFromHand = (hand, isPlayer = false) => {
    let score = 0;
    let aceCount = 0;

    hand.forEach(card => {
      if (card.name === ACE && isPlayer) {
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
        curr.push(...card);
        //TODO: animation

        const playerScore = this._getScoreFromHand(curr, true);
        this.setState({ playerHand: curr, playerScore }, () => {
          if (playerScore >= WINNING_SCORE) {
            this._endGame();
          }
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
    const { playerHand, houseHand, playerScore, houseScore, winner, playerName } = this.state;
    const user = playerName || 'Player';

    return (
      <div className='container'>
        <WinnerModal 
          playerWon={winner === PLAYER}
          initializeGame={this._initializeGame}
          ref={modal => this.modal = modal}
          />
        <Header
          playerScore={playerScore}
          houseScore={houseScore}
          playerName={user}
          />
        <Hand hand={houseHand} label={'House'} />
        <Hand hand={playerHand} label={user} />
        <div className='action-container'>
          <Action onPress={this._drawCard} title='Hit' />
          <Action onPress={this._stand} title='Stand' />
        </div>
      </div>
    );
  }
}

export default BlackJack;
