import React, { useState } from 'react';

function Artists({ data, visible, windowSize, mobile }) {
  const [selectedArtist, setSelectedArtist] = useState(null);

  const handleClick = (item) => {
    setSelectedArtist(selectedArtist?.id === item.id ? null : item);
  };

  // TODO add close button
  const onReturn = () => {
    setSelectedArtist(null);
  };

  const imageBgStyle = (img, isSelected) => {
    if (!mobile && isSelected) {
      return null;
    }
    return {
      backgroundImage: `url(${img})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  };

  const ArtistCard = ({ item }) => {
    const isSelected = selectedArtist?.id === item.id;
    return (
      <div className="grid-item">
        <div
          className="artist-card"
          onClick={() => handleClick(item)}
          style={{ borderColor: isSelected ? '#000' : '#bbb' }}
        >
          <div className="artist-thumb" style={imageBgStyle(item.image, isSelected)}>
            {isSelected && !mobile && <div>HELLO </div>}
          </div>
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
    );
  };

  return (
    <div className="grid-scrollview" style={!visible ? { display: 'none' } : null}>
      <div className="grid">
        {data.map((item) => (
          <ArtistCard key={item.id} item={item} />
        ))}
        {!data.length && (
          <div className="no-results">No artists match your criteria.</div>
        )}
        {/* <ArtistView
          artist={selectedArtist}
          onReturn={onReturn}
          windowSize={windowSize}
          mobile={mobile}
        /> */}
      </div>
    </div>
  );
}

export default Artists;

// function ArtistView({ artist, onReturn, windowSize, mobile }) {
//   if (!artist) {
//     return null;
//   }
//   return (
//     <div
//       className="grid-item selected"
//       style={{ width: mobile ? '100%' : windowSize.width - 248 }}
//     >
//       <div className="artist-card selected" onClick={onReturn}>
//         <div>{artist.name}</div>
//         <div>{artist.img}</div>
//         <div>{artist.info}</div>
//         <div>{artist.tags}</div>
//       </div>
//     </div>
//   );
// }
