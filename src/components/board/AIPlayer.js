export function AIMove(currentPlayer, board, difficultyLevel)
{
    let move = null;
    switch(difficultyLevel)
    {
        case "easy":
            move = EasyMove(currentPlayer, board);
            break;
        case "difficult":
            move = DifficultMove(currentPlayer, board);
            break;
        default:
            move = EasyMove(currentPlayer, board);
            break;
    }
    return move;
}

function EasyMove(currentPlayer, board)
{
    let numRows = board.length;
    let numCols = board[0].length;
    let emptySquares = [];
    for(let rowIndex = 0; rowIndex < numRows; rowIndex++)
    {
        for(let colIndex = 0; colIndex < numCols; colIndex++)
        {
            if(board[rowIndex][colIndex] === null)
            {
                emptySquares.push([rowIndex, colIndex]);
            }
        }
    }
    let totalEmptySquares = emptySquares.length;
    let move = Math.floor(Math.random() * totalEmptySquares)
    return emptySquares[move];
}

function DifficultMove(currentPlayer, board)
{
    return 1;
}