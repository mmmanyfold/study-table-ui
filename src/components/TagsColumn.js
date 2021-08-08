import React from 'react';
import CloseIcon from '../assets/close-icon.svg';

const TagsColumn = ({ data, active, visible, windowSize, onSelect, onClear }) => {
  const activeCount = active.length;

  return (
    <div>
      {visible && (
        <div className="tags-header">
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
        className="tags-scrollview"
        style={{ height: windowSize.height, display: visible ? 'block' : 'none' }}
        tabIndex="0"
      >
        <div className="tags-container">
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

export default TagsColumn;

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
