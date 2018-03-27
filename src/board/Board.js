import React from "react";
import Square from "./Square";
import "../styles/css/index.css";

/**
 * 
 */
class Board extends React.Component
{
    /**
     * 
     * @param {*} i 
     */
    renderSquare(rowIndex, colIndex)
    {
        return <Square rowIndex={rowIndex} colIndex={colIndex} />;
    }

    /**
     * 
     */
    render()
    {
        const status = "Next player: X";
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0, 0)}
                    {this.renderSquare(0, 1)}
                    {this.renderSquare(0, 2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(1, 0)}
                    {this.renderSquare(1, 1)}
                    {this.renderSquare(1, 2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(2, 0)}
                    {this.renderSquare(2, 1)}
                    {this.renderSquare(2, 2)}
                </div>
            </div>
        );
    }
}

export default Board;