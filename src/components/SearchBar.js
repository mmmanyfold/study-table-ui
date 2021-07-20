import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search"
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
