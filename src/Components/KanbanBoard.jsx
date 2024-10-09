// src/components/KanbanBoard.js
import React from 'react';
import TicketCard from './TicketCard';

// Import all icons from the index file
import icons from '../assets/icons_FEtask'; // Adjust the path if needed
import './Kanban.css';

// Mapping for status and priority icons using the imported icons
const statusIcons = {
  'Todo': icons.To_do,
  'In progress': icons.In_process,
  'Done': icons.Done,
  'Backlog': icons.Backlog,
  'Cancelled': icons.Cancelled
};

const priorityIcons = {
  'No Priority': icons.No_priority,
  'Urgent': icons.SVG_Urgent_Priority_colour,
  'High': icons.Img_High_Priority,
  'Medium': icons.Img_Medium_Priority,
  'Low': icons.Img_Low_Priority
};

// Helper function to convert priority numbers into names
const getPriorityName = (priority) => {
  switch (priority) {
    case 4:
      return 'Urgent';
    case 3:
      return 'High';
    case 2:
      return 'Medium';
    case 1:
      return 'Low';
    case 0:
    default:
      return 'No Priority';
  }
};

const KanbanBoard = ({ tickets, users, grouping, sorting }) => {
  // Function to map userId to user name
  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown';
  };

  // Function to group tickets by the selected option
  const groupTickets = () => {
    switch (grouping) {
      case 'status':
        return groupByField(tickets, 'status');
      case 'user':
        return groupByField(tickets, 'userId');
      case 'priority':
        return groupByPriority(tickets);
      default:
        return {};
    }
  };

  // Helper function to group tickets by a specific field
  const groupByField = (tickets, field) => {
    return tickets.reduce((groups, ticket) => {
      const key = field === 'userId' ? getUserName(ticket[field]) : ticket[field] || 'Unassigned';
      if (!groups[key]) groups[key] = [];
      groups[key].push(ticket);
      return groups;
    }, {});
  };

  const groupByPriority = (tickets) => {
    const sortedTickets = [...tickets].sort((a, b) => {
      if (a.priority === 0) return -1; // "No Priority" comes first
      if (b.priority === 0) return 1;  // "No Priority" comes first
      return b.priority - a.priority;  // Sort in descending order (Urgent (4) to Low (1))
    });

    // Group tickets by priority
    return sortedTickets.reduce((acc, ticket) => {
      const priorityName = getPriorityName(ticket.priority);
      if (!acc[priorityName]) {
        acc[priorityName] = [];
      }
      acc[priorityName].push(ticket);
      return acc;
    }, {});
  };

  // Function to sort tickets based on the selected option
  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sorting === 'priority') return b.priority - a.priority; // Descending order of priority
      if (sorting === 'title') return a.title.localeCompare(b.title); // Ascending order by title
      return 0; // Default, no sorting applied
    });
  };

  const groupedTickets = groupTickets();

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((groupKey) => (
        <div key={groupKey} className="kanban-column">
          {/* Render status icon and label */}
          {grouping === 'status' && (
            <div className='kanbanBoxes'>
             <div>
                <h2><img src={statusIcons[groupKey]} alt={groupKey} style={{ marginRight: '8px' }} />{groupKey}</h2>
            </div>
            <div>
                <img src={icons.add} alt='add'/>
                <img src={icons._3_dot_menu} alt='menu'/>
            </div>
            
            </div>
          )}

          {/* Render priority icon and label */}
          {grouping === 'priority' && (
            <div className='kanbanBoxes'>
              <div>
            <h2><img src={priorityIcons[groupKey]} alt={groupKey} style={{ marginRight: '8px' }} />{groupKey}</h2>
            </div>
            <div>
            <img src={icons.add} alt='add'/>
                <img src={icons._3_dot_menu} alt='menu'/>
            </div>
            
            </div>
          )}

          {/* Render just the group label for other groupings */}
          {grouping !== 'status' && grouping !== 'priority' &&
          <div className='kanbanBoxes'>
            <div>
           <h2>
           <img src={icons.avatar} alt={groupKey} style={{ marginRight: '8px' }} />
           {groupKey}</h2>
          </div>
          <div>
            <img src={icons.add} alt='add'/>
                <img src={icons._3_dot_menu} alt='menu'/>
            </div>
            
            </div>
            }


          {sortTickets(groupedTickets[groupKey]).map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} userName={getUserName(ticket.userId)} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
