export function GeneralBoardNaiveAlgo(squares, config, config_required)
{
    // var t0 = performance.now(), t1;
    const num_rows = parseInt(config.num_rows, 10);
    const num_cols = parseInt(config.num_cols, 10);
    var winnerFound = true;
    for(let rowIndex = 0; rowIndex < num_rows; rowIndex++)
    {
        winnerFound = true;
        for(let colIndex = 1; colIndex < num_cols; colIndex++)
        {
            if(squares[rowIndex*num_cols] !== squares[(rowIndex*num_cols) + colIndex])
            {
                winnerFound = false; break;
            }
        }
        if(winnerFound === true && squares[rowIndex*num_cols] !== null)
        {
            if(config_required === "yes")
            {
                let win_config = [];
                win_config.push(rowIndex*num_cols);
                for(let colIndex = 1; colIndex < num_cols; colIndex++)
                { win_config.push((rowIndex*num_cols) + colIndex); }
                console.log(win_config);
                /*t1 = performance.now();
                console.log("Call to GeneralBoardNaiveAlgo took " + (t1 - t0) + " milliseconds.")*/
                return [squares[rowIndex*num_cols], win_config];
            }
            else
            {
                /*t1 = performance.now();
                console.log("Call to GeneralBoardNaiveAlgo took " + (t1 - t0) + " milliseconds.")*/
                return [squares[rowIndex*num_cols]];
            }
        }
    }
    for(let colIndex = 0; colIndex < num_cols; colIndex++)
    {
        winnerFound = true;
        for(let rowIndex = 1; rowIndex < num_rows; rowIndex++)
        {
            if(squares[colIndex] !== squares[colIndex + (rowIndex*num_rows)])
            {
                winnerFound = false; break;
            }
        }
        if(winnerFound === true && squares[colIndex] !== null)
        {
            if(config_required === "yes")
            {
                let win_config = [];
                win_config.push(colIndex);
                for(let rowIndex = 1; rowIndex < num_rows; rowIndex++)
                { win_config.push(colIndex + (rowIndex*num_rows)); }
                /*t1 = performance.now();
                console.log("Call to GeneralBoardNaiveAlgo took " + (t1 - t0) + " milliseconds.")*/
                return [squares[colIndex], win_config];
            }
            else
            {
                /*t1 = performance.now();
                console.log("Call to GeneralBoardNaiveAlgo took " + (t1 - t0) + " milliseconds.")*/
                return [squares[colIndex]];
            }
        }
    }
    if(num_rows === num_cols)
    {
        let index = 0;
        winnerFound = true;
        while(index < (num_cols*num_cols-num_cols))
        {
            if(squares[0] !== squares[index+num_cols+1])
            {
                winnerFound = false; break;
            }
            index = index + num_cols + 1;
        }
        if(winnerFound === true && squares[0] !== null)
        {
            if(config_required === "yes")
            {
                index = 0;
                let win_config = [];
                win_config.push(0);
                while(index < (num_cols*num_cols-num_cols))
                { win_config.push(index+num_cols+1); index = index+num_cols+1; }
                /*t1 = performance.now();
                console.log("Call to GeneralBoardNaiveAlgo took " + (t1 - t0) + " milliseconds.")*/
                return [squares[0], win_config];
            }
            else
            {
                /*t1 = performance.now();
                console.log("Call to GeneralBoardNaiveAlgo took " + (t1 - t0) + " milliseconds.")*/
                return [squares[0]];
            }
        }
        winnerFound = true;
        index = num_cols - 1;
        while(index < (num_cols*num_cols-num_cols))
        {
            if(squares[num_cols - 1] !== squares[index+num_cols-1])
            {
                winnerFound = false; break;
            }
            index = index + num_cols - 1;
        }
        if(winnerFound === true && squares[num_cols-1])
        {
            if(config_required === "yes")
            {
                index = 0;
                let win_config = [];
                win_config.push(num_cols-1);
                while(index < (num_cols*num_cols-num_cols))
                { win_config.push(index+num_cols-1); index = index+num_cols-1; }
                /*t1 = performance.now();
                console.log("Call to GeneralBoardNaiveAlgo took " + (t1 - t0) + " milliseconds.")*/
                return [squares[num_cols - 1], win_config];
            }
            else
            {
                /*t1 = performance.now();
                console.log("Call to GeneralBoardNaiveAlgo took " + (t1 - t0) + " milliseconds.")*/
                return [squares[num_cols-1]];
            }
        }
    }
    if(config_required === "yes")
    {
        /*t1 = performance.now();
        console.log("Call to GeneralBoardNaiveAlgo took " + (t1 - t0) + " milliseconds.")*/
        return [null, null];
    }
    else
    {
        /*t1 = performance.now();
        console.log("Call to GeneralBoardNaiveAlgo took " + (t1 - t0) + " milliseconds.")*/
        return [null];
    }
}

