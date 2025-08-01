// src/components/PageHeader.jsx
import React from 'react';

function PageHeader({ title, onMenuToggle }) {
    return (
        <div className="page-header">
            <button className="menu-button" onClick={onMenuToggle}>
                <img src="/menu.png" alt="Menu" />
            </button>
            <h1>{title}</h1>
            {/* The logo has been removed from this component */}
        </div>
    );
}

export default PageHeader;
