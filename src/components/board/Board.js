import React from "react";
import Square from "./Square";

const boardRow = {
    display: "flex"
}

/**
 * @brief - Board component of the game
 */
class Board extends React.Component
{
    /**
     * @brief - Renders a square in the board
     * @param {*} rowIndex - Index of the row of the board
     * @param {*} colIndex - Index of the column of the board
     */
    renderSquare(rowIndex, colIndex)
    {
        return <Square 
                    rowIndex={rowIndex}                    // Row in which the Square is present
                    colIndex={colIndex}                    // Column in which the Square is present
                    value={this.props.squares[rowIndex][colIndex]}
                    key={"row-"+rowIndex+"-col-"+colIndex} // Key for the Square component
                    onClick={() => this.props.onClick(rowIndex, colIndex)}
                />;
    }

    /**
     * @brief - Renders a row of the game board
     * @param {*} rowNum - Refers to which board row is being rendered here
     * @param {*} numCols - Number of columns for the row in the board
     */
    renderBoardRow(rowNum, numCols)
    {
        let cols = []; // Array for pushing the columns of the board row
        for (let colIndex = 0; colIndex < numCols; colIndex++)
        {
            cols.push(this.renderSquare(rowNum, colIndex));
        }
        return (
            <div style={boardRow} key={"row"+rowNum+1}>
                {cols}
            </div>
        );
    }

    /**
     * @brief - Creates the HTML for the game board
     * @param {*} numRows - Number of rows in the board
     * @param {*} numCols - Number of columns in the board
     */
    renderBoard(numRows, numCols)
    {
        let rows = []; // Array for pushing the columns of the board row
        for (let rowIndex = 0; rowIndex < numRows; rowIndex++)
        {
            rows.push(this.renderBoardRow(rowIndex, numCols));
        }
        return (
            <div key={"board"}>
                {rows}
            </div>
        ); 
    }

    /**
     * @brief - Determines how the board component will be rendered
     */
    render()
    {
        const statusDiv =  <div className="status">{this.props.status}</div>; // Status div component
        const board = this.renderBoard(this.props.numRows, this.props.numCols); // Rendered board
        return (
            <div>
                {statusDiv}
                {board}
            </div>
        );
    }
}

export default Board;