import React from 'react';
import '../styles/css/index.css';

/**
 * 
 */
class Square extends React.Component
{
    /**
     * 
     */
    render()
    {
      return (
        <button className="square">
            ({this.props.rowIndex}, {this.props.colIndex})
        </button>
      );
    }
}

export default Square;