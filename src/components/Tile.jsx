// src/components/Tile.jsx
import React from 'react';
import { tileImageMap } from '../helpers/tileImageMap';

// This is your original, correct helper function, which is now restored.
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

// The onTileImageClick prop is now accepted and used.
function Tile({ tile, quantity, onQuantityChange, onTileImageClick, maxSelectable }) {
    const imageKey = getTileImageKey(tile);
    const imagePath = tileImageMap[imageKey];
    
    // The button is now disabled if the quantity has reached the maximum allowed.
    const isIncrementDisabled = quantity >= maxSelectable;
    
    // Add a cursor style to indicate the image is clickable
    const imageStyle = {
        width: '100%', 
        height: '100%', 
        display: 'block',
        cursor: isIncrementDisabled ? 'not-allowed' : 'pointer' // Change cursor on hover
    };

    const tileClassName = `tile ${quantity > 0 ? 'selected' : ''}`;

    return (
        <div className={tileClassName}>
            <img 
                src={imagePath} 
                alt={tile.name} // Use tile.name for better accessibility
                style={imageStyle}
                // Add the onClick handler to the image. It will not fire if disabled.
                onClick={() => !isIncrementDisabled && onTileImageClick(tile)} 
            />
            <div className="quantity-controls">
                <button 
                    onClick={() => onQuantityChange(tile, 'decrement')}
                    disabled={quantity === 0}
                >
                    -
                </button>
                <span className="quantity-display">{quantity}</span>
                {/* The "+" button has been removed as requested. */}
            </div>
        </div>
    );
}

export default Tile;
