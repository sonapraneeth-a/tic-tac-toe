import React from 'react';
import './styles/css/index.css';
import Square from './Square';

class Board extends React.Component
{
    renderSquare(i)
    {
        if(this.props.win_config !== null && this.props.win_config.indexOf(i) !== -1)
        {
            return <Square 
                    key={"square" + i}
                    value={this.props.squares[i]}
                    highlight={true}
                    onClick={() => this.props.onClick(i)}/>;
        }
        else
        {
            return <Square 
                    key={"square" + i}
                    value={this.props.squares[i]}
                    highlight={false}
                    onClick={() => this.props.onClick(i)}/>;
        }
    }

    test(i)
    {
        if(this.props.win_config !== null && this.props.win_config.indexOf(i) !== -1)
        {console.log("Highlight");}
    }

    renderBoardRow(rowNum, num_cols)
    {
        var rowIndex = parseInt(rowNum, 10) * parseInt(num_cols, 10);
        /* By default the variables are string and not numbers */
        var totalCols = parseInt(rowIndex, 10)+parseInt(num_cols, 10);
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

    renderBoard(num_rows, num_cols)
    {
        var rows = [];
        for (var index = 0; index < num_rows; index++)
        {
            rows.push(this.renderBoardRow(index, num_cols));
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
            this.renderBoard(this.props.num_rows, this.props.num_cols)
        );
    }
}


export default Board;