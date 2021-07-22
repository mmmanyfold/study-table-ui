import React from 'react';

const Artists = ({ data, visible }) => {
  return (
    <div className="grid-scrollview" style={!visible ? { display: 'none' } : null}>
      <div className="grid">
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
              <div className="artist-info">
                <div className="artist-name">{item.name}</div>
                <div className="artist-tags">
                  {item.tags.map((tag, i) => (
                    <div key={`${tag}-${i}`} className="artist-tag">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        {!data.length && (
          <div className="no-results">No artists match your criteria.</div>
        )}
      </div>
    </div>
  );
};

export default Artists;
