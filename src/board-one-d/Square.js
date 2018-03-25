import React from 'react';
import '../styles/css/index.css';

const pointer = { cursor: "pointer" };

class Square extends React.Component
{
    render()
    {
        if(this.props.highlight === true)
        {
            return (
                <p style={pointer} className="square square-highlight" onClick={() => this.props.onClick()}>
                    {this.props.value}
                </p>
            );
        }
        else
        {
            return (
                <p style={pointer} className="square" onClick={() => this.props.onClick()}>
                    {this.props.value}
                </p>
            );
        }
    }
}

export default Square;