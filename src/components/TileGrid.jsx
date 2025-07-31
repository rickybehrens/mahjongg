// src/components/TileGrid.jsx
import React from 'react';
import Tile from './Tile';
import gridData from '../data/gridStructure';

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
            {/* Each suit is now wrapped in a "suit-block".
              The <h3> title is a block-level element, so it naturally sits on its own line
              above the "tile-container" div that holds the actual tiles.
            */}
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
