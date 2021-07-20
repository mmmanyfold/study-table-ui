import React, { useEffect, useState } from 'react';
import useWindowSize from './hooks/useWindowSize';
import './App.css';
import Artists from './components/Artists';
import Filters from './components/Filters';
import SearchBar from './components/SearchBar';

const MOBILE_BREAK = 800;

const sortByName = (artists) => artists.sort((a, b) => (a.name > b.name ? 1 : -1));

function App() {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [query, setQuery] = useState('');

  const windowSize = useWindowSize();
  const mobile = windowSize.width <= MOBILE_BREAK;
  const [showTags, setShowTags] = useState(!mobile);
  const showArtists = !mobile || !showTags;

  useEffect(() => {
    const artists = sortByName(tempArtists);
    setArtists(artists);
    setTags(tempTags);
    setFilteredArtists(artists);
  }, [artists, tags]);

  useEffect(() => {
    setShowTags(windowSize.width > MOBILE_BREAK);
  }, [windowSize]);

  const artistsByTag = tags.reduce((ret, t) => {
    const tagArtists = artists.filter((a) => a.tags?.includes(t.name));
    return { ...ret, [t.name]: tagArtists };
  }, {});

  const handleFilter = (tags, query) => {
    if (!tags.length && !query) {
      setFilteredArtists(artists);
      return;
    }
    let filtered;
    if (tags.length) {
      filtered = Object.values(
        tags.reduce((ret, t) => {
          artistsByTag[t.name].forEach((artist) => {
            ret[artist.id] = artist;
          });
          return ret;
        }, {})
      );
    } else {
      filtered = artists;
    }
    if (query.length) {
      filtered = filtered.filter((artist) =>
        artist.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFilteredArtists(sortByName(filtered));
  };

  const onSelectTag = (tag) => {
    const isActive = activeTags.some((t) => t.id === tag.id);
    let updatedTags;
    if (isActive) {
      updatedTags = activeTags.filter((t) => t.id !== tag.id);
    } else {
      updatedTags = [...activeTags, tag];
    }
    setActiveTags(updatedTags);
    handleFilter(updatedTags, query);
  };

  const onSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleFilter(activeTags, value);
  };

  return (
    <div className="app">
      {mobile && (
        <div className="mobile-filter-toggle" onClick={() => setShowTags(!showTags)}>
          {showTags ? 'Hide Filters' : 'Show Filters'}
          {mobile && activeTags.length ? ` (${activeTags.length})` : ''}
        </div>
      )}
      <SearchBar value={query} onChange={onSearch} />
      <div className="main">
        <Filters
          data={tags}
          active={activeTags}
          onSelect={onSelectTag}
          visible={showTags}
        />
        <Artists data={filteredArtists} visible={showArtists} />
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
