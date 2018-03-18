import React from 'react';

/* https://codepen.io/PiotrBerebecki/pen/dpRdKP?editors=0010 */
class GameForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {numRows: 3, numCols: 3};

        this.handleRows = this.handleRows.bind(this);
        this.handleCols = this.handleCols.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleRows(event)
    {
        this.setState({numRows: event.target.value});
    }

    handleCols(event)
    {
        this.setState({numCols: event.target.value});
    }

    handleSubmit(event)
    {
        /*console.log('(Child) Number of rows in the board: ' + this.state.numRows);
        console.log('(Child) Number of cols in the board: ' + this.state.numCols);*/
        event.preventDefault();
        this.props.handleFromGame(this.state.numRows, this.state.numCols);
    }

    render()
    {
        return (
            <div className="game-controls">
                <form onSubmit={this.handleSubmit} className="game-form">
                    <input type="number" value={this.state.numRows} 
                            min="3" max="5"
                            className="game-form-item"
                            placeholder="Number of rows..." onChange={this.handleRows} />
                    <input type="number" value={this.state.numCols}
                            min="3" max="5"
                            className="game-form-item"
                            placeholder="Number of cols..." onChange={this.handleCols} />
                    <input type="submit" 
                            className="game-form-item"
                            value="Submit" />
                </form>
            </div>
        );
    }
}


export default GameForm;