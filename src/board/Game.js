import React from "react";
import Board from "./Board";
import GameForm from "./GameForm";
import "../styles/css/index.css";

/**
 * @brief - Game component which handles all the aspects of the game
 */
class Game extends React.Component
{
    /**
     * @brief - Constructor for the Game component
     * @param {*} props - 
     */
    constructor(props)
    {
        super(props);
        // Handles for setting this.config for GameForm component from Game component
        this.handleFromGameInfo = this.handleFromGameInfo.bind(this);
        // Handles for resetting the game for GameForm component from Game component
        this.handleReset = this.handleReset.bind(this);
        // Configuration of the game board
        this.config = {
            numRows: 3, // Number of rows in the board
            numCols: 3, // Number of cols in the board
            firstPlayer: // Information about first player
            {
                name: "human", // Name of the player
                level: "",     // Level of the player if player is AI
                choice: "X",   // Which handle the player selects
            },
            secondPlayer: // Information about second player
            { 
                name: "human", // Name of the player
                level: "",     // Level of the player if player is AI
                choice: "O",   // Which handle the player selects
            },
        };
        // Current state of the game
        this.state = {
            boardHistory: [{
                squares: Array(this.config.numRows).fill(Array(this.config.numCols).fill(null)), 
                /* Causes a problem in IE as fill is not implemented there */
            }],                 // History of moves on the board
            statusHistory: [{
                message: "Game start",
            }],                  // History of status messages regarding the game
            stepNumber: 0,       // Which move number?
            numSquaresFilled: 0, // How many squares have been filled currently?
            nextPlayer: "F",     // "F" represents First Player, "S" represents Second Player 
            winner: null,        // Who is the winner?
            winnerConfig: null,  // Which squares determine the winner?
        };
    }

    /**
     * @brief - Set the game config sent by GameForm
     * @param {*} numRows - Number of rows for the board
     * @param {*} numCols - Number of cols for the board
     * @param {*} firstPlayer - Information abou the first player
     * @param {*} secondPlayer - Information about the second player
     * @param {*} firstPlayerLevel 
     * @param {*} secondPlayerLevel 
     */
    handleFromGameInfo(numRows, numCols, firstPlayer, secondPlayer, firstPlayerLevel, secondPlayerLevel)
    {
        this.config.numRows = parseInt(numRows, 10); // Set the number of rows for the board
        this.config.numCols = parseInt(numCols, 10); // Set the number of cols for the board
        this.config.firstPlayer = firstPlayer;       // Set information about the first player
        this.config.secondPlayer = secondPlayer;     // Set information about the second player
        // Reset the game based on information provided by the user
        this.resetGame();
    }

    /**
     * @brief - Handle for GameForm to reset the game
     */
    handleReset()
    {
        // Reset the game
        this.resetGame();
    }

    /**
     * @brief - Resets the game to the initial state
     */
    resetGame()
    {
        // Resetting the game would mean setting the state of the board to what it
        // originally started with. Please see constructor for the original state
        // of the board
        this.setState({
            boardHistory: [{
                squares: Array(this.config.numRows).fill(Array(this.config.numCols).fill(null)), 
                /* Causes a problem in IE as fill is not implemented there */
            }],
            statusHistory: [{
                message: "Game start",
            }],
            stepNumber: 0,
            numSquaresFilled: 0,
            nextPlayer: "F",
            winner: null,
            winnerConfig: null,
        });
    }

    /**
     * @brief - Determines how all the components of the board should be rendered
     */
    render()
    {
        return (
            <div className="game">
                {/* Title and version of the game */}
                <div className="game-title">
                    <span>{this.props.title}</span>
                    <span>{this.props.version}</span>
                </div>
                {/* Game board, form and moves */}
                <div className="game-box">
                    <div className="game-board">
                        {/* Game board contains board as well as form 
                            for submitting game config */}
                        <Board 
                            numRows={this.config.numRows}
                            numCols={this.config.numCols}
                        />
                        <GameForm 
                            handleFromGame={this.handleFromGameInfo}
                            handleForReset={this.handleReset}
                        />
                    </div>
                    {/* Information regarding game moves */}
                    <div className="game-info">
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;