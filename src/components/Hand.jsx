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

function Hand({ hand, onTileClick, selectedForAction = [], topHand }) {
    if (!topHand) {
        return <div style={{ padding: '20px', fontStyle: 'italic' }}>Calculating best hand...</div>;
    }

    const playerTilesArray = handObjToArray(hand);
    const { sortedHand, junkTiles } = sortHandAndIdentifyJunk(playerTilesArray, topHand);

    // --- THIS IS THE FIX ---
    // Calculate the number of keeper tiles. The sorter places them first.
    const keeperCount = sortedHand.length - junkTiles.length;

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '10px' }}>
            {sortedHand.map((tile, index) => {
                const imageKey = getTileImageKey(tile);
                const imagePath = tileImageMap[imageKey];
                
                const instanceKey = `${tile.id}-${index}`;
                const isSelected = selectedForAction.includes(instanceKey);
                
                // A tile is a "keeper" if its position in the sorted array is before the junk tiles.
                // This correctly handles duplicates.
                const isKeeper = index < keeperCount;

                // Using your custom border color for junk tiles
                let border = '3px solid #c30000ff'; // Red for junk tiles
                if (isKeeper) {
                    border = '3px solid #28a745'; // Green for keepers
                }
                if (isSelected) {
                    border = '3px solid #007bff'; // Blue for selected overrides everything
                }

                return (
                    <div 
                        key={instanceKey}
                        onClick={() => onTileClick && onTileClick(instanceKey)}
                        style={{ margin: '3px', cursor: onTileClick ? 'pointer' : 'default', border }}
                    >
                        <img src={imagePath} alt={imageKey} style={{ width: '50px', height: '70px' }} />
                    </div>
                );
            })}
        </div>
    );
}

export default Hand;
