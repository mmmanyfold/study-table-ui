import React from 'react';
import ReactMarkdown from 'react-markdown';

function ArtistGrid({ data, mobile, windowSize, selectedArtist, setSelectedArtist }) {
  return (
    <>
      <div className="grid">
        {data?.map((item, i) => (
          <ArtistCard
            key={`${item.id}-${i}`}
            item={item}
            mobile={mobile}
            selectedArtist={selectedArtist}
            setSelectedArtist={setSelectedArtist}
          />
        ))}
        {!data.length && (
          <div className="no-results">No artists match your criteria.</div>
        )}
      </div>
      <ArtistViewMobile
        artist={selectedArtist}
        setSelectedArtist={setSelectedArtist}
        windowSize={windowSize}
      />
    </>
  );
}

export default ArtistGrid;

const ArtistCard = ({ item, mobile, selectedArtist, setSelectedArtist }) => {
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

  const { Name: name, Info: info, Tags: tags } = item.fields;

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

const ArtistViewMobile = ({ artist, windowSize, setSelectedArtist }) => {
  if (!artist) {
    return null;
  }

  const { Name: name, Info: info } = artist.fields;

  const thumbStyle = getThumbnailStyle(true, artist);
  const viewAreaHeight = windowSize.height - 163;

  const handleReturn = () => {
    setSelectedArtist(null);
  };

  return (
    <div className="artist-mobile-view" style={{ height: viewAreaHeight }}>
      <div className="artist-mobile-return" role="button" onClick={handleReturn}>
        ← Back to Artists
      </div>
      <div className="artist-mobile-card">
        <div style={{ ...thumbStyle, height: (viewAreaHeight - 32) * 0.5 }} />
        <div className="artist-mobile-info">
          <div className="artist-mobile-name">{name}</div>
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

const getThumbnailStyle = (showImage, item) => {
  if (!showImage) {
    return null;
  }
  const images = item?.fields?.Image;
  if (!images?.length) {
    return {
      backgroundColor: '#f8f8f8',
    };
  }
  const url = images[0].thumbnails.large.url;
  return {
    backgroundImage: `url(${url})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
};
