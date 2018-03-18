import React from 'react';

class GameInfo extends React.Component
{
    render ()
    {
        return (
            <div className="game-info">
                <div>{this.props.status}</div>
                <ol>{this.props.moves}</ol>
            </div>
        );
    }
}

export default GameInfo;