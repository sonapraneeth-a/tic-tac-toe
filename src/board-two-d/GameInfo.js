import React from 'react';
import '../styles/css/index.css';

const gameStatus = {
    fontWeight: 'bold'
}
class GameInfo extends React.Component
{
    render ()
    {
        return (
            <div className="game-info">
                <div style={gameStatus}>{this.props.status}</div>
                <div>
                    {this.props.moves}
                </div>
            </div>
        );
    }
}

export default GameInfo;