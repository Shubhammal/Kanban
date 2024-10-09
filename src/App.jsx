// src/App.js
import React, { useState, useEffect } from 'react';
import KanbanBoard from './Components/KanbanBoard';
import DisplayIcon from './assets/icons_FEtask/Display.svg'; // Import the Display icon
import './App.css'
import down from '../src/assets/icons_FEtask/down.svg';

const App = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status'); // Load grouping from local storage
    const [sorting, setSorting] = useState(localStorage.getItem('sorting') || 'priority'); // Load sorting from local storage
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to handle dropdown visibility

    // Fetch tickets and users data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
                const data = await response.json();
                setTickets(data.tickets);
                setUsers(data.users);
            } catch (err) {
                console.error("Error fetching data: ", err);
            }
        };
        fetchData();
    }, []);

    // Save grouping and sorting options to local storage when they change
    useEffect(() => {
        localStorage.setItem('grouping', grouping);
        localStorage.setItem('sorting', sorting);
    }, [grouping, sorting]);

    // Toggle Dropdown Visibility
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    // Handle grouping change and hide the dropdown
    const handleGroupingChange = (e) => {
        setGrouping(e.target.value);
        toggleDropdown(); // Hide the dropdown after selection
    };

    // Handle sorting change and hide the dropdown
    const handleSortingChange = (e) => {
        setSorting(e.target.value);
        toggleDropdown(); // Hide the dropdown after selection
    };

    return (
        <div className="App">
            {/* Display Button with SVG Icon */}
            <div className="navbar">
                <div className="upper">
                    <div className="Display">
                        <button className="display-button" onClick={toggleDropdown}>
                            <img src={DisplayIcon} alt="Display" />
                            <p>Display</p>
                            <img src={down} alt="Down Arrow" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Dropdown Menu */}
            {isDropdownVisible && (
                <div className='dropy'>
                    <div className="dropdown">
                        <div>
                            <h4>Grouping</h4>
                            <select value={grouping} onChange={handleGroupingChange}>
                                <option value="status">Status</option>
                                <option value="user">User</option>
                                <option value="priority">Priority</option>
                            </select>
                        </div>
                        <div>
                            <h4>Ordering</h4>
                            <select value={sorting} onChange={handleSortingChange}>
                                <option value="priority">Priority</option>
                                <option value="title">Title</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Kanban Board Component */}
            <KanbanBoard tickets={tickets} users={users} grouping={grouping} sorting={sorting} />
        </div>
    );
};

export default App;
