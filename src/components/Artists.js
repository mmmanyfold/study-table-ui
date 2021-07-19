import React, { useState } from 'react';

const Artists = (props) => {
    return (
        <div className="artists">
            {props.data.map(item => (
                <div key={item.id}>
                    {item.name}
                </div>
            ))}
        </div>
    )
}

export default Artists