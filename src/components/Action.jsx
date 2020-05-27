import React from 'react';
import '../styles/blackJack.scss';

class Action extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onPress, title } = this.props;

    return (
      <div className='action' onPress={onPress}>
        {title}
      </div>
    );
  }
}

export default Action;
