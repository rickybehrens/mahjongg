// src/components/PageHeader.jsx
import React from 'react';
import menuIcon from '../assets/menu.png';

function PageHeader({ title, onMenuToggle }) {
    return (
        <div className="page-header">
            <button className="menu-button" onClick={onMenuToggle}>
                <img src={menuIcon} alt="Menu" />
            </button>
            <h1 className="page-title">{title}</h1>
            {/* The logo has been removed. An empty div is used to help with spacing. */}
            <div style={{ width: '40px' }}></div>
        </div>
    );
}

export default PageHeader;
