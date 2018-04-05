export function CalculateWinner(squares)
{
    let solution = null;
    solution = checkRows(squares);
    if(solution[0] === null)
    {
        solution = checkCols(squares);
        if(solution[0] === null)
        {
            solution = checkDiags(squares);
        }
    }
    return solution;
}

function checkRows(squares)
{
    let numRows = squares.length;
    let numCols = squares[0].length;
    let winner = null;
    let winnerConfig = null;
    for(let rowIndex = 0; rowIndex < numRows; rowIndex++)
    {
        let character = squares[rowIndex][0];
        let winnerFound = true;
        for(let colIndex = 0; colIndex < numCols; colIndex++)
        {
            if(character === null)
            {
                winnerFound = false; break;
            }
            else if(character !== squares[rowIndex][colIndex])
            {
                winnerFound = false; break;
            }
        }
        if(winnerFound)
        {
            winnerConfig = [];
            winner = squares[rowIndex][0];
            for(let colIndex = 0; colIndex < numCols; colIndex++)
            {
                winnerConfig.push([rowIndex,colIndex]);
            }
            break;
        }
    }
    return [winner, winnerConfig];
}

function checkCols(squares)
{
    let numRows = squares.length;
    let numCols = squares[0].length;
    let winner = null;
    let winnerConfig = null;
    for(let colIndex = 0; colIndex < numCols; colIndex++)
    {
        let character = squares[0][colIndex];
        let winnerFound = true;
        for(let rowIndex = 0; rowIndex < numRows; rowIndex++)
        {
            if(character === null)
            {
                winnerFound = false; break;
            }
            else if(character !== squares[rowIndex][colIndex])
            {
                winnerFound = false; break;
            }
        }
        if(winnerFound)
        {
            winnerConfig = [];
            winner = squares[0][colIndex];
            for(let rowIndex = 0; rowIndex < numRows; rowIndex++)
            {
                winnerConfig.push([rowIndex,colIndex]);
            }
            break;
        }
    }
    return [winner, winnerConfig];
}

function checkDiags(squares)
{
    let numRows = squares.length;
    let numCols = squares[0].length;
    let winner = null;
    let winnerConfig = null;
    if(numRows === numCols)
    {
        let character = squares[0][0];
        let winnerFound = true;
        for(let index = 1; index < numRows; index++)
        {
            if(character === null)
            {
                winnerFound = false; break;
            }
            else if(character !== squares[index][index])
            {
                winnerFound = false; break;
            }
        }
        if(winnerFound)
        {
            winnerConfig = [];
            winner = squares[0][0];
            for(let index = 0; index < numRows; index++)
            {
                winnerConfig.push([index,index]);
            }
        }
        else
        {
            character = squares[numRows-1][0];
            winnerFound = true;
            for(let index = 1; index < numRows; index++)
            {
                if(character === null)
                {
                    winnerFound = false; break;
                }
                if(character !== squares[numRows-index-1][index])
                {
                    winnerFound = false; break;
                }
            }
            if(winnerFound)
            {
                winnerConfig = [];
                winner = squares[numRows-1][0];
                for(let index = 0; index < numRows; index++)
                {
                    winnerConfig.push([numRows-index,index]);
                }
            }
        }
    }
    return [winner, winnerConfig];
}