import React from 'react';
import '../styles/blackJack.scss';

const Action = (props) => {
  const { onPress, title } = props;

  return (
    <div className='button' onClick={onPress}>
      {title}
    </div>
  );
};

export default Action;
