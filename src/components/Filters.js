import React, { useState } from 'react';

const Filters = (props) => {
    const [activeTags, setActiveTags] = useState([])

    const isSelected = (tag) => {
        return Boolean(activeTags.find(t => t.id === tag.id))
    }

    const tagStyle = (tag) => {
        let style = "tag"
        if (isSelected(tag)) {
            style += " tag-selected"
        }
        return style
    }

    const handleSelect = (tag) => {
        let active;
        if (isSelected(tag)) {
            active = activeTags.filter(t => t.id !== tag.id)
        } else {
            active = [...activeTags, tag]
        }
        setActiveTags(active)
        props.onFilter(active)
    }

    return (
        <div className="tags">
            {props.data.map((tag) => (
                <div key={tag.id}>
                    <input
                        type="checkbox"
                        id={tag.id}
                        name="tag"
                        value={isSelected(tag)}
                        style={{ display: "none" }}
                    />
                    <div
                        htmlFor={tag.id} 
                        onClick={() => handleSelect(tag)}
                        className={tagStyle(tag)}
                    >
                        {tag.name}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Filters