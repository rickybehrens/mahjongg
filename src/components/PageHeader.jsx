// src/components/PageHeader.jsx
import React from 'react';
import menuIcon from '../assets/menu.png'; // Import the image

function PageHeader({ title, onMenuToggle }) {
    return (
        <div className="page-header">
            <button className="menu-button" onClick={onMenuToggle}>
                <img src={menuIcon} alt="Menu" />
            </button>
            <h1>{title}</h1>
            {/* The logo has been removed from this component */}
        </div>
    );
}

export default PageHeader;