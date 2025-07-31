// src/components/HandDisplay.jsx
import React from 'react';

// Defines the color for each suit
const suitColorMap = {
    B: 'green',
    C: 'red',
    D: 'blue',
};

// This function determines the character and color for a single tile ID
const getDisplayInfo = (tileId) => {
    if (!tileId) {
        return { value: '?', color: 'black' };
    }

    // --- FIX: Check for special, full IDs FIRST ---
    if (tileId === 'SOAP') return { value: '0', color: '#4A4A4A' };
    if (tileId === 'WD') return { value: 'D', color: 'blue' };
    if (tileId === 'RD') return { value: 'D', color: 'red' };
    if (tileId === 'GD') return { value: 'D', color: 'green' };
    if (tileId === 'F') return { value: 'F', color: '#780095ff' };

    // If it's not a special tile, check for a suit pattern
    const suit = tileId.length > 1 ? tileId.slice(-1) : null;
    if (suit && suitColorMap[suit]) {
        const value = tileId.slice(0, -1);
        const color = suitColorMap[suit];
        return { value, color };
    }

    // Fallback for any other single-character tile (like N, E, W, S)
    return { value: tileId, color: 'black' };
};

function HandDisplay({ variation, name }) {
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

        const { value, color } = getDisplayInfo(tile?.id);
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