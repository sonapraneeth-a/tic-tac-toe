import React from "react";
import "./styles/css/index.css";
import Board from "./Board";
import GameForm from "./GameForm";
import GameInfo from "./GameInfo";
import {GeneralBoardNaiveAlgo} from "./GeneralizedNaiveAlgo";
// import {GeneralBoardOptimizedAlgo} from "./GeneralizedOptimalAlgo";

const pointer = { cursor: "pointer" };

const version = {
    fontSize: "1rem",
    paddingLeft: "1rem"
}

class Game extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleData = this.handleData.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.config = {
            num_rows: 3,
            num_cols: 3,
            first_player: 
            {
                name: "human",
                level: "",
                choice: "X",
            },
            second_player: {
                name: "human",
                level: "",
                choice: "O",
            }
        };
        const length_of_aux_array = parseInt(this.config.num_rows, 10) + parseInt(this.config.num_cols, 10) + 2;
        this.state = {
            board_history: [{
                squares: Array(this.config.num_rows*this.config.num_cols).fill(null), 
                /* Causes a problem in IE as fill is not implemented there */
            }],
            aux_history: [{
                win: Array(length_of_aux_array).fill("UD"), 
                count: Array(length_of_aux_array).fill(0), 
                current_winner: "UD",
                /* Causes a problem in IE as fill is not implemented there */
            }],
            status_history: [{
                message: "Game start",
            }],
            step_number: 0,
            num_squares_filled: 0,
            next_player: "F", /* If next player is true, it is the chance of first player */
            winner: null,
            win_config: null,
        };
    }

    jumpTo(step)
    {
        this.setState({
            num_squares_filled: step,
            step_number: step,
            next_player: ((step % 2) === 0)? "F": "S",
            board_history: this.state.board_history.slice(0, step + 1),
            status_history: this.state.status_history.slice(0, step + 1),
            aux_history: this.state.aux_history.slice(0, step + 1),
        });
    }

    resetGame()
    {
        this.setState({
            board_history: [{
                squares: Array(this.config.num_rows*this.config.num_cols).fill(null),
                /* Causes a problem in IE as fill is not implemented there */
            }],
            aux_history: [{
                win: Array(parseInt(this.config.num_rows, 10) + parseInt(this.config.num_cols, 10) + 2).fill("UD"), 
                count: Array(parseInt(this.config.num_rows, 10) + parseInt(this.config.num_cols, 10) + 2).fill(0), 
                current_winner: "UD",
                /* Causes a problem in IE as fill is not implemented there */
            }],
            status_history: [{
                message: "Game start",
            }],
            step_number: 0,
            num_squares_filled: 0,
            next_player: "F",
        });
    }

    handleClick(i)
    {
        const board_history = this.state.board_history.slice(0, this.state.step_number + 1);
        const status_history = this.state.status_history.slice(0, this.state.step_number + 1);
        const aux_history = this.state.aux_history.slice(0, this.state.step_number + 1);
        const current_board_status = board_history[board_history.length - 1];
        const current_squares = current_board_status.squares.slice();
        const aux_current = aux_history[aux_history.length - 1];
        const aux_win_current = aux_current.win.slice();
        const aux_count_current = aux_current.count.slice();
        const current_click_col = Math.floor(parseInt(i, 10)%parseInt(this.config.num_cols, 10) + 1);
        const current_click_row = Math.floor(parseInt(i, 10)/parseInt(this.config.num_cols, 10) + 1);
        // If winner is already declared or the square in the board is unoccupied, do not change the board
        if (this.state.winner || current_squares[i])
        {
            return;
        }
        let current_winner = "UD";
        current_squares[i] = ((this.state.next_player === "F") ? 
                                this.config.first_player.choice : this.config.second_player.choice);
        const winner_info = GeneralBoardNaiveAlgo(current_squares, this.config, "yes");
        const winner = winner_info[0];
        const winner_config = winner_info[1];
        this.setState({
            board_history: board_history.concat([{
                squares: current_squares,
            }]),
            status_history: status_history.concat([{
                message: "Move " + parseInt(this.state.step_number + 1, 10) + ": Placed " + 
                            current_squares[i] + " at (" + current_click_row + ", " + current_click_col + ")",
            }]),
            aux_history: aux_history.concat([{
                win: aux_win_current,
                count: aux_count_current,
                current_winner: current_winner,
            }]),
            next_player: (this.state.next_player === "F")?"S":"F",
            num_squares_filled: this.state.num_squares_filled + 1,
            step_number: board_history.length,
            winner: winner,
            win_config: winner_config,
        });
    }

    handleData(num_rows, num_cols, first_player, second_player, first_player_level, second_player_level)
    {
        /*console.log("(Parent) Rows: " + num_rows);
        console.log("(Parent) Cols: " + num_cols);*/
        this.config.num_rows = num_rows;
        this.config.num_cols = num_cols;
        this.config.first_player = first_player;
        this.config.second_player = second_player;
        /*this.forceUpdate();*/
        this.resetGame();
    }

    handleReset()
    {
        console.log("Handle reset");
        this.resetGame();
    }

    render()
    {
        const board_history = this.state.board_history;
        const status_history = this.state.status_history;
        const current_board = board_history[this.state.step_number];
        //const winner_info = GeneralBoardNaiveAlgo(current_board.squares, this.config, "yes");
        const winner = this.state.winner;//winner_info[0];
        const winner_config = this.state.win_config;//winner_info[1];
        const is_board_filled = IsBoardFilled(this.state.num_squares_filled, 
                                                board_history[board_history.length - 1].squares.length);
        const moves = board_history.map((step, move) =>
        {
            const desc = status_history[move].message;
            return (
                <p key={"step" + move} style={pointer} onClick={() => this.jumpTo(move)}>{desc}</p>
            );
        });

        let status;
        if (winner)
        {
            status = "Winner: " + winner;
        }
        else if(is_board_filled === true)
        {
            status = "Game draw";
        }
        else
        {
            status = "Next player: " + (this.state.next_player === "F" ? 
                                        this.config.first_player.choice : this.config.second_player.choice);
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
                            num_rows={this.config.num_rows}
                            num_cols={this.config.num_cols}
                            squares={current_board.squares}
                            win_config={winner_config}
                            onClick={(i) => this.handleClick(i)}
                        />
                        <GameForm 
                            handleFromGame={this.handleData}
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


function IsBoardFilled(num_squares_filled, total_squares)
{
    if(num_squares_filled === total_squares)
    {
        return true;
    }
    return false;
}

export default Game;