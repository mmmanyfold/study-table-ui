import React, { useState } from 'react';

function Artists({ data, visible, windowSize, mobile }) {
  const [selected, setSelected] = useState(null);

  const handleClick = (item) => {
    setSelected(selected?.id === item.id ? null : item);
  };

  const onReturn = () => {
    setSelected(null);
  };

  return (
    <div className="grid-scrollview" style={!visible ? { display: 'none' } : null}>
      <div className="grid">
        {data.map((item) => (
          <div key={item.id} className="grid-item">
            <div className="artist-card" onClick={() => handleClick(item)}>
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
        <ArtistView
          artist={selected}
          onReturn={onReturn}
          windowSize={windowSize}
          mobile={mobile}
        />
      </div>
    </div>
  );
}

export default Artists;

function ArtistView({ artist, onReturn, windowSize, mobile }) {
  if (!artist) {
    return null;
  }
  return (
    <div
      className="grid-item selected"
      style={{ width: mobile ? '100%' : windowSize.width - 248 }}
    >
      <div className="artist-card selected" onClick={onReturn}>
        <div>{artist.name}</div>
        <div>{artist.img}</div>
        <div>{artist.info}</div>
        <div>{artist.tags}</div>
      </div>
    </div>
  );
}
