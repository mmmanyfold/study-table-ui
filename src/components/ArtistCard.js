import React from 'react';
import ReactMarkdown from 'react-markdown';

const ArtistCard = ({
  item,
  mobile,
  selectedArtist,
  setSelectedArtist,
  getThumbnailStyle,
}) => {
  const isSelected = selectedArtist?.id === item.id;

  const handleSelect = () => {
    setSelectedArtist(item);
  };

  const handleReturn = (e) => {
    e.stopPropagation();
    setSelectedArtist(null);
  };

  const showImage = mobile || !isSelected;
  const thumbStyle = getThumbnailStyle(showImage, item);

  const name = `${item.fields['First Name'] || ''} ${item.fields['Last Name'] || ''}`.trim();
  const { Info: info, Tags: tags } = item.fields;

  return (
    <div className="grid-item">
      <div
        onClick={handleSelect}
        className={`artist-card ${isSelected ? 'selected' : ''}`}
      >
        <div style={{ position: 'relative' }}>
          <div className="artist-thumb" style={thumbStyle}>
            {isSelected && !mobile && (
              <div className="artist-info">
                {info ? (
                  <ReactMarkdown linkTarget={'_blank'}>{info}</ReactMarkdown>
                ) : (
                  <p>No information at this time.</p>
                )}
              </div>
            )}
          </div>
          {isSelected && !mobile && (
            <div role="button" onClick={handleReturn} className="artist-return-btn">
              ←
            </div>
          )}
        </div>
        <div className="artist-heading">
          <div className="artist-name">{name}</div>
          <div className="artist-tags" tabIndex="0">
            {tags?.map((tag, i) => (
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

export default ArtistCard;
