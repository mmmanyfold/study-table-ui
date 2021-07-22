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
    <div className="filters-scrollview" style={!visible ? { display: 'none' } : null}>
      <div className="filters-container">
        <div className="filters-header">
          {active.length ? (
            <div role="button" onClick={onClear} style={{ cursor: 'pointer' }}>
              Clear All {!!active.length && ` (${active.length})`}
            </div>
          ) : (
            <div>Filter by Tags</div>
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
              {tag.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
