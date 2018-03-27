import React from "react";
import "../styles/css/index.css";
import Board from "./Board";
import GameForm from "./GameForm";
import GameInfo from "./GameInfo";
import {GeneralBoardAlgo} from "./GeneralizedAlgo";
import {AIMove} from "./AIPlayer";

/* Styling for printing the version of the app */
const version = {
    fontSize: "1rem",
    paddingLeft: "1rem"
}

/**
 * @brief - Component for Game
 * @details
 */
class Game extends React.Component
{
    /**
     * 
     * @param {*} props 
     */
    constructor(props)
    {
        super(props);
        this.handleFromGameInfo = this.handleFromGameInfo.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.config = {
            numRows: 3,
            numCols: 3,
            firstPlayer: 
            {
                name: "human",
                level: "",
                choice: "X",
            },
            secondPlayer: {
                name: "human",
                level: "",
                choice: "O",
            },
        };
        this.state = {
            boardHistory: [{
                squares: Array(this.config.numRows).fill(Array(this.config.numCols).fill(null)), 
                /* Causes a problem in IE as fill is not implemented there */
            }],
            statusHistory: [{
                message: "Game start",
            }],
            stepNumber: 0,
            numSquaresFilled: 0,
            nextPlayer: "F", /* If next player is true, it is the chance of first player */
            winner: null,
            winnerConfig: null,
        };
    }

    /**
     * 
     * @param {*} step 
     */
    jumpTo(step)
    {
        this.setState({
            numSquaresFilled: step,
            stepNumber: step,
            nextPlayer: ((step % 2) === 0)? "F": "S",
            boardHistory: this.state.boardHistory.slice(0, step + 1),
            statusHistory: this.state.statusHistory.slice(0, step + 1),
        });
    }

    /**
     * 
     */
    resetGame()
    {
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
     * 
     */
    componentDidUpdate()
    {
        console.log("ComponentDidUpdate");
        const isBoardFilled = (this.state.numSquaresFilled ===
                                this.state.boardHistory[this.state.boardHistory.length - 1].squares.length);
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
                this.updateBoard(move);
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
        console.log("Update Board");
        console.log(this.state.stepNumber);
        console.log(this.state.boardHistory);
        const boardHistory = this.state.boardHistory.slice(0, this.state.stepNumber + 1);
        const statusHistory = this.state.statusHistory.slice(0, this.state.stepNumber + 1);
        const currentBoard = boardHistory[boardHistory.length - 1];
        const currentSquares = currentBoard.squares.slice();
        console.log(currentSquares);
        // If winner is already declared or the square in the board is unoccupied, do not change the board
        if (this.state.winner || currentSquares[rowIndex][colIndex])
        {
            return;
        }
        currentSquares[rowIndex][colIndex] = ((this.state.nextPlayer === "F") ? 
                                                this.config.firstPlayer.choice : 
                                                this.config.secondPlayer.choice);
        console.log("(" + rowIndex + ", " + colIndex + "): " + currentSquares[rowIndex][colIndex]);
        let winnerInfo = null;
        let winner = null;
        let winnerConfig = null;
        console.log("Before Current Squares: " + currentSquares);
        winnerInfo = GeneralBoardAlgo(currentSquares);
        console.log("After Current Squares: " + currentSquares);
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
        console.log("Handle Click");
        let playerName = ((this.state.nextPlayer === "F") ? 
                            this.config.firstPlayer.name : this.config.secondPlayer.name);
        if(playerName === "ai") { return; }
        const isBoardFilled = (this.state.numSquaresFilled ===
                                this.state.boardHistory[this.state.boardHistory.length - 1].squares.length);
        if(isBoardFilled) {return;}
        console.log(this.state.boardHistory);
        console.log(this.state.boardHistory[this.state.boardHistory.length - 1].squares);
        this.updateBoard(rowIndex, colIndex);
    }

    /**
     * 
     * @param {*} numRows 
     * @param {*} numCols 
     * @param {*} firstPlayer 
     * @param {*} secondPlayer 
     * @param {*} firstPlayerLevel 
     * @param {*} secondPlayerLevel 
     */
    handleFromGameInfo(numRows, numCols, firstPlayer, secondPlayer, firstPlayerLevel, secondPlayerLevel)
    {
        this.config.numRows = parseInt(numRows, 10);
        this.config.numCols = parseInt(numCols, 10);
        this.config.firstPlayer = firstPlayer;
        this.config.secondPlayer = secondPlayer;
        this.resetGame();
    }

    /**
     * 
     */
    handleReset()
    {
        this.resetGame();
    }

    /**
     * 
     */
    render()
    {
        console.log("Game Render");
        const boardHistory = this.state.boardHistory;
        console.log(boardHistory);
        const statusHistory = this.state.statusHistory;
        const currentBoard = boardHistory[this.state.stepNumber];
        const winner = this.state.winner;
        const winnerConfig = this.state.winnerConfig;
        const isBoardFilled = (this.state.numSquaresFilled ===
                                                boardHistory[boardHistory.length - 1].squares.length);
        const moves = boardHistory.map((step, move) =>
        {
            const desc = statusHistory[move].message;
            return (
                <p key={"step" + move} className="game-move-item" onClick={() => this.jumpTo(move)}>{desc}</p>
            );
        });

        let status;
        if (winner)
        {
            status = "Winner: " + winner;
        }
        else if(isBoardFilled === true)
        {
            status = "Game draw";
        }
        else
        {
            status = "Next player: " + (this.state.nextPlayer === "F" ? 
                                        this.config.firstPlayer.choice : this.config.secondPlayer.choice);
        }
        console.log(this.state.boardHistory);
        return (
            <div className="game">
                <div className="game-title">
                    <span>{this.props.title}</span>
                    <span style={version}>{this.props.version}</span>
                </div>
                <div className="game-box">
                    <div className="game-board">
                        <Board
                            numRows={this.config.numRows}
                            numCols={this.config.numCols}
                            squares={currentBoard.squares}
                            winnerConfig={winnerConfig}
                            onClick={(rowIndex, colIndex) => this.handleClick(rowIndex, colIndex)}
                        />
                        <GameForm 
                            handleFromGame={this.handleFromGameInfo}
                            handleForReset={this.handleReset}
                        />
                    </div>
                    <GameInfo 
                        status={status}
                        moves={moves}
                    />
                </div>
            </div>
        );
    }
}


export default Game;