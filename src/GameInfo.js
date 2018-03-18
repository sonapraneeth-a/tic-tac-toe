import React from 'react';
import './styles/css/index.css';

const game_status = {
    fontWeight: 'bold'
}
class GameInfo extends React.Component
{
    render ()
    {
        return (
            <div className="game-info">
                <div style={game_status}>{this.props.status}</div>
                <div>
                    {this.props.moves}
                </div>
            </div>
        );
    }
}

export default GameInfo;