import React, { useEffect, useState } from 'react';
import useWindowSize from './hooks/useWindowSize';
import './App.css';
import Artists from './components/Artists';
import Filters from './components/Filters';

const MOBILE_BREAK = 800;

function App() {
  const [artists, setArtists] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [tags, setTags] = useState([]);

  const windowSize = useWindowSize();
  const mobile = windowSize.width <= MOBILE_BREAK;
  const [showFilters, setShowFilters] = useState(!mobile);
  const showArtists = !mobile || !showFilters;

  useEffect(() => {
    setArtists(tempArtists);
    setTags(tempTags);
    setFiltered(tempArtists);
  }, [artists, tags]);

  useEffect(() => {
    setShowFilters(windowSize.width > MOBILE_BREAK);
  }, [windowSize]);

  const artistsByTag = tags.reduce((ret, t) => {
    const tagArtists = artists.filter((a) => a.tags?.includes(t.name));
    return { ...ret, [t.name]: tagArtists };
  }, {});

  const onFilter = (selectedTags) => {
    if (!selectedTags.length) {
      setFiltered(artists);
      return;
    }
    const filteredArtists = Object.values(
      selectedTags.reduce((ret, t) => {
        artistsByTag[t.name].forEach((artist) => {
          ret[artist.id] = artist;
        });
        return ret;
      }, {})
    );
    setFiltered(filteredArtists);
  };

  return (
    <div className="app">
      {mobile && (
        <div
          className="mobile-filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </div>
      )}
      <div className="search-bar">Search</div>
      <div className="main">
        <Filters data={tags} onFilter={onFilter} visible={showFilters} />
        <Artists data={filtered} visible={showArtists} />
      </div>
    </div>
  );
}

export default App;

const tempTags = [
  { id: 1, name: 'Performance' },
  { id: 2, name: 'Sculpture' },
  { id: 3, name: 'Drawing' },
  { id: 4, name: 'Painting' },
  { id: 5, name: '1980s' },
  { id: 6, name: 'Performance' },
  { id: 7, name: 'Sculpture' },
  { id: 8, name: 'Drawing' },
  { id: 9, name: 'Painting' },
  { id: 10, name: '1980s' },
  { id: 11, name: 'Performance' },
  { id: 12, name: 'Sculpture' },
  { id: 13, name: 'Drawing' },
  { id: 14, name: 'Painting' },
  { id: 15, name: '1980s' },
];

const tempArtists = [
  { id: 1, name: 'Maia Ruth Lee', tags: ['Performance', 'Sculpture'] },
  { id: 2, name: 'Anne Wu', tags: ['Sculpture'] },
  { id: 3, name: 'Kenneth Tam', tags: ['Performance'] },
  { id: 4, name: 'Adam Milner', tags: ['Painting', 'Sculpture'] },
  { id: 5, name: 'Lauren Mackler', tags: ['Drawing', '1980s', 'Performance'] },
  { id: 6, name: 'Maia Ruth Lee', tags: ['Performance', 'Sculpture'] },
  { id: 7, name: 'Anne Wu', tags: ['Sculpture'] },
  { id: 8, name: 'Kenneth Tam', tags: ['Performance'] },
  { id: 9, name: 'Adam Milner', tags: ['Painting', 'Sculpture'] },
  { id: 10, name: 'Lauren Mackler', tags: ['Drawing', '1980s', 'Performance'] },
];
