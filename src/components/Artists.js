import React from 'react';

const Artists = ({ data, visible }) => {
  return (
    <div className="grid" style={!visible ? { display: 'none' } : null}>
      {data.map((item) => (
        <div key={item.id} className="grid-item">
          <div className="artist-card">
            <div
              className="artist-image"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            <div className="artist-name">{item.name}</div>
          </div>
        </div>
      ))}
      {!data.length && <div className="no-results">No artists match your criteria.</div>}
    </div>
  );
};

export default Artists;
