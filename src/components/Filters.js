import React from 'react';
import CloseIcon from '../assets/close-icon.svg';

const Filters = ({ data, active, visible, windowSize, onSelect, onClear }) => {
  const isActive = (tag) => {
    return active.some((t) => t.id === tag.id);
  };

  const tagStyle = (tag) => {
    let style = 'tag';
    if (isActive(tag)) {
      style += ' selected';
    }
    return style;
  };

  return (
    <div
      className="filters-scrollview"
      style={{ height: windowSize.height, display: visible ? 'block' : 'none' }}
    >
      <div className="filters-container">
        <div className="filters-header">
          {active.length ? (
            <div role="button" onClick={onClear} style={{ cursor: 'pointer' }}>
              Clear all ({active.length})
              <img src={CloseIcon} alt="X Icon" style={{ marginLeft: '8px' }} />
            </div>
          ) : (
            <div>Filter by tags</div>
          )}
        </div>
        {data.map((tag) => (
          <div key={tag.id} className="tag-wrapper">
            <input
              type="checkbox"
              id={tag.id}
              name="tag"
              value={isActive(tag)}
              style={{ display: 'none' }}
            />
            <div htmlFor={tag.id} onClick={() => onSelect(tag)} className={tagStyle(tag)}>
              <div>{tag.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
