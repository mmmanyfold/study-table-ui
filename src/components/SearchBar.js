import React from 'react';
import CloseIcon from '../assets/close-icon.svg';

const SearchBar = ({ value, onChange, onClear }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
        className="search-input"
      />
      {onClear && (
        <div role="button" onClick={onClear} className="search-clear-icon">
          <img src={CloseIcon} alt="X Icon" />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
