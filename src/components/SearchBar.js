import React from 'react';
import CloseIcon from '../assets/close-icon.svg';

const SearchBar = ({ value, onChange, onClear }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search"
        className="search-input"
      />
      <div role="button" onClick={onClear} className="search-clear-icon">
        <img src={CloseIcon} />
      </div>
    </div>
  );
};

export default SearchBar;
