import React from 'react';
import ReactMarkdown from 'react-markdown';

const SelectedArtistMobile = ({
  artist,
  windowSize,
  setSelectedArtist,
  getThumbnailStyle,
}) => {
  if (!artist) {
    return null;
  }

  const name = `${artist.fields['First Name'] || ''} ${artist.fields['Last Name'] || ''}`.trim();
  const { Info: info } = artist.fields;

  const thumbStyle = getThumbnailStyle(true, artist);
  const viewAreaHeight = windowSize.height - 64;

  const handleReturn = () => {
    setSelectedArtist(null);
  };

  return (
    <div className="artist-selected-mobile" style={{ height: viewAreaHeight }}>
      <div className="artist-selected-return" role="button" onClick={handleReturn}>
        ← Back to Artists
      </div>
      <div className="artist-selected-inner">
        <div style={{ ...thumbStyle, height: (viewAreaHeight - 32) * 0.55 }} />
        <div className="artist-selected-info">
          <div className="artist-selected-name">{name}</div>
          {info ? (
            <ReactMarkdown linkTarget={'_blank'}>{info}</ReactMarkdown>
          ) : (
            <p>No information at this time.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedArtistMobile;
