import React from 'react';
import ReactDOM from 'react-dom';
import './core.scss';
import BlackJack from './containers/BlackJack/BlackJack';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BlackJack />,
  document.getElementById('root')
);

serviceWorker.unregister();
