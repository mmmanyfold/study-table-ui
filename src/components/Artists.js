import React from 'react';

const Artists = ({ data, visible }) => {
  return (
    <div className="grid" style={!visible ? { display: 'none' } : null}>
      {data.map((item) => (
        <div key={item.id} className="grid-item">
          <div className="artist-card">{item.name}</div>
        </div>
      ))}
      {!data.length && <div className="no-results">No artists match your criteria.</div>}
    </div>
  );
};

export default Artists;
