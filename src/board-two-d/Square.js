import React from 'react';
import '../styles/css/index.css';

class Square extends React.Component
{
    render()
    {
        if(this.props.highlight === true)
        {
            console.log("No highlight square");
            console.log(this.props.value);
            return (
                <p className="square square-highlight" onClick={() => this.props.onClick()}>
                    {this.props.value}
                </p>
            );
        }
        else
        {
            console.log("No highlight square");
            console.log(this.props.value);
            return (
                <p className="square" onClick={() => this.props.onClick()}>
                    {this.props.value}
                </p>
            );
        }
    }
}

export default Square;