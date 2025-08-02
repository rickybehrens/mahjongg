// src/components/TileGrid.jsx
import React from 'react';
import Tile from './Tile';
import gridData from '../data/gridStructure';

// The TileGrid now accepts availableQuantities to enforce limits.
function TileGrid({ onQuantityChange, selectedTiles, blankCount, availableQuantities }) {
    const renderTile = (tile) => {
        if (!tile) return null;

        // Determine the maximum selectable quantity for this tile.
        // If availableQuantities is not provided (like for initial selection), use the tile's default max.
        const maxSelectable = availableQuantities 
            ? availableQuantities[tile.id] || 0 
            : tile.maxQuantity;

        return (
            <Tile
                key={tile.id}
                tile={tile}
                quantity={selectedTiles[tile.id] || 0}
                onQuantityChange={onQuantityChange}
                // Pass the calculated max quantity to the Tile component
                maxSelectable={maxSelectable}
            />
        );
    };

    return (
        <div className="tile-grid-container">
            <div className="suit-block">
                <h3>Dots</h3>
                <div className="tile-container">
                    {gridData.suits.find(s => s.name === 'Dot').tiles.map(renderTile)}
                    {renderTile(gridData.suits.find(s => s.name === 'Dot').dragon)}
                </div>
            </div>

            <div className="suit-block">
                <h3>Bams</h3>
                <div className="tile-container">
                    {gridData.suits.find(s => s.name === 'Bamboo').tiles.map(renderTile)}
                    {renderTile(gridData.suits.find(s => s.name === 'Bamboo').dragon)}
                </div>
            </div>

            <div className="suit-block">
                <h3>Cracks</h3>
                <div className="tile-container">
                    {gridData.suits.find(s => s.name === 'Crack').tiles.map(renderTile)}
                    {renderTile(gridData.suits.find(s => s.name === 'Crack').dragon)}
                </div>
            </div>

            <div className="suit-block">
                <h3>Winds</h3>
                <div className="tile-container">
                    {gridData.winds.map(renderTile)}
                </div>
            </div>

            <div className="suit-block">
                <h3>Special</h3>
                <div className="tile-container">
                    {gridData.special.flowers.map(renderTile)}
                    {gridData.special.jokers.map(renderTile)}
                    {blankCount > 0 && gridData.special.blanks.map(renderTile)}
                </div>
            </div>
        </div>
    );
}

export default TileGrid;
