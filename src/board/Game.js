import React from 'react';
import Board from "./Board";
import '../styles/css/index.css';

/**
 * @brief Game component which handles all the aspects of the game
 */
class Game extends React.Component
{
    /**
     * @brief Determines how all the components of the board should be rendered
     */
    render()
    {
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        numRows={4}
                        numCols={4}
                    />
                </div>
                <div className="game-info">
                </div>
            </div>
        );
    }
}

export default Game;