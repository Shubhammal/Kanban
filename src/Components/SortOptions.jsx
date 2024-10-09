// src/components/SortOptions.js
import React from 'react';

const SortOptions = ({ onChange }) => {
    return (
        <div className="sort-options">
            <label>Sort By: </label>
            <select onChange={(e) => onChange(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
            </select>
        </div>
    );
};

export default SortOptions;
