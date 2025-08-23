// src/components/Hand.jsx
import React from 'react';
import { tileImageMap } from '../helpers/tileImageMap';
import tiles from '../data/tiles';
import sortHandAndIdentifyJunk from '../helpers/handSorter';

function getTileImageKey(tile) {
    if (!tile) return null;
    if (tile.id === 'SOAP') return 'White Dragon';
    if (tile.id === 'WD') return 'White Dragon';
    if (['Wind', 'Flower', 'Joker', 'Blank'].includes(tile.suit)) {
        return tile.value;
    }
    if (String(tile.value).includes('Dragon')) {
        return tile.value;
    }
    if (typeof tile.value === 'number') {
        const suitShortName = tile.suit === 'Bamboo' ? 'Bam' : tile.suit;
        return `${tile.value} ${suitShortName}`;
    }
    return tile.id;
}

const handObjToArray = (handObj) => {
    return Object.entries(handObj).flatMap(([tileId, quantity]) => {
        const tileData = tiles.find(t => t.id === tileId);
        return tileData ? Array(quantity).fill(tileData) : [];
    });
};

// A simple sorting function for Learning Mode and as a fallback.
const sortHandBySuit = (handArray) => {
    const suitOrder = { 'Dot': 1, 'Bamboo': 2, 'Crack': 3, 'Wind': 4, 'Flower': 5, 'Joker': 6, 'Blank': 7 };
    return [...handArray].sort((a, b) => {
        if (suitOrder[a.suit] !== suitOrder[b.suit]) {
            return suitOrder[a.suit] - suitOrder[b.suit];
        }
        // For tiles within the same suit, sort by value.
        // Ensure numeric values are compared correctly.
        const valA = typeof a.value === 'number' ? a.value : Infinity;
        const valB = typeof b.value === 'number' ? b.value : Infinity;
        return valA - valB;
    });
};


function Hand({ hand, onTileClick, selectedForAction = [], topHand, isLearningMode, simpleView }) {
    
    const playerTilesArray = handObjToArray(hand);
    let sortedHand, junkTiles = [];
    let keeperCount = playerTilesArray.length;

    // --- THIS IS THE FIX ---
    // If in learning mode (but not the final reveal screen), sort by suit.
    if (isLearningMode && !simpleView) {
        sortedHand = sortHandBySuit(playerTilesArray);
    } else {
        // Otherwise (for regular mode AND the reveal screen), sort by keeper/junk.
        // If topHand is not available (like on the reveal screen), it will gracefully fall back to sorting by suit.
        if (!topHand) {
            sortedHand = sortHandBySuit(playerTilesArray);
        } else {
            const result = sortHandAndIdentifyJunk(playerTilesArray, topHand);
            sortedHand = result.sortedHand;
            junkTiles = result.junkTiles;
            keeperCount = sortedHand.length - junkTiles.length;
        }
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '10px' }}>
            {sortedHand.map((tile, index) => {
                const imageKey = getTileImageKey(tile);
                const imagePath = tileImageMap[imageKey];
                
                const instanceKey = `${tile.id}-${index}`;
                const isSelected = selectedForAction.includes(instanceKey);
                
                let border = '3px solid transparent'; // Default transparent border

                // Only apply keeper/junk borders if NOT in learning mode and NOT on the simple view reveal screen.
                if (!isLearningMode && !simpleView && topHand) {
                    const isKeeper = index < keeperCount;
                    if (isKeeper) {
                        border = '3px solid #28a745'; // Green for keepers
                    } else {
                        border = '3px solid #c30000ff'; // Red for junk tiles
                    }
                }

                if (isSelected) {
                    border = '3px solid #007bff'; // Blue for selected overrides everything
                }

                return (
                    <div 
                        key={instanceKey}
                        onClick={() => onTileClick && onTileClick(instanceKey)}
                        style={{ margin: '3px', cursor: onTileClick ? 'pointer' : 'default', border, borderRadius: '5px' }}
                    >
                        <img src={imagePath} alt={imageKey} style={{ width: '50px', height: '70px', display: 'block' }} />
                    </div>
                );
            })}
        </div>
    );
}

export default Hand;
