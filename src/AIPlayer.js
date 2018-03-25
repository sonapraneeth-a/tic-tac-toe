export function AIMove(current_player, board, difficult_level)
{
    let move = null;
    switch(difficult_level)
    {
        case "easy":
            move = EasyMove(current_player, board);
            break;
        case "difficult":
            move = DifficultMove(current_player, board);
            break;
        default:
            move = EasyMove(current_player, board);
            break;
    }
    return move;
}

function EasyMove(current_player, board)
{
    let num_squares = board.length;
    let non_empty_squares = [];
    for(let index = 0; index < num_squares; index++)
    {
        if(board[index] === null) {non_empty_squares.push(index);}
    }
    let total_non_empty_squares = non_empty_squares.length;
    let move = Math.floor(Math.random() * total_non_empty_squares)
    return non_empty_squares[move];
}

function DifficultMove(current_player, board)
{
    var num_squares = board.length;
}