import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';
import registerServiceWorker from './registerServiceWorker';
import Game from './Game';


ReactDOM.render (
    <Game
        title="Tic Tac Toe"
        version="0.7.1"
    />,
    document.getElementById('app')
);

registerServiceWorker();

