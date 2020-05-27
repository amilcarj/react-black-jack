import React from 'react';
import '../styles/blackJack.scss';

class Action extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onPress, title } = this.props;

    return (
      <div className='button' onClick={onPress}>
        {title}
      </div>
    );
  }
}

export default Action;
