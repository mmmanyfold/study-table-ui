import React from 'react';

const Artists = (props) => {
  return (
    <div className="grid" style={!props.visible ? { display: 'none' } : null}>
      {props.data.map((item) => (
        <div key={item.id} className="grid-item">
          <div className="artist-card">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Artists;
