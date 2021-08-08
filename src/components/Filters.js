import React from 'react';
import CloseIcon from '../assets/close-icon.svg';

const Filters = ({ data, active, visible, windowSize, onSelect, onClear }) => {
  const activeCount = active.length;

  return (
    <div>
      {visible && (
        <div className="filters-header">
          {activeCount ? (
            <div role="button" onClick={onClear} style={{ cursor: 'pointer' }}>
              Clear all ({activeCount})
              <img src={CloseIcon} alt="X Icon" style={{ marginLeft: '8px' }} />
            </div>
          ) : (
            <div>Tags</div>
          )}
        </div>
      )}
      <div
        className="filters-scrollview"
        style={{ height: windowSize.height, display: visible ? 'block' : 'none' }}
      >
        <div className="filters-container">
          {data.map((tag) => (
            <div key={tag.id} className="tag-wrapper">
              <input
                type="checkbox"
                id={tag.id}
                name="tag"
                value={isActive(tag, active)}
                style={{ display: 'none' }}
              />
              <div
                htmlFor={tag.id}
                onClick={() => onSelect(tag)}
                className={tagStyle(tag, active)}
              >
                <div>{tag.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;

const isActive = (item, activeItems) => {
  return activeItems.some((t) => t.id === item.id);
};

const tagStyle = (tag, activeTags) => {
  let style = 'tag';
  if (isActive(tag, activeTags)) {
    style += ' selected';
  }
  return style;
};
