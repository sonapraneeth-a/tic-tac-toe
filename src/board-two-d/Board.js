import React from 'react';
import '../styles/css/index.css';
import Square from './Square';

class Board extends React.Component
{
    renderSquare(rowIndex, colIndex)
    {
        console.log("renderSquare");
        console.log(this.props.squares);
        if(this.props.winnerConfig !== null && this.props.winnerConfig !== -1)
        {
            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            return <Square 
                        key={"square--" + rowIndex + "-" + colIndex}
                        value={this.props.squares[rowIndex][colIndex]}
                        highlight={true}
                        onClick={() => this.props.onClick(rowIndex, colIndex)}/>;
        }
        else
        {
            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            return <Square 
                        key={"square--" + rowIndex + "-" + colIndex}
                        value={this.props.squares[rowIndex][colIndex]}
                        highlight={false}
                        onClick={() => this.props.onClick(rowIndex, colIndex)}/>;
        }
    }

    renderBoardRow(rowNum, numCols)
    {
        let cols = [];
        for (let colIndex = 0; colIndex < numCols; colIndex++)
        {
            cols.push(this.renderSquare(rowNum, colIndex));
        }
        return (
            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            <div className="board-row" key={"row"+rowNum+1}>
                {cols}
            </div>
        );
    }

    renderBoard(numRows, numCols)
    {
        let rows = [];
        for (let rowIndex = 0; rowIndex < numRows; rowIndex++)
        {
            rows.push(this.renderBoardRow(rowIndex, numCols));
        }
        console.log("Rows: " + {rows});
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