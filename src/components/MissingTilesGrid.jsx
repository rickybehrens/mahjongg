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

function MissingTilesGrid({ missingTiles }) {
    // Check if all possible variations are complete
    if (!missingTiles || missingTiles.every(set => set.length === 0)) {
        return <div style={{ color: 'green', fontWeight: 'bold', marginLeft: '20px' }}>Complete!</div>;
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '20px' }}>
            {missingTiles.map((tileSet, setIndex) => (
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
                    {/* Add an "OR" separator between the grids */}
                    {setIndex < missingTiles.length - 1 && <span style={{fontWeight: 'bold'}}>OR</span>}
                </React.Fragment>
            ))}
        </div>
    );
}

export default MissingTilesGrid;
