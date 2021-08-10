import React, { useEffect, useState, useRef } from 'react';
import useWindowSize from './hooks/useWindowSize';
import ArtistGrid from './components/ArtistGrid';
import TagsColumn from './components/TagsColumn';
import SearchBar from './components/SearchBar';
import './App.scss';

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
  const [selectedArtist, setSelectedArtist] = useState(null);

  const gridRef = useRef(null);
  const [gridScroll, setGridScroll] = useState(null);

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
    const onScroll = (e) => {
      setGridScroll(e.target.documentElement?.scrollTop);
    };
    gridRef?.current?.addEventListener('scroll', onScroll);
    return () => gridRef?.current?.removeEventListener('scroll', onScroll);
  }, [gridScroll, gridRef]);

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
        className="mobile-tag-toggle"
        style={showTags ? { justifyContent: 'flex-start', paddingLeft: '1em' } : {}}
      >
        {showTags ? '← View Artists' : '+ View Tags'}
        {!showTags && !!activeTags.length && ` (${activeTags.length})`}
      </div>
      <SearchBar
        value={query}
        onChange={setQuery}
        visible={gridScroll < 50 && !showTags && !selectedArtist}
      />
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
        <TagsColumn
          data={tags}
          active={activeTags}
          onSelect={onSelectTag}
          onClear={() => {
            setActiveTags([]);
            setFilteredArtists(artists);
          }}
          visible={showTags}
          windowSize={windowSize}
        />
        <div
          ref={(el) => {
            setGridScroll(el?.scrollTop);
            gridRef.current = el;
          }}
          className="grid-scrollview"
          style={{ height: windowSize.height, display: showArtists ? 'block' : 'none' }}
          tabIndex="0"
        >
          <ArtistGrid
            data={filteredArtists}
            visible={showArtists}
            windowSize={windowSize}
            mobile={mobile}
            selectedArtist={selectedArtist}
            setSelectedArtist={setSelectedArtist}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>Sculpture.Directory</h1>
      </header>
      <main>
        {mobile ? (
          !loading && !error && mobileHeader
        ) : (
          <SearchBar
            value={query}
            onChange={onChangeSearch}
            onClear={() => {
              setQuery('');
              setFilteredArtists(artists);
            }}
          />
        )}
        {content}
      </main>
    </div>
  );
}

export default App;

//
//
// FUNCTIONS
//

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
  const str = query.toLowerCase().trim();
  const words = str.split(' ');
  const multiword = words.length > 1;

  const resultsFromNames = artists.filter((artist) =>
    artist.fields.Name.toLowerCase().includes(str)
  );
  const multiwordTagMatches = multiword
    ? tags.filter((t) => str.includes(t.name.toLowerCase()))
    : [];

  let resultsFromTags;

  if (resultsFromNames.length && multiword) {
    resultsFromTags = [];
  } else if (multiwordTagMatches.length) {
    resultsFromTags = getFilteredByTags(multiwordTagMatches, artists);
  } else if (multiword) {
    const relevantTags = words.reduce((ret, word) => {
      const wordMatches = tags.filter((t) => word.includes(t.name.toLowerCase()));
      return [...ret, ...wordMatches];
    }, []);
    resultsFromTags = getFilteredByTags(relevantTags, artists);
  } else {
    const relevantTags = tags.filter((t) => t.name.toLowerCase().includes(str));
    resultsFromTags = relevantTags.reduce(
      (ret, t) => ret.concat(artistsByTag[t.name]),
      []
    );
  }
  const results = dedupeObjectsById([...resultsFromTags, ...resultsFromNames]);
  return sortByName(results);
};

const getFilteredByTags = (tags, artists) => {
  const activeTagCount = tags.length;
  const results = artists.reduce((ret, artist) => {
    let matchCount = 0;
    tags.forEach((tag) => {
      if (artist.fields.Tags?.includes(tag.name)) {
        matchCount++;
      }
    });
    if (matchCount === activeTagCount) {
      return [...ret, artist];
    }
    return ret;
  }, []);
  return sortByName(results);
};
