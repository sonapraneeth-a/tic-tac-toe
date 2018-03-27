import React from 'react';

/* https://codepen.io/PiotrBerebecki/pen/dpRdKP?editors=0010 */

/**
 * 
 */
class GameForm extends React.Component
{
    /**
     * 
     * @param {*} props 
     */
    constructor(props)
    {
        super(props);
        this.state = {
            numRows: 3,
            numCols: 3,
            playerOne: "human",
            playerTwo: "human",
            playerChoice: "X",
            firstPlayer: 
            {
                name: "human",
                level: "",
                choice: "X",
            },
            secondPlayer:
            {
                name: "human",
                level: "",
                choice: "O",
            }
        };

        /**
         * 
         */
        this.handleRows = this.handleRows.bind(this);
        this.handleCols = this.handleCols.bind(this);
        this.handleFirstPlayer = this.handleFirstPlayer.bind(this);
        this.handleSecondPlayer = this.handleSecondPlayer.bind(this);
        this.handlePlayerChoice = this.handlePlayerChoice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    /**
     * 
     * @param {*} event 
     */
    handleRows(event)
    {
        this.setState({numRows: event.target.value});
    }

    /**
     * 
     * @param {*} event 
     */
    handleCols(event)
    {
        this.setState({numCols: event.target.value});
    }

    /**
     * 
     * @param {*} event 
     */
    handlePlayerChoice(event)
    {
        let firstPlayerChoice = (event.target.value === "X")? "X" : "O";
        let secondPlayerChoice = (event.target.value === "X")? "O" : "X";
        this.setState({
            playerChoice: event.target.value,
            firstPlayer: {
                name: this.state.firstPlayer.name,
                level: this.state.firstPlayer.level,
                choice: firstPlayerChoice,
            },
            secondPlayer: {
                name: this.state.secondPlayer.name,
                level: this.state.secondPlayer.level,
                choice: secondPlayerChoice,
            }
        });
    }

    /**
     * 
     * @param {*} event 
     */
    handleFirstPlayer(event)
    {
        let tokens = event.target.value.split("-");
        let name = tokens[0];
        let level = null;
        if(tokens.length > 1) { level = tokens[1]; }
        this.setState({
            playerOne: event.target.value,
            firstPlayer: {
                name: name,
                level: level,
                choice: this.state.firstPlayer.choice,
            }
        });
    }

    /**
     * 
     * @param {*} event 
     */
    handleSecondPlayer(event)
    {
        let tokens = event.target.value.split("-");
        let name = tokens[0];
        let level = null;
        if(tokens.length > 1) { level = tokens[1]; }
        this.setState({
            playerTwo: event.target.value,
            secondPlayer: {
                name: name,
                level: level,
                choice: this.state.secondPlayer.choice,
            }
        });
    }

    /**
     * 
     * @param {*} event 
     */
    handleSubmit(event)
    {
        /*console.log('(Child) Number of rows in the board: ' + this.state.numRows);
        console.log('(Child) Number of cols in the board: ' + this.state.numCols);*/
        event.preventDefault();
        this.props.handleFromGame(this.state.numRows, this.state.numCols, 
                                    this.state.firstPlayer, this.state.secondPlayer);
    }

    /**
     * 
     * @param {*} event 
     */
    handleReset(event)
    {
        event.preventDefault();
        this.props.handleForReset();
    }

    /**
     * 
     */
    render()
    {
        return (
            <div className="game-controls">
                <form onSubmit={this.handleSubmit} className="game-form">
                    <div className="game-form-item">
                        <input type="number" value={this.state.numRows} 
                                min="3" max="5"
                                placeholder="Number of rows..." onChange={this.handleRows} />
                        <input type="number" value={this.state.numCols}
                                min="3" max="5"
                                placeholder="Number of cols..." onChange={this.handleCols} />
                    </div>
                    <div className="game-form-item">
                        <div className="game-form-players">
                            <label> First Player </label>
                            <select value={this.state.playerOne}
                                    onChange={this.handleFirstPlayer}>
                                <option value="human">Human</option>
                                <option value="ai-easy">AI - Easy</option>
                            </select>
                            <select value={this.state.playerChoice} 
                                    onChange={this.handlePlayerChoice}>
                                <option value="X">X</option>
                                <option value="O">O</option>
                            </select>
                        </div>
                        <div className="game-form-players">
                            <label> Second Player </label>
                            <select value={this.state.playerTwo} onChange={this.handleSecondPlayer}>
                                <option value="human">Human</option>
                                <option value="ai-easy">AI - Easy</option>
                            </select>
                        </div>
                    </div>
                    <div className="game-form-item submit">
                        <input type="submit" 
                                value="Submit" />
                    </div>
                </form>
                <div className="game-reset" onClick={this.handleReset}>Reset Board</div>
            </div>
        );
    }
}


export default GameForm;