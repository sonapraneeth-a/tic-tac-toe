import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';
import registerServiceWorker from './registerServiceWorker';
import Game from './BoardOneD/Game';


ReactDOM.render (
    <Game
        title="Tic Tac Toe"
        version="v0.8.2"
    />,
    document.getElementById('app')
);

registerServiceWorker();

