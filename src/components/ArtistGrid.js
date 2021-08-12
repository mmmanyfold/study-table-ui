import React from 'react';
import ArtistCard from './ArtistCard';
import SelectedArtistMobile from './SelectedArtistMobile';

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
            getThumbnailStyle={getThumbnailStyle}
          />
        ))}
        {!data.length && (
          <div className="no-results">No artists match your criteria.</div>
        )}
      </div>
      <div className="site-description">
        <div>
          This tagged directory of sculptors was developed by Gordon Hall as an open
          resource. To suggest an artist or an edit, please email{' '}
          <a
            href="mailto:gordonhall@vassar.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            gordonhall@vassar.edu
          </a>
          .
          <br />
          Website by{' '}
          <a href="https://mmmanyfold.com" target="_blank" rel="noopener noreferrer">
            mmmanyfold
          </a>
          .
        </div>
      </div>
      {mobile && (
        <SelectedArtistMobile
          artist={selectedArtist}
          setSelectedArtist={setSelectedArtist}
          windowSize={windowSize}
          getThumbnailStyle={getThumbnailStyle}
        />
      )}
    </>
  );
}

export default ArtistGrid;

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
