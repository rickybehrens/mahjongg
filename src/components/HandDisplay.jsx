// src/components/HandDisplay.jsx
import React, { useMemo } from 'react';

// This function determines the character and color for a single tile ID
// It now accepts a dynamic color map to handle the green-red-blue convention.
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
    // This is the core of the fix. It creates a dynamic color map for each hand variation.
    const dynamicSuitColorMap = useMemo(() => {
        if (!variation || !variation.tiles) {
            return {};
        }

        const standardColors = ['green', 'red', 'blue'];
        const foundSuits = [];
        const colorMap = {};

        // Find the unique suits in the order they appear
        variation.tiles.forEach(tile => {
            const suit = tile.id && tile.id.length > 1 ? tile.id.slice(-1) : null;
            if (suit && ['B', 'C', 'D'].includes(suit) && !foundSuits.includes(suit)) {
                foundSuits.push(suit);
            }
        });

        // Assign colors based on the order found
        foundSuits.forEach((suit, index) => {
            colorMap[suit] = standardColors[index];
        });

        // If only one suit is found, it should be blue as per convention for single-suit hands.
        if (foundSuits.length === 1) {
            colorMap[foundSuits[0]] = 'blue';
        }

        return colorMap;
    }, [variation]);


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

        // Pass the new dynamic color map to the helper function
        const { value, color } = getDisplayInfo(tile?.id, dynamicSuitColorMap);
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
