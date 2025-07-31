// src/components/CharlestonModal.jsx
import React from 'react';

// This is a placeholder component for the Charleston logic.
function CharlestonModal({ tilesToPass, onConfirmPass }) {
  // We'll add the real logic later.
  // For now, it just shows what you've selected to pass.
  
  const handleConfirm = () => {
    // In a real app, we'd get the new tiles from the user.
    // For now, let's pretend we got 3 jokers back.
    const receivedTiles = [
      { id: 'JOKER_1', suit: 'Joker' }, 
      { id: 'JOKER_2', suit: 'Joker' }, 
      { id: 'JOKER_3', suit: 'Joker' }
    ];
    onConfirmPass(receivedTiles);
  };

  return (
    <div style={{ padding: '20px', border: '2px solid red', marginTop: '20px' }}>
      <h3>Charleston Pass</h3>
      <p>
        You have selected {tilesToPass.length} tiles to pass: 
        <strong>{tilesToPass.map(t => t.id).join(', ')}</strong>
      </p>
      
      {/* This button will have more logic later */}
      <button onClick={handleConfirm} disabled={tilesToPass.length !== 3}>
        Confirm Pass
      </button>
    </div>
  );
}

export default CharlestonModal;