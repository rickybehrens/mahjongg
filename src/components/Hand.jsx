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
    const { sortedHand, keepers, either } = sortHandAndIdentifyJunk(playerTilesArray, topHand);

    // The sorter places tiles in order: keepers, then eithers, then junk.
    // We can use the lengths of these arrays to determine a tile's category by its index.
    const keeperCount = keepers.length;
    const eitherCount = either.length;

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '10px' }}>
            {sortedHand.map((tile, index) => {
                const imageKey = getTileImageKey(tile);
                const imagePath = tileImageMap[imageKey];
                
                const instanceKey = `${tile.id}-${index}`;
                const isSelected = selectedForAction.includes(instanceKey);
                
                const isKeeper = index < keeperCount;
                const isEither = index >= keeperCount && index < keeperCount + eitherCount;

                let border = '3px solid #c30000ff'; // Default for junk tiles
                if (isEither) {
                    border = '3px solid #ffc107'; // Yellow for "Either"
                }
                if (isKeeper) {
                    border = '3px solid #28a745'; // Green for "Keeper"
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
