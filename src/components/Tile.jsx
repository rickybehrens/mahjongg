// src/components/Tile.jsx
import React from 'react';
import { tileImageMap } from '../helpers/tileImageMap';

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

function Tile({ tile, quantity, onQuantityChange }) {
    const imageKey = getTileImageKey(tile);
    const imagePath = tileImageMap[imageKey];
    const tileClassName = `tile ${quantity > 0 ? 'selected' : ''}`;

    return (
        <div className={tileClassName}>
            <img src={imagePath} alt={imageKey} style={{ width: '100%', height: '100%', display: 'block' }} />
            <div className="quantity-controls">
                <button onClick={() => onQuantityChange(tile, 'decrement')}>-</button>
                <span className="quantity-display">{quantity}</span>
                <button onClick={() => onQuantityChange(tile, 'increment')}>+</button>
            </div>
        </div>
    );
}

export default Tile;