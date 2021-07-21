import React, { useEffect, useState } from 'react';
import useDebounce from './hooks/useDebounce';
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
  const debouncedQuery = useDebounce(query, 500);

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

  useEffect(() => {
    if (activeTags || debouncedQuery) {
      handleFilter(activeTags, debouncedQuery);
    }
  }, [activeTags, debouncedQuery]);

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
  {
    id: 1,
    name: 'Simone Forti',
    image:
      'https://dl.airtable.com/.attachmentThumbnails/0936f073c25da2b872272632d75e696c/911b163c',
    tags: ['Performance', 'Sculpture'],
  },
  {
    id: 2,
    name: 'Donald Judd',
    image:
      'https://dl.airtable.com/.attachmentThumbnails/823a03723b50d95667362db68d411800/e98496b3',
    tags: ['Sculpture'],
  },
  {
    id: 3,
    name: 'Ai Weiwei',
    image:
      'https://dl.airtable.com/.attachmentThumbnails/b11f2437050701a0a720633ee5bfe219/065e37d6',
    tags: ['Performance'],
  },
  {
    id: 4,
    name: 'Adam Milner',
    image:
      'https://dl.airtable.com/.attachmentThumbnails/27b4b8de66850f940e8c84a06a9ae8b8/fdcb6f11',
    tags: ['Painting', 'Sculpture'],
  },
  {
    id: 5,
    name: 'Aki Sasamoto',
    image:
      'https://dl.airtable.com/.attachmentThumbnails/65efd89bfb83773ac0beee9fa1e5bdf1/036c211c',
    tags: ['Drawing', '1980s', 'Performance'],
  },
  {
    id: 6,
    name: 'Amber Hawk Swanson',
    image:
      'https://dl.airtable.com/.attachmentThumbnails/58d173d0d3814af20b277ab544beeb58/d06de9d8',
    tags: ['Performance', 'Sculpture'],
  },
  {
    id: 7,
    name: 'Andre Cadere',
    image:
      'https://dl.airtable.com/.attachmentThumbnails/871c3abc0b395d67da68d2cfda9944d6/278f787e',
    tags: ['Sculpture'],
  },
  {
    id: 8,
    name: 'Ann Hamilton',
    image:
      'https://dl.airtable.com/.attachmentThumbnails/3f09f9641c5ca37430a8018a635157f9/04015541',
    tags: ['Performance'],
  },
  {
    id: 9,
    name: 'Ann Veronica Janssens',
    image:
      'https://dl.airtable.com/.attachmentThumbnails/79ef14fdab6c2744efeb61803d574380/3c0c029f',
    tags: ['Drawing', '1980s', 'Performance'],
  },
];
