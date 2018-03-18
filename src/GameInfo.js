import React from 'react';

class GameInfo extends React.Component
{
    render ()
    {
        return (
            <div className="game-info">
                <div>{this.props.status}</div>
                <div>
                    {this.props.moves}
                </div>
            </div>
        );
    }
}

export default GameInfo;