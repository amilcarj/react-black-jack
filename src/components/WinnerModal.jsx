import React from 'react';
import '../styles/blackJack.scss';

class WinnerModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    }
  }

  _closeModal = () => {
    this.setState({ showModal: false }, () => {
      this.props.initializeGame();
    });
  }

  openModal = () => {
    this.setState({ showModal: true })
  };

  render() {
    const { playerWon } = this.props;
    const text = playerWon ? 'You Won! Congrats!' : 'You Lost, Sorry =(';

    return (
      <div className={`modal-container ${this.state.showModal ? 'modal-fade-in' : 'modal-fade-out'}`}>
        <div className='modal-content'>
          <div className='bold winning-text'>{text}</div>
          <div className='play-again-prompt'>Do you want to play again?</div>
          <div className='button' onClick={this._closeModal}>Yes</div>
        </div>
      </div>
    );
  }
}

export default WinnerModal;
