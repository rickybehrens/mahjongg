import React, { useState, useMemo } from 'react';
import TileGrid from './TileGrid';

function EditHandModal({ currentHand, onClose, onSave, maxHandSize, blankCount }) {
  const [editingHand, setEditingHand] = useState(currentHand);

  const totalTileCount = useMemo(() => Object.values(editingHand).reduce((sum, count) => sum + count, 0), [editingHand]);

  // This is a local version of your quantity change handler that works on the temporary 'editingHand' state
  const handleQuantityChange = (tile, action) => {
    const currentCount = editingHand[tile.id] || 0;
    if (action === 'increment') {
      const maxCount = tile.maxQuantity || 4; // Use tile-specific max, default to 4
      if (currentCount < maxCount && totalTileCount < maxHandSize) {
        setEditingHand(prev => ({ ...prev, [tile.id]: currentCount + 1 }));
      }
    }
    if (action === 'decrement' && currentCount > 0) {
      const newCount = currentCount - 1;
      const newHand = { ...editingHand };
      if (newCount === 0) {
        delete newHand[tile.id];
      } else {
        newHand[tile.id] = newCount;
      }
      setEditingHand(newHand);
    }
  };

  const handleTileImageClick = (tile) => {
    handleQuantityChange(tile, 'increment');
  };

  const isSaveDisabled = totalTileCount !== maxHandSize;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Correct Your Hand</h2>
        <p>Adjust your tiles below. You must have exactly <strong>{maxHandSize}</strong> tiles selected.</p>
        <div className="tile-counter">{totalTileCount} / {maxHandSize}</div>
        <TileGrid
          onQuantityChange={handleQuantityChange}
          onTileImageClick={handleTileImageClick}
          selectedTiles={editingHand}
          blankCount={blankCount}
        />
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-confirm" onClick={() => onSave(editingHand)} disabled={isSaveDisabled}>
            Save Hand
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditHandModal;