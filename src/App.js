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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const windowSize = useWindowSize();
  const mobile = windowSize.width <= MOBILE_BREAK;
  const [showTags, setShowTags] = useState(false);
  const showArtists = !mobile || !showTags;

  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    if (windowSize.width > MOBILE_BREAK) {
      setShowTags(true);
    }
  }, [windowSize]);

  useEffect(() => {
    if (activeTags || debouncedQuery) {
      handleFilter(activeTags, debouncedQuery);
    }
  }, [activeTags, debouncedQuery]);

  const fetchdata = async () => {
    setError(false);
    setLoading(true);
    try {
      const response = await fetch(JSON_ENDPOINT);
      const { tags, records } = await response.json();
      setTags(sortByName(tags, 'tags'));
      const artists = sortByName(records);
      setArtists(artists);
      setFilteredArtists(artists);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

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
      filtered = artists.reduce((ret, artist) => {
        let matchCount = 0;
        tags.forEach((tag) => {
          if (artist.fields.Tags?.includes(tag.name)) {
            matchCount++;
          }
        });
        if (matchCount === tags.length) {
          return [...ret, artist];
        }
        return ret;
      }, []);
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

  const MobileHeader = () => {
    if (error || loading) {
      return null;
    }
    return (
      <>
        <div
          onClick={() => setShowTags(!showTags)}
          className="mobile-filter-toggle"
          style={showTags ? { justifyContent: 'flex-start', marginLeft: '1em' } : {}}
        >
          {showTags ? '← View Artists' : '+ View Filters'}
          {!showTags && !!activeTags.length && ` (${activeTags.length})`}
        </div>
        <SearchBar value={query} onChange={setQuery} onClear={() => setQuery('')} />
      </>
    );
  };

  let content;
  if (loading) {
    content = (
      <div className="loading">
        <div>Loading Artists...</div>
      </div>
    );
  } else if (error) {
    content = (
      <div className="loading">
        <div>Something went wrong. Please try reloading the page.</div>
      </div>
    );
  } else {
    content = (
      <div className="main">
        <Filters
          data={tags}
          active={activeTags}
          onSelect={onSelectTag}
          onClear={() => setActiveTags([])}
          visible={showTags}
          windowSize={windowSize}
        />
        <ArtistGrid
          data={filteredArtists}
          visible={showArtists}
          windowSize={windowSize}
          mobile={mobile}
        />
      </div>
    );
  }

  return (
    <div className="app">
      {mobile ? (
        <MobileHeader />
      ) : (
        <SearchBar value={query} onChange={setQuery} onClear={() => setQuery('')} />
      )}
      {content}
    </div>
  );
}

export default App;

const sortByName = (data, type = 'artists') => {
  if (type === 'artists') {
    return data.sort((a, b) => (a.fields?.Name > b.fields?.Name ? 1 : -1));
  }
  if (type === 'tags') {
    return data.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
};
