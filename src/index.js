import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';
import registerServiceWorker from './registerServiceWorker';
import Game from './Game';


ReactDOM.render (
    <Game
        title="Tic Tac Toe"
        version="0.5.0"
    />,
    document.getElementById('app')
);

registerServiceWorker();

