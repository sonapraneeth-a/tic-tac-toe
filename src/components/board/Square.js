import React from "react";

const square = {
    width: "3rem",
    height: "3rem",
    fontSize: "3rem",
    padding: "0.5rem",
    lineHeight: "3rem",
    border: "1px solid black"
}

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
        <div 
            style={square}
            onClick={() => this.props.onClick()}
        >
            {this.props.value}
        </div>
      );
    }
}

export default Square;