// src/components/TicketCard.js
import React from 'react';
import icons from '../assets/icons_FEtask/index'

import './TicketCard.css';

const TicketCard = ({ ticket }) => {
    return (
        <div className="ticket-card">
            <div className="header">
                <div>{ticket.id}</div>

                <div id="avatar">
                    
                </div>


            </div>

            <h3>{ticket.title}</h3>
            <div>
                <div>
                        <img src={icons._3_dot_menu} alt="" />
                    <button>
                    <img src={icons.To_do} alt="" />
                       <span> {ticket.tag.join(', ')}</span></button>
                </div>
            </div>
            {/* <p>Status: {ticket.status}</p>
            <p>User: {ticket.userId}</p>
            <p>Priority: {ticket.priority}</p> */}
        </div>
    );
};

export default TicketCard;
