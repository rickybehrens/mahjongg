// src/components/MissingTilesGrid.jsx
import React from 'react';
import { tileImageMap } from '../helpers/tileImageMap';
import tiles from '../data/tiles';

function getTileImageKey(tileId) {
    const tileData = tiles.find(t => t.id === tileId || (tileId === 'SOAP' && t.id === 'WD'));
    if (!tileData) {
        if (tileId === 'JOKER') return 'Joker';
        return null;
    }

    if (tileId === 'SOAP') return 'White Dragon';
    if (['Wind', 'Flower', 'Joker', 'Blank'].includes(tileData.suit)) {
        return tileData.value;
    }
    if (String(tileData.value).includes('Dragon')) {
        return tileData.value;
    }
    if (typeof tileData.value === 'number') {
        const suitShortName = tileData.suit === 'Bamboo' ? 'Bam' : tileData.suit;
        return `${tileData.value} ${suitShortName}`;
    }
    return tileData.id;
}

// --- NEW: Helper to create a unique key for a set of tiles ---
const getTileSetKey = (tileSet) => {
    return tileSet.map(t => t.id).sort().join(',');
};

function MissingTilesGrid({ missingTiles }) {
    if (!missingTiles || missingTiles.every(set => set.length === 0)) {
        return <div style={{ color: 'green', fontWeight: 'bold', marginLeft: '20px' }}>Complete!</div>;
    }

    // --- NEW: De-duplicate the list of missing tile sets ---
    const uniqueMissingTiles = [];
    const seenKeys = new Set();
    missingTiles.forEach(tileSet => {
        const key = getTileSetKey(tileSet);
        if (!seenKeys.has(key)) {
            uniqueMissingTiles.push(tileSet);
            seenKeys.add(key);
        }
    });

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '20px' }}>
            {uniqueMissingTiles.map((tileSet, setIndex) => (
                <React.Fragment key={setIndex}>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: `repeat(${Math.min(tileSet.length, 3)}, 40px)`, 
                        gap: '4px',
                    }}>
                        {tileSet.map((tile, index) => {
                            const imageKey = getTileImageKey(tile.id);
                            const imagePath = tileImageMap[imageKey];
                            if (!imagePath) return null;
                            return (
                                <div key={index} style={{ width: '40px', height: '55px' }}>
                                    <img src={imagePath} alt={imageKey} style={{ width: '100%', height: '100%' }} />
                                </div>
                            );
                        })}
                    </div>
                    {setIndex < uniqueMissingTiles.length - 1 && <span style={{fontWeight: 'bold'}}>OR</span>}
                </React.Fragment>
            ))}
        </div>
    );
}

export default MissingTilesGrid;
