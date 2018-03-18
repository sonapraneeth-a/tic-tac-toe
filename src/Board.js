import React from 'react';
import './styles/css/index.css';
import Square from './Square';

class Board extends React.Component
{
    renderSquare(i)
    {
        return <Square 
                key={"square" + i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}/>;
    }

    renderBoardRow(rowNum, numCols)
    {
        var rowIndex = parseInt(rowNum, 10) * parseInt(numCols, 10);
        /* By default the variables are string and not numbers */
        var totalCols = parseInt(rowIndex, 10)+parseInt(numCols, 10);
        var cols = [];
        for (var index = rowIndex; index < totalCols; index++)
        {
            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            cols.push(this.renderSquare(index));
        }
        return (
            <div className="board-row" key={"row"+rowNum+1}>
                {cols}
            </div>
        );
    }

    renderBoard(numRows, numCols)
    {
        var rows = [];
        for (var index = 0; index < numRows; index++)
        {
            rows.push(this.renderBoardRow(index, numCols));
        }
        return (
            <div key={"board"}>
                {rows}
            </div>
        );
    }

    render()
    {
        return (
            this.renderBoard(this.props.numRows, this.props.numCols)
        );
    }
}


export default Board;