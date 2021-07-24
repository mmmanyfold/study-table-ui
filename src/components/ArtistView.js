import React from 'react';

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

export default ArtistView;
