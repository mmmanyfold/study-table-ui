import React, { useState } from 'react';

function ArtistGrid({ data, visible, mobile }) {
  return (
    <div className="grid-scrollview" style={!visible ? { display: 'none' } : null}>
      <div className="grid">
        {data.map((item) => (
          <ArtistCard key={item.id} item={item} mobile={mobile} />
        ))}
        {!data.length && (
          <div className="no-results">No artists match your criteria.</div>
        )}
      </div>
    </div>
  );
}

export default ArtistGrid;

const ArtistCard = ({ item, mobile }) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    setSelected(item);
  };

  const handleReturn = (e) => {
    e.stopPropagation();
    setSelected(null);
  };

  const thumbStyle = getThumbnailStyle(mobile, selected, item.image);

  return (
    <div className="grid-item">
      <div
        className="artist-card"
        onClick={handleSelect}
        style={{ borderColor: selected ? '#000' : '#bbb' }}
      >
        <div style={{ position: 'relative' }}>
          <div className="artist-thumb" style={thumbStyle}>
            {selected && !mobile && <div className="artist-info">ABOUT THE ARTIST</div>}
          </div>
          {selected && !mobile && (
            <div role="button" onClick={handleReturn} className="artist-return-btn">
              ←
            </div>
          )}
        </div>
        <div className="artist-heading">
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
  );
};

const getThumbnailStyle = (mobile, selected, image) => {
  if (!mobile && selected) {
    return null;
  }
  return {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
};
