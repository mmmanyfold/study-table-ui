import React, { useEffect, useState } from 'react';
import './App.css';
import Artists from './components/Artists'
import Filters from './components/Filters'

function App() {
  const [artists, setArtists] = useState([])
  const [filtered, setFiltered] = useState([])
  const [tags, setTags] = useState([])

  useEffect(() => {
    setArtists(tempArtists)
    setTags(tempTags)
    setFiltered(tempArtists)
  }, [artists, tags])

  const artistsByTag = tags.reduce((ret, t) => {
    const tagArtists = artists.filter(a => a.tags?.includes(t.name))
    return {...ret, [t.name]: tagArtists}
  }, {})

  const onFilter = (selectedTags) => {
    if (!selectedTags.length) {
      setFiltered(artists)
      return
    }
    const filteredArtists = Object.values(
      selectedTags.reduce((ret, t) => {
        artistsByTag[t.name].forEach(artist => {
          ret[artist.id] = artist
        })
        return ret
      }, {}))
    setFiltered(filteredArtists)
  }

  return (
    <div className="App">
      <Filters data={tags} onFilter={onFilter} />
      <Artists data={filtered} />
    </div>
  );
}

export default App

const tempTags = [
  {id: 1, name: "Performance"}, 
  {id: 2, name: "Sculpture"},
  {id: 3, name: "Drawing"}, 
  {id: 4, name: "Painting"}, 
  {id: 5, name: "1980s"}
]

const tempArtists = [
  {id: 1, name: "Maia Ruth Lee", tags: ["Performance", "Sculpture"]}, 
  {id: 2, name: "Anne Wu", tags: ["Sculpture"]},
  {id: 3, name: "Kenneth Tam", tags: ["Performance"]}, 
  {id: 4, name: "Adam Milner", tags: ["Painting", "Sculpture"]}, 
  {id: 5, name: "Lauren Mackler", tags: ["Drawing", "1980s", "Performance"]}
]