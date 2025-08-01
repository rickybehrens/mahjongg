// src/components/SideMenu.jsx (NEW FILE)
import React from 'react';

function SideMenu({ isOpen, onPageSelect, onClose }) {
  const menuClass = isOpen ? 'side-menu open' : 'side-menu';

  const handleSelect = (page) => {
    onPageSelect(page);
    onClose();
  };

  return (
    <>
      {isOpen && <div className="side-menu-overlay" onClick={onClose}></div>}
      <div className={menuClass}>
        <h2>Menu</h2>
        <ul>
          <li onClick={() => handleSelect('home')}>Home</li>
          <li onClick={() => handleSelect('rules')}>Rules</li>
          <li onClick={() => handleSelect('about')}>About</li>
          <li onClick={() => handleSelect('contact')}>Contact Me</li>
        </ul>
      </div>
    </>
  );
}

export default SideMenu;