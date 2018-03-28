import React from "react";
import "../styles/css/index.css";

/**
 * @brief Square component of the board
 */
class Square extends React.Component
{
    /**
     * @brief Determines how the square in the board should be rendered
     */
    render()
    {
      return (
        <button 
            className="square"
            onClick={() => this.props.onClick()}
        >
            {this.props.value}
        </button>
      );
    }
}

export default Square;