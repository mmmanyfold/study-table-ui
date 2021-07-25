import React, { useEffect, useState } from 'react';
import useDebounce from './hooks/useDebounce';
import useWindowSize from './hooks/useWindowSize';
import ArtistGrid from './components/ArtistGrid';
import Filters from './components/Filters';
import SearchBar from './components/SearchBar';
import './App.css';

const MOBILE_BREAK = 800;
const JSON_ENDPOINT =
  'https://study-table-service-assets.s3.us-east-1.amazonaws.com/airtable.json';

function App() {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const windowSize = useWindowSize();
  const mobile = windowSize.width <= MOBILE_BREAK;
  const [showTags, setShowTags] = useState(!mobile);
  const showArtists = !mobile || !showTags;

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(JSON_ENDPOINT);
        const { tags, records } = await response.json();
        setTags(tags);
        const artists = sortByName(records);
        setArtists(artists);
        setFilteredArtists(artists);
      } catch (err) {
        console.error('Error - ', err);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    setShowTags(windowSize.width > MOBILE_BREAK);
  }, [windowSize]);

  useEffect(() => {
    if (activeTags || debouncedQuery) {
      handleFilter(activeTags, debouncedQuery);
    }
  }, [activeTags, debouncedQuery]);

  const artistsByTag = tags.reduce((ret, t) => {
    const tagArtists = artists.filter((a) => a.fields?.Tags?.includes(t.name));
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
        artist.fields?.Name.toLowerCase().includes(query.toLowerCase())
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
  };

  const mobileFilterToggle = (
    <div
      onClick={() => setShowTags(!showTags)}
      className="mobile-filter-toggle"
      style={showTags ? { justifyContent: 'flex-start', marginLeft: '1em' } : {}}
    >
      {showTags ? '← View Artists' : '+ View Filters'}
      {!showTags && !!activeTags.length && ` (${activeTags.length})`}
    </div>
  );

  return (
    <div className="app">
      {mobile && mobileFilterToggle}
      <SearchBar value={query} onChange={setQuery} onClear={() => setQuery('')} />
      <div className="main">
        <Filters
          data={tags}
          active={activeTags}
          onSelect={onSelectTag}
          onClear={() => setActiveTags([])}
          visible={showTags}
        />
        <ArtistGrid
          data={filteredArtists}
          visible={showArtists}
          windowSize={windowSize}
          mobile={mobile}
        />
      </div>
    </div>
  );
}

export default App;

const sortByName = (artists) =>
  artists.sort((a, b) => (a.fields?.Name > b.fields?.Name ? 1 : -1));
