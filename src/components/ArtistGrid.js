import React, { useState } from 'react';

function ArtistGrid({ data, visible, mobile }) {
  return (
    <div className="grid-scrollview" style={!visible ? { display: 'none' } : null}>
      <div className="grid">
        {data?.map((item) => (
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

  const thumbStyle = getThumbnailStyle(mobile, selected, item);

  return (
    <div className="grid-item">
      <div onClick={handleSelect} className={`artist-card ${selected ? 'selected' : ''}`}>
        <div style={{ position: 'relative' }}>
          <div className="artist-thumb" style={thumbStyle}>
            {selected && !mobile && (
              <div className="artist-info">{item.fields?.Info}</div>
            )}
          </div>
          {selected && !mobile && (
            <div role="button" onClick={handleReturn} className="artist-return-btn">
              ←
            </div>
          )}
        </div>
        <div className="artist-heading">
          <div className="artist-name">{item.fields?.Name}</div>
          <div className="artist-tags">
            {item.fields?.Tags?.map((tag, i) => (
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

const getThumbnailStyle = (mobile, selected, item) => {
  if (!mobile && selected) {
    return null;
  }
  const images = item?.fields?.Image;
  if (!images?.length) {
    return null;
  }
  const url = images[0].thumbnails.large.url;
  return {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
};
