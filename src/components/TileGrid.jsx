// src/components/TileGrid.jsx
import React from 'react';
import Tile from './Tile';
import gridData from '../data/gridStructure';

// The TileGrid now accepts blankCount to conditionally render blank tiles.
function TileGrid({ onQuantityChange, selectedTiles, blankCount }) {
    const renderTile = (tile) => {
        if (!tile) return null;
        return (
            <Tile
                key={tile.id}
                tile={tile}
                quantity={selectedTiles[tile.id] || 0}
                onQuantityChange={onQuantityChange}
            />
        );
    };

    return (
        <div className="tile-grid-container">
            {/* Suits Rows */}
            {gridData.suits.map((suitRow) => (
                <div key={suitRow.name} className="tile-row">
                    <div className="tile-cell suit-label">{suitRow.name}</div>
                    {suitRow.tiles.map(renderTile)}
                    {renderTile(suitRow.dragon)}
                </div>
            ))}

            {/* Winds Row */}
            <div className="tile-row">
                <div className="tile-cell suit-label">Winds</div>
                {gridData.winds.map(renderTile)}
            </div>

            {/* Special Row */}
            <div className="tile-row">
                <div className="tile-cell suit-label">Special</div>
                {gridData.special.flowers.map(renderTile)}
                {gridData.special.jokers.map(renderTile)}
                
                {/* --- THIS IS THE FIX --- */}
                {/* Only render the Blank tiles if the user has selected more than 0 blanks for the game. */}
                {blankCount > 0 && gridData.special.blanks.map(renderTile)}
            </div>
        </div>
    );
}

export default TileGrid;