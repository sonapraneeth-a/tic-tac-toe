export function GeneralBoardAlgo(squares)
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
    console.log("Row");
    console.log(squares);
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
            if(character !== squares[rowIndex][colIndex])
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
    console.log(winner);
    console.log(winnerConfig);
    return [winner, winnerConfig];
}

function checkCols(squares)
{
    console.log("Col");
    console.log(squares);
    let numRows = squares.length;
    let numCols = squares[0].length;
    let winner = null;
    let winnerConfig = null;
    for(let colIndex = 0; colIndex < numCols; colIndex++)
    {
        let character = squares[colIndex][0];
        let winnerFound = true;
        for(let rowIndex = 0; rowIndex < numRows; rowIndex++)
        {
            if(character !== squares[rowIndex][colIndex])
            {
                winnerFound = false; break;
            }
        }
        if(winnerFound)
        {
            winnerConfig = [];
            winner = squares[colIndex][0];
            for(let rowIndex = 0; rowIndex < numRows; rowIndex++)
            {
                winnerConfig.push([rowIndex,colIndex]);
            }
            break;
        }
    }
    console.log(winner);
    console.log(winnerConfig);
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
            if(character !== squares[index][index])
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
            character = squares[numRows][0];
            winnerFound = true;
            for(let index = 1; index < numRows; index++)
            {
                if(character !== squares[numRows-index][index])
                {
                    winnerFound = false; break;
                }
            }
            if(winnerFound)
            {
                winnerConfig = [];
                winner = squares[numRows][0];
                for(let index = 0; index < numRows; index++)
                {
                    winnerConfig.push([numRows-index,index]);
                }
            }
        }
    }
    console.log("Diag");
    console.log(winner);
    console.log(winnerConfig);
    return [winner, winnerConfig];
}
