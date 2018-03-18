import React from 'react';
import './styles/css/index.css';
import Board from './Board';
import GameForm from './GameForm';
import GameInfo from './GameInfo';

const pointer = { cursor: "pointer" };

const version = {
    fontSize: '1rem',
    paddingLeft: '1rem'
}

class Game extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleData = this.handleData.bind(this);
        this.config = {
            numRows: 3,
            numCols: 3
        };
        this.state = {
            history: [{
                squares: Array(this.config.numRows*this.config.numCols).fill(null), 
                /* Causes a problem in IE as fill is not implemented there */
            }],
            statusHistory: [{
                message: "Game start",
            }],
            stepNumber: 0,
            numSquaresFilled: 0,
            xIsNext: true,
        };
    }

    jumpTo(step)
    {
        this.setState({
            numSquaresFilled: step,
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            history: this.state.history.slice(0, step + 1),
            statusHistory: this.state.statusHistory.slice(0, step + 1),
        });
    }

    resetGame()
    {
        this.setState({
            history: [{
                squares: Array(this.config.numRows*this.config.numCols).fill(null), /* Causes a problem in IE as fill is not implemented there */
            }],
            statusHistory: [{
                message: "Game start",
            }],
            stepNumber: 0,
            numSquaresFilled: 0,
            xIsNext: true,
        });
    }

    handleClick(i)
    {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const statusHistory = this.state.statusHistory.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const currentClickCol = Math.floor(parseInt(i, 10)%parseInt(this.config.numCols, 10) + 1);
        const currentClickRow = Math.floor(parseInt(i, 10)/parseInt(this.config.numCols, 10) + 1);
        const winnerInfo = calculateWinner(squares, this.config);
        const winner = winnerInfo[0];
        if (winner || squares[i])
        {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            statusHistory: statusHistory.concat([{
                message: "Move " + parseInt(this.state.stepNumber + 1, 10) + ": Placed " + 
                            squares[i] + " at (" + currentClickRow + ", " + currentClickCol + ")",
            }]),
            xIsNext: !this.state.xIsNext,
            numSquaresFilled: this.state.numSquaresFilled + 1,
            stepNumber: history.length,
        });
    }

    handleData(numRows, numCols)
    {
        /*console.log('(Parent) Rows: ' + numRows);
        console.log('(Parent) Cols: ' + numCols);*/
        this.config.numRows = numRows;
        this.config.numCols = numCols;
        /*this.forceUpdate();*/
        this.resetGame();
    }

    render()
    {
        const history = this.state.history;
        const statusHistory = this.state.statusHistory;
        const current = history[this.state.stepNumber];
        const winnerInfo = calculateWinner(current.squares, this.config);
        const winner = winnerInfo[0];
        const winnerConfig = winnerInfo[1];
        const board_fill = isBoardFilled(this.state.numSquaresFilled, history[history.length - 1].squares.length);

        const moves = history.map((step, move) =>
        {
            const desc = statusHistory[move].message;
            return (
                <p key={"step" + move} style={pointer} onClick={() => this.jumpTo(move)}>{desc}</p>
            );
        });

        let status;
        if (winner)
        {
            status = 'Winner: ' + winner;
        }
        else if(board_fill === true)
        {
            status = 'Game draw';
        }
        else
        {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

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
                            squares={current.squares}
                            winConfig={winnerConfig}
                            onClick={(i) => this.handleClick(i)}
                        />
                        <GameForm 
                            handleFromGame={this.handleData}
                        />
                        <div className="game-reset" onClick={() => this.resetGame()}>Reset Game</div>
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


function calculateWinner(squares, config)
{
    return GeneralBoardNaiveVersion(squares, config);
}

function GeneralBoardOptimizedVersion(squares, config)
{

}

function GeneralBoardNaiveVersion(squares, config)
{
    const numRows = parseInt(config.numRows, 10);
    const numCols = parseInt(config.numCols, 10);
    var winnerFound = true;
    for(let rowIndex = 0; rowIndex < numRows; rowIndex++)
    {
        winnerFound = true;
        for(let colIndex = 1; colIndex < numCols; colIndex++)
        {
            if(squares[rowIndex*numCols] !== squares[(rowIndex*numCols) + colIndex])
            {
                winnerFound = false; break;
            }
        }
        if(winnerFound === true && squares[rowIndex*numCols] !== null)
        {
            let winConfig = [];
            winConfig.push(rowIndex*numCols);
            for(let colIndex = 1; colIndex < numCols; colIndex++)
            { winConfig.push((rowIndex*numCols) + colIndex); }
            console.log(winConfig);
            return [squares[rowIndex*numCols], winConfig];
            //return squares[rowIndex*numCols];
        }
    }
    for(let colIndex = 0; colIndex < numCols; colIndex++)
    {
        winnerFound = true;
        for(let rowIndex = 1; rowIndex < numRows; rowIndex++)
        {
            if(squares[colIndex] !== squares[colIndex + (rowIndex*numRows)])
            {
                winnerFound = false; break;
            }
        }
        if(winnerFound === true && squares[colIndex] !== null)
        {
            let winConfig = [];
            winConfig.push(colIndex);
            for(let rowIndex = 1; rowIndex < numRows; rowIndex++)
            { winConfig.push(colIndex + (rowIndex*numRows)); }
            return [squares[colIndex], winConfig];
            //return squares[colIndex];
        }
    }
    if(numRows === numCols)
    {
        let index = 0;
        winnerFound = true;
        while(index < (numCols*numCols-numCols))
        {
            if(squares[0] !== squares[index+numCols+1])
            {
                winnerFound = false; break;
            }
            index = index + numCols + 1;
        }
        if(winnerFound === true && squares[0] !== null)
        {
            index = 0;
            let winConfig = [];
            winConfig.push(0);
            while(index < (numCols*numCols-numCols))
            { winConfig.push(index+numCols+1); index = index+numCols+1; }
            return [squares[0], winConfig];
            //return squares[0];
        }
        winnerFound = true;
        index = numCols - 1;
        while(index < (numCols*numCols-numCols))
        {
            if(squares[numCols - 1] !== squares[index+numCols-1])
            {
                winnerFound = false; break;
            }
            index = index + numCols - 1;
        }
        if(winnerFound === true && squares[numCols-1])
        {
            index = 0;
            let winConfig = [];
            winConfig.push(numCols-1);
            while(index < (numCols*numCols-numCols))
            { winConfig.push(index+numCols-1); index = index+numCols-1; }
            return [squares[numCols - 1], winConfig];
            //return squares[numCols-1];
        }
        else
        {
            return [null, null];
        }
    }
}

function ThreeSquareVersion(squares)
{
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++)
    {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        {
            return squares[a];
        }
    }
    return null;
}

function isBoardFilled(numSquaresFilled, totalSquares)
{
    if(numSquaresFilled === totalSquares)
    {
        return true;
    }
    return false;
}

export default Game;