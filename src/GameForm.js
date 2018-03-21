import React from 'react';

/* https://codepen.io/PiotrBerebecki/pen/dpRdKP?editors=0010 */

class GameForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            num_rows: 3,
            num_cols: 3,
            player_one: "human",
            player_two: "human",
            first_player: 
            {
                name: "human",
                level: "",
            },
            second_player: {
                name: "human",
                level: "",
            }
        };

        this.handleRows = this.handleRows.bind(this);
        this.handleCols = this.handleCols.bind(this);
        this.handleFirstPlayer = this.handleFirstPlayer.bind(this);
        this.handleSecondPlayer = this.handleSecondPlayer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleRows(event)
    {
        this.setState({num_rows: event.target.value});
    }

    handleCols(event)
    {
        this.setState({num_cols: event.target.value});
    }

    handleFirstPlayer(event)
    {
        let tokens = event.target.value.split("-");
        let name = tokens[0];
        let level = null;
        if(tokens.length > 1) { level = tokens[1]; }
        this.setState({
            player_one: event.target.value,
            first_player: {
                name: name,
                level: level,
            }
        });
    }

    handleSecondPlayer(event)
    {
        let tokens = event.target.value.split("-");
        let name = tokens[0];
        let level = null;
        if(tokens.length > 1) { level = tokens[1]; }
        this.setState({
            player_two: event.target.value,
            second_player: {
                name: name,
                level: level,
            }
        });
    }

    handleSubmit(event)
    {
        /*console.log('(Child) Number of rows in the board: ' + this.state.num_rows);
        console.log('(Child) Number of cols in the board: ' + this.state.num_cols);*/
        event.preventDefault();
        this.props.handleFromGame(this.state.num_rows, this.state.num_cols, 
                                    this.state.first_player, this.state.second_player);
    }

    handleReset(event)
    {
        event.preventDefault();
        console.log("Reset event");
        this.props.handleForReset();
    }

    render()
    {
        return (
            <div className="game-controls">
                <form onSubmit={this.handleSubmit} className="game-form">
                    <div className="game-form-item">
                        <input type="number" value={this.state.num_rows} 
                                min="3" max="5"
                                placeholder="Number of rows..." onChange={this.handleRows} />
                        <input type="number" value={this.state.num_cols}
                                min="3" max="5"
                                placeholder="Number of cols..." onChange={this.handleCols} />
                    </div>
                    <div className="game-form-item">
                        <div className="game-form-players">
                            <label> First Player </label>
                            <select value={this.state.player_one} onChange={this.handleFirstPlayer}>
                                <option value="human">Human</option>
                                <option value="ai-easy">AI - Easy</option>
                                <option value="ai-difficult">AI - Difficult</option>
                            </select>
                        </div>
                        <div className="game-form-players">
                            <label> Second Player </label>
                            <select value={this.state.player_two} onChange={this.handleSecondPlayer}>
                                <option value="human">Human</option>
                                <option value="ai-easy">AI - Easy</option>
                                <option value="ai-difficult">AI - Difficult</option>
                            </select>
                        </div>
                    </div>
                    <div className="game-form-item submit">
                        <input type="submit" 
                                value="Submit" />
                    </div>
                </form>
                <div className="game-reset" onClick={this.handleReset}>Reset Game</div>
            </div>
        );
    }
}


export default GameForm;