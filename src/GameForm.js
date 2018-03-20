import React from 'react';

/* https://codepen.io/PiotrBerebecki/pen/dpRdKP?editors=0010 */

const pointer = { cursor: "pointer" };

class GameForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {num_rows: 3, num_cols: 3};

        this.handleRows = this.handleRows.bind(this);
        this.handleCols = this.handleCols.bind(this);
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

    handleSubmit(event)
    {
        /*console.log('(Child) Number of rows in the board: ' + this.state.num_rows);
        console.log('(Child) Number of cols in the board: ' + this.state.num_cols);*/
        event.preventDefault();
        this.props.handleFromGame(this.state.num_rows, this.state.num_cols);
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
                    <input type="number" value={this.state.num_rows} 
                            min="3" max="5"
                            className="game-form-item"
                            placeholder="Number of rows..." onChange={this.handleRows} />
                    <input type="number" value={this.state.num_cols}
                            min="3" max="5"
                            className="game-form-item"
                            placeholder="Number of cols..." onChange={this.handleCols} />
                    <input type="submit" 
                            className="game-form-item"
                            value="Submit" />
                </form>
                <div className="game-players">
                    <div style={pointer} className="player-highlight">Human</div>
                    <div>AI</div>
                </div>
                <div className="game-reset" onClick={this.handleReset}>Reset Game</div>
            </div>
        );
    }
}


export default GameForm;