import React, { useEffect, useState } from 'react';
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

  const onSelectTag = (tag) => {
    setQuery('');
    const isActive = activeTags.some((t) => t.id === tag.id);
    let updatedTags;
    if (isActive) {
      updatedTags = activeTags.filter((t) => t.id !== tag.id);
    } else {
      updatedTags = [...activeTags, tag];
    }
    setActiveTags(updatedTags);
    if (updatedTags.length) {
      const filtered = getFilteredByTags(updatedTags, artists);
      setFilteredArtists(filtered);
    } else {
      setFilteredArtists(artists);
    }
  };

  const onChangeSearch = (text) => {
    setActiveTags([]);
    setQuery(text);
    if (text.length) {
      const filtered = getFilteredByQuery(text, tags, artists, artistsByTag);
      setFilteredArtists(filtered);
    } else {
      setFilteredArtists(artists);
    }
  };

  const mobileHeader = (
    <>
      <div
        onClick={() => setShowTags(!showTags)}
        className="mobile-filter-toggle"
        style={showTags ? { justifyContent: 'flex-start', paddingLeft: '1em' } : {}}
      >
        {showTags ? '← View Artists' : '+ View Tags'}
        {!showTags && !!activeTags.length && ` (${activeTags.length})`}
      </div>
      {!showTags && <SearchBar value={query} onChange={setQuery} />}
    </>
  );

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
        !loading && !error && mobileHeader
      ) : (
        <SearchBar
          value={query}
          onChange={onChangeSearch}
          onClear={() => onChangeSearch('')}
        />
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

const dedupeObjectsById = (objects) => {
  return [...new Map(objects.map((x) => [x.id, x])).values()];
};

const getFilteredByQuery = (query, tags, artists, artistsByTag) => {
  const str = query.toLowerCase();
  const matchingTags = tags.filter((t) => t.name.toLowerCase().includes(str));
  const resultsFromTags = matchingTags.reduce(
    (ret, t) => ret.concat(artistsByTag[t.name]),
    []
  );
  const resultsFromNames = artists.filter((artist) =>
    artist.fields.Name.toLowerCase().includes(str)
  );
  const results = dedupeObjectsById([...resultsFromTags, ...resultsFromNames]);
  return sortByName(results);
};

const getFilteredByTags = (selectedTags, artists) => {
  const filterCount = selectedTags.length;
  const results = artists.reduce((ret, artist) => {
    let matchCount = 0;
    selectedTags.forEach((tag) => {
      if (artist.fields.Tags?.includes(tag.name)) {
        matchCount++;
      }
    });
    if (matchCount === filterCount) {
      return [...ret, artist];
    }
    return ret;
  }, []);
  return sortByName(results);
};
