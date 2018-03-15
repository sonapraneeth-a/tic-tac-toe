import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';
import registerServiceWorker from './registerServiceWorker';

const pointer = { cursor: "pointer" };

class Square extends React.Component
{
    render()
    {
        return (
            <p style={pointer} className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </p>
        );
    }
}

class Board extends React.Component
{
    renderSquare(i)
    {
        return <Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}/>;
    }

    render()
    {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null), /* Causes a problem in IE as fill is not implemented there */
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
                squares: Array(9).fill(null), /* Causes a problem in IE as fill is not implemented there */
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
        if (calculateWinner(squares) || squares[i])
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

    render()
    {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
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
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <div className="game-reset" onClick={() => this.resetGame()}>Reset Game</div>
                        <div>{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render (
    <Game />,
    document.getElementById('app')
);

function calculateWinner(squares)
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

registerServiceWorker();
