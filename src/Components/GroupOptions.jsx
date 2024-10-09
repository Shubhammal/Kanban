// src/components/GroupOptions.js
import React from 'react';

const GroupOptions = ({ onChange }) => {
    return (
        <div className="group-options">
            <label>Group By: </label>
            <select onChange={(e) => onChange(e.target.value)}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
            </select>
        </div>
    );
};

export default GroupOptions;
