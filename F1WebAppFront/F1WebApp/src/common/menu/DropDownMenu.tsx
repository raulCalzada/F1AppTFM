import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './DropDownMenu.css';

export const DropdownMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <div 
      className="dropdown-container" 
      onMouseEnter={() => setOpen(true)} 
      onMouseLeave={() => { setOpen(false); setSubMenuOpen(false); }}
    >
      <div className="dropdown-trigger">
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      {open && (
        <div className="dropdown-menu">
          <div 
            className="dropdown-item" 
            onMouseEnter={() => setSubMenuOpen(true)}
            onMouseLeave={() => setSubMenuOpen(false)}
          >
            Historical
            {subMenuOpen && (
              <div className="sub-menu">
                <a href="/historical/calendar" className="dropdown-sub-item">Calendar</a>
                <a href="/historical/drivers" className="dropdown-sub-item">Drivers</a>
                <a href="/historical/teams" className="dropdown-sub-item">Teams</a>
                <a href="/historical/puntuations" className="dropdown-sub-item">Puntuations</a>
                <a href="/historical/standings" className="dropdown-sub-item">Standings</a>
              </div>
            )}
          </div>
          <a href="/" className="dropdown-item-home">Home</a>
          <a href="/actual" className="dropdown-item">Actual</a>
        </div>
      )}
    </div>
  );
};
