// src/components/HandDisplay.jsx
import React from 'react';

// This helper function remains the same.
const getDisplayInfo = (tileId, colorMap) => {
    if (!tileId) {
        return { value: '?', color: 'black' };
    }

    // Check for special, full IDs first
    if (tileId === 'SOAP') return { value: '0', color: '#4A4A4A' };
    if (tileId === 'WD') return { value: 'D', color: 'blue' };
    if (tileId === 'RD') return { value: 'D', color: 'red' };
    if (tileId === 'GD') return { value: 'D', color: 'green' };
    if (tileId === 'F') return { value: 'F', color: '#780095ff' };

    // If it's not a special tile, check for a suit pattern
    const suit = tileId.length > 1 ? tileId.slice(-1) : null;
    if (suit && colorMap[suit]) {
        const value = tileId.slice(0, -1);
        const color = colorMap[suit];
        return { value, color };
    }

    // Fallback for any other single-character tile (like N, E, W, S)
    return { value: tileId, color: 'black' };
};

function HandDisplay({ variation, name }) {
    // --- THIS IS THE FIX ---
    // The dynamic color map has been replaced with a static one.
    // This ensures that suits always have the correct, conventional color.
    const staticSuitColorMap = {
        'B': 'green', // Bams will always be green
        'C': 'red',   // Cracks will always be red
        'D': 'blue',  // Dots will always be blue
    };

    if (!variation || !variation.tiles) {
        return <span>{name}</span>;
    }

    const renderedGroups = [];
    let i = 0;
    while (i < variation.tiles.length) {
        const tile = variation.tiles[i];
        let groupSize = 1;
        while (
            i + groupSize < variation.tiles.length &&
            variation.tiles[i + groupSize].id === tile.id
        ) {
            groupSize++;
        }

        // The component now uses the reliable static color map.
        const { value, color } = getDisplayInfo(tile?.id, staticSuitColorMap);
        const text = Array(groupSize).fill(value).join('');
        
        renderedGroups.push(
            <span key={i} style={{ color, marginRight: '8px' }}>
                {text}
            </span>
        );
        i += groupSize;
    }

    return (
        <span style={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: 'bold' }}>
            {renderedGroups}
        </span>
    );
}

export default HandDisplay;
