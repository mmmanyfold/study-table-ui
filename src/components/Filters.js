import React from 'react';

const Filters = ({ data, active, visible, onSelect, onClear }) => {
  const isActive = (tag) => {
    return active.some((t) => t.id === tag.id);
  };

  const tagStyle = (tag) => {
    let style = 'tag';
    if (isActive(tag)) {
      style += ' tag-selected';
    }
    return style;
  };

  return (
    <div className="tag-list" style={!visible ? { display: 'none' } : null}>
      {!!active.length && (
        <div role="button" onClick={onClear} className="tag-clear-btn">
          + Clear filters
        </div>
      )}
      {data.map((tag) => (
        <div key={tag.id}>
          <input
            type="checkbox"
            id={tag.id}
            name="tag"
            value={isActive(tag)}
            style={{ display: 'none' }}
          />
          <div htmlFor={tag.id} onClick={() => onSelect(tag)} className={tagStyle(tag)}>
            {tag.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Filters;
