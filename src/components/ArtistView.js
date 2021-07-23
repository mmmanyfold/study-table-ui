import React from 'react';

function ArtistView({ artist }) {
  if (!artist) {
    return null;
  }
  return (
    <div>
      <div>{artist.name}</div>
      <div>{artist.img}</div>
      <div>{artist.info}</div>
      <div>{artist.tags}</div>
    </div>
  );
}

export default ArtistView;
