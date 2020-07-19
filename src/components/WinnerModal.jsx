import React from 'react';
import '../styles/blackJack.scss';

const WinnerModal = ({playerWon, showModal, closeModal}) => {
  const text = playerWon ? 'You Won! Congrats!' : 'You Lost, Sorry =(';

  return (
    <div className={`modal-container ${showModal ? 'modal-fade-in' : 'modal-fade-out'}`}>
      <div className='modal-content'>
        <div className='bold winning-text'>{text}</div>
        <div className='play-again-prompt'>Do you want to play again?</div>
        <div className='button' onClick={closeModal}>Yes</div>
      </div>
    </div>
  );
};

export default WinnerModal;
