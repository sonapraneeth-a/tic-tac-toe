import React from "react";
import Board from "./Board";
import GameForm from "./GameForm";
import {CalculateWinner} from "./DecideWinner";
import {AIMove} from "./AIPlayer";
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
                squares: this.createEmptyBoard(this.config.numRows, this.config.numCols),
                // Removed polyfill as there was an array problem.
                // See: https://stackoverflow.com/questions/9979560/javascript-multidimensional-array-updating-specific-element?rq=1
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
     * @brief - Creates an empty 2D array
     * @param {*} numRows - Number of rows required for the board
     * @param {*} numCols - Number of columns required for the board
     */
    createEmptyBoard(numRows, numCols)
    {
        var board = new Array(numRows);
        for (let rowIndex = 0; rowIndex < numRows; rowIndex++)
        {
            board[rowIndex] = new Array(numCols);
            // Creating a board row
            for (let colIndex = 0; colIndex < numCols; colIndex++)
            {
                board[rowIndex][colIndex] = null;
            }
        }
        return board;
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
                squares: this.createEmptyBoard(this.config.numRows, this.config.numCols),
                // Removed polyfill as there was an array problem.
                // See: https://stackoverflow.com/questions/9979560/javascript-multidimensional-array-updating-specific-element?rq=1
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
     * 
     */
    componentDidUpdate()
    {
        const isBoardFilled = (this.state.numSquaresFilled ===
                                (this.config.numRows * this.config.numCols));
        if (this.state.winner || isBoardFilled)
        {
            return;
        }
        let playerName = ((this.state.nextPlayer === "F") ? 
                            this.config.firstPlayer.name : this.config.secondPlayer.name);
        if(playerName === "ai")
        {
            setTimeout(() => {
                let PlayerLevel = ((this.state.nextPlayer === "F") ? 
                                    this.config.firstPlayer.level : this.config.secondPlayer.level);
                let current_player = ((this.state.nextPlayer === "F") ? 
                                    this.config.firstPlayer.choice : this.config.secondPlayer.choice);
                let current_board = this.state.boardHistory[this.state.boardHistory.length-1].squares;
                var move = AIMove(current_player, current_board, PlayerLevel);
                this.updateBoard(move[0], move[1]);
            }, 1000);
        }
    }

    /**
     * 
     * @param {*} rowIndex 
     * @param {*} colIndex 
     */
    updateBoard(rowIndex, colIndex)
    {
        const boardHistory = this.state.boardHistory.slice(0, this.state.stepNumber + 1);
        const statusHistory = this.state.statusHistory.slice(0, this.state.stepNumber + 1);
        const currentBoard = boardHistory[boardHistory.length - 1];
        const currentSquares = currentBoard.squares.slice();
        // If winner is already declared or the square in the board is unoccupied, do not change the board
        if (this.state.winner || currentSquares[rowIndex][colIndex])
        {
            return;
        }
        currentSquares[rowIndex][colIndex] = ((this.state.nextPlayer === "F") ? 
                                                this.config.firstPlayer.choice : 
                                                this.config.secondPlayer.choice);
        let winnerInfo = null;
        let winner = null;
        let winnerConfig = null;
        winnerInfo = CalculateWinner(currentSquares);
        winner = winnerInfo[0];
        winnerConfig = winnerInfo[1];
        this.setState({
            boardHistory: boardHistory.concat([{
                squares: currentSquares,
            }]),
            statusHistory: statusHistory.concat([{
                message: "Move " + parseInt(this.state.stepNumber + 1, 10) + ": Placed " + 
                            currentSquares[rowIndex][colIndex] + " at (" + rowIndex + ", " + colIndex + ")",
            }]),
            nextPlayer: (this.state.nextPlayer === "F")?"S":"F",
            numSquaresFilled: this.state.numSquaresFilled + 1,
            stepNumber: boardHistory.length,
            winner: winner,
            winnerConfig: winnerConfig,
        });
    }

    /**
     * 
     * @param {*} rowIndex 
     * @param {*} colIndex 
     */
    handleClick(rowIndex, colIndex)
    {
        let playerName = ((this.state.nextPlayer === "F") ? 
                            this.config.firstPlayer.name : this.config.secondPlayer.name);
        if(playerName === "ai") { return; }
        const isBoardFilled = (this.state.numSquaresFilled ===
                                (this.config.numRows*this.config.numCols));
        if(isBoardFilled) {return;}
        this.updateBoard(rowIndex, colIndex);
    }

    /**
     * @brief - Determines how all the components of the board should be rendered
     */
    render()
    {
        const currentBoard= this.state.boardHistory[this.state.boardHistory.length-1];
        const isBoardFilled = (this.state.numSquaresFilled ===
                                    (this.config.numRows * this.config.numCols));
        let status = null;
        if(this.state.winner)
        {
            status = "Winner: " + this.state.winner;
        }
        else if(isBoardFilled === true)
        {
            status = "Game draw";
        }
        else
        {
            status = "Next player: " + ((this.state.nextPlayer === "F") ? 
                                        this.config.firstPlayer.choice : 
                                        this.config.secondPlayer.choice);
        }
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
                            squares={currentBoard.squares}
                            status={status}
                            onClick={(rowIndex, colIndex) => this.handleClick(rowIndex, colIndex)}
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