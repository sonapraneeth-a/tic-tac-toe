import React from 'react';
import Board from './Board';
import GameForm from './GameForm';
import GameInfo from './GameInfo';

const pointer = { cursor: "pointer" };

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
        });
    }

    resetGame()
    {
        this.setState({
            history: [{
                squares: Array(this.config.numRows*this.config.numCols).fill(null), /* Causes a problem in IE as fill is not implemented there */
            }],
            stepNumber: 0,
            numSquaresFilled: 0,
            xIsNext: true,
        });
    }

    handleClick(i)
    {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares, this.config) || squares[i])
        {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
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
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares, this.config);
        const board_fill = isBoardFilled(this.state.numSquaresFilled, history[history.length - 1].squares.length);

        const moves = history.map((step, move) =>
        {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
                <li key={"step" + move}>
                    <p style={pointer} onClick={() => this.jumpTo(move)}>{desc}</p>
                </li>
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
                <div className="game-title">Tic Tac Toe</div>
                <div className="game-box">
                    <div className="game-board">
                        <Board
                            numRows={this.config.numRows}
                            numCols={this.config.numCols}
                            squares={current.squares}
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
            return squares[rowIndex*numCols];
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
            return squares[colIndex];
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
            return squares[0];
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
            return squares[numCols - 1];
        }
        else
        {
            return null;
        }
    }
    /*const lines = [
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
    return null;*/
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