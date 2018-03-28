import React from 'react';

/* https://codepen.io/PiotrBerebecki/pen/dpRdKP?editors=0010 */

/**
 * 
 */
class GameForm extends React.Component
{
    /**
     * @brief - Constructor for GameForm component
     * @param {*} props 
     */
    constructor(props)
    {
        super(props);
        this.state = {
            numRows: 3,         // Number of rows in the board
            numCols: 3,         // Number of columns in the board
            playerOne: "human", // Option selected in first player dropdown
            playerTwo: "human", // Option selected in second player dropdown
            firstPlayerChoice: true, // Option selected in first player choice checkbox
            secondPlayerChoice: true, // Option selected in second player choice checkbox
            firstPlayer:        // First player config for Game component
            {
                name: "human",  // Name of the player
                level: "",      // Level of the player if player is AI
                choice: "X",    // Which handle the player selects
            },
            secondPlayer:       // Second player config for Game component
            {
                name: "human",  // Name of the player
                level: "",      // Level of the player if player is AI
                choice: "O",    // Which handle the player selects
            }
        };

        // Function for handling number of rows required for the board
        this.handleRows = this.handleRows.bind(this);
        // Function for handling number of cols required for the board
        this.handleCols = this.handleCols.bind(this);
        // Function for handling who is the first player (human/AI)
        this.handleFirstPlayer = this.handleFirstPlayer.bind(this);
        // Function for handling who is the second player (human/AI)
        this.handleSecondPlayer = this.handleSecondPlayer.bind(this);
        // Function for handling choice of the first player
        this.handleFirstPlayerChoice = this.handleFirstPlayerChoice.bind(this);
        // Function for handling choice of the second player
        this.handleSecondPlayerChoice = this.handleSecondPlayerChoice.bind(this);
        // Function for handling submitting the form data to Game component
        this.handleSubmit = this.handleSubmit.bind(this);
        // Function for handling reset of the game
        this.handleReset = this.handleReset.bind(this);
    }

    /**
     * @brief - Function for handling number of rows required for the board
     * @param {*} event 
     */
    handleRows(event)
    {
        this.setState({numRows: event.target.value});
    }

    /**
     * @brief - Function for handling number of cols required for the board
     * @param {*} event 
     */
    handleCols(event)
    {
        this.setState({numCols: event.target.value});
    }

    /**
     * @brief - Function for handling choice of the first player
     *          The second player choice is determined from the first player's choice
     * @param {*} event 
     */
    handleFirstPlayerChoice(event)
    {
        console.log(event.target.checked);
        let firstPlayerChoice = (event.target.checked === true)? "X" : "O";
        let secondPlayerChoice = (firstPlayerChoice === "X")? "O" : "X";
        this.setState({
            firstPlayerChoice: event.target.checked,
            secondPlayerChoice: !event.target.checked,
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
     * @brief - Function for handling choice of the second player
     *          The first player choice is determined from the second player's choice
     * @param {*} event 
     */
    handleSecondPlayerChoice(event)
    {
        console.log(event.target.checked);
        let secondPlayerChoice = (event.target.checked === true)? "X" : "O";
        let firstPlayerChoice = (secondPlayerChoice === "X")? "O" : "X";
        this.setState({
            firstPlayerChoice: !event.target.checked,
            secondPlayerChoice: event.target.checked,
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
     * @brief - Function for handling who is the first player (human/AI)
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
     * @brief - Function for handling who is the second player (human/AI)
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
     * @brief - Function for handling submitting the form data to Game component
     * @param {*} event 
     */
    handleSubmit(event)
    {
        /*console.log('(Child) Number of rows in the board: ' + this.state.numRows);
        console.log('(Child) Number of cols in the board: ' + this.state.numCols);*/
        event.preventDefault();
        console.log(this.state.numRows);
        console.log(this.state.numCols);
        console.log(this.state.firstPlayer);
        console.log(this.state.secondPlayer);
        // Call game handle sent from Game component
        this.props.handleFromGame(this.state.numRows, this.state.numCols, 
                                    this.state.firstPlayer, this.state.secondPlayer);
    }

    /**
     * @brief - Function for handling reset of the game
     * @param {*} event 
     */
    handleReset(event)
    {
        // Prevent default action for button
        event.preventDefault();
        // Call the reset handle sent from Game component
        this.props.handleForReset();
    }

    /**
     * 
     */
    render()
    {
        return (
            <div className="game-form-controls">
                <form onSubmit={this.handleSubmit} className="game-form">
                    <div className="game-form-item">
                        <input type="number" value={this.state.numRows} 
                                min="3" max="20"
                                placeholder="Number of rows..." onChange={this.handleRows} />
                        <input type="number" value={this.state.numCols}
                                min="3" max="20"
                                placeholder="Number of cols..." onChange={this.handleCols} />
                    </div>
                    <div className="game-form-item">
                        <div className="game-form players">
                            <label> First Player </label>
                            <select value={this.state.playerOne}
                                    onChange={this.handleFirstPlayer}>
                                <option value="human">Human</option>
                                <option value="ai-easy">AI - Easy</option>
                            </select>
                            <input type="checkbox"
                                    checked={this.state.firstPlayerChoice}
                                    onChange={this.handleFirstPlayerChoice}>
                            </input>
                            X
                        </div>
                        <div className="game-form players">
                            <label> Second Player </label>
                            <select value={this.state.playerTwo} onChange={this.handleSecondPlayer}>
                                <option value="human">Human</option>
                                <option value="ai-easy">AI - Easy</option>
                            </select>
                            {/*<input type="checkbox"
                                    checked={this.state.secondPlayerChoice}
                                    onChange={this.handleSecondPlayerChoice}>
                            </input>
                            O*/}
                        </div>
                    </div>
                    <div className="game-form submit">
                        <button type="submit" 
                                value="Submit" 
                                className="game-form submit">
                            Submit
                        </button>
                    </div>
                </form>
                <button className="game-form reset" onClick={this.handleReset}>Reset Board</button>
            </div>
        );
    }
}


export default GameForm;