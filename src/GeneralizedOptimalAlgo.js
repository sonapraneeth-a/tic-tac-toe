export function GeneralBoardOptimizedAlgo(current_player, aux_current, aux_win_current, 
                                            aux_count_current, num_rows, num_cols, clicked_button, 
                                            config_required)
{
    let current_possible_winner = "UD";
    let actual_winner = null;
    let actual_winner_config = null;
    let winner_found = false;
    const win_row = Math.floor(parseInt(clicked_button, 10)/parseInt(num_cols, 10));
    const win_col = num_rows + Math.floor(parseInt(clicked_button, 10)%parseInt(num_cols, 10));
    if(aux_win_current[win_row] === "UD")
    {
        aux_win_current[win_row] = current_player;
        aux_count_current[win_row] = 1;
        current_possible_winner = current_player;
    }
    else if(aux_win_current[win_row] !== current_player)
    {
        aux_win_current[win_row] = "NP";
        aux_count_current[win_row] = 0;
        current_possible_winner = "NP";
    }
    else if(aux_win_current[win_row] === current_player)
    {
        aux_count_current[win_row] = parseInt(aux_count_current[win_row], 10) + 1;
        current_possible_winner = current_player;
        if(aux_count_current[win_row] === num_cols)
        {
            winner_found = true;
            actual_winner = current_player;
            actual_winner_config = [];
            for(let index = 0; index < num_cols; index++)
            {
                actual_winner_config.push(win_row*num_cols + index)
            }
        }
    }
    if(!winner_found)
    {
        if(aux_win_current[win_col] === "UD")
        {
            aux_win_current[win_col] = current_player;
            aux_count_current[win_col] = 1;
            current_possible_winner = current_player;
        }
        else if(aux_win_current[win_col] !== current_player)
        {
            aux_win_current[win_col] = "NP";
            aux_count_current[win_col] = 0;
            current_possible_winner = "NP";
        }
        else if(aux_win_current[win_col] === current_player)
        {
            aux_count_current[win_col] = parseInt(aux_count_current[win_col], 10) + 1;
            current_possible_winner = current_player;
            if(aux_count_current[win_col] === num_rows)
            {
                winner_found = true;
                actual_winner = current_player;
                actual_winner_config = [];
                for(let index = (win_col-num_rows); index < num_rows*num_cols; index+=num_cols)
                {
                    actual_winner_config.push(index);
                }
            }
        }
    }
    if(num_rows === num_cols)
    {
        const diag_one = num_rows + num_cols;
        const diag_two = num_rows + num_cols + 1;
        let diag_one_true = false;
        let diag_two_true = false;
        if(win_row === win_col - num_cols)
        {
            diag_one_true = true;
        }
        if (win_row + win_col - num_cols === num_cols - 1)
        {
            diag_two_true = true;
        }
        if(!winner_found && diag_one_true === true)
        {
            if(aux_win_current[diag_one] === "UD")
            {
                aux_win_current[diag_one] = current_player;
                aux_count_current[diag_one] = 1;
                current_possible_winner = current_player;
            }
            else if(aux_win_current[diag_one] !== current_player)
            {
                aux_win_current[diag_one] = "NP";
                aux_count_current[diag_one] = 0;
                current_possible_winner = "NP";
            }
            else if(aux_win_current[diag_one] === current_player)
            {
                aux_count_current[diag_one] = parseInt(aux_count_current[diag_one], 10) + 1;
                current_possible_winner = current_player;
                actual_winner_config = [];
                if(aux_count_current[diag_one] === num_cols)
                {
                    actual_winner = current_player;
                    actual_winner_config = [];
                    for(let index = 0; index < num_cols; index++)
                    {
                        actual_winner_config.push((num_cols+1)*index);
                    }
                }
            }
        }
        if(!winner_found && diag_two_true === true)
        {
            if(aux_win_current[diag_two] === "UD")
            {
                aux_win_current[diag_two] = current_player;
                aux_count_current[diag_two] = 1;
                current_possible_winner = current_player;
            }
            else if(aux_win_current[diag_two] !== current_player)
            {
                aux_win_current[diag_two] = "NP";
                aux_count_current[diag_two] = 0;
                current_possible_winner = "NP";
            }
            else if(aux_win_current[diag_two] === current_player)
            {
                aux_count_current[diag_two] = parseInt(aux_count_current[diag_two], 10) + 1;
                current_possible_winner = current_player;
                if(aux_count_current[diag_two] === num_cols)
                {
                    actual_winner = current_player;
                    actual_winner_config = [];
                    for(let index = 1; index <= num_cols; index++)
                    {
                        actual_winner_config.push((num_cols-1)*index);
                    }
                }
            }
        }
    }
    return [actual_winner, actual_winner_config, aux_win_current, aux_count_current, current_possible_winner];
}