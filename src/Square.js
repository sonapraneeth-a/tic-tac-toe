import React from 'react';
import './styles/css/index.css';

const pointer = { cursor: "pointer" };

class Square extends React.Component
{
    render()
    {
        return (
            <p style={pointer} className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </p>
        );
    }
}

export default Square;