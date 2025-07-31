// src/helpers/charlestonHelper.js

/**
 * Decides whether to continue or skip the second Charleston.
 */
export function getCharlestonRecommendation(sortedHands) {
    if (!sortedHands || sortedHands.length === 0) {
        return { action: 'continue', reason: 'Not enough data to make a decision.' };
    }

    const topHand = sortedHands[0];
    const topHandProbability = topHand.prob || 0;

    if (topHandProbability >= 0.85) {
        return { 
            action: 'skip', 
            reason: 'Your hand is very strong (1-2 tiles away). It is best to stop passing.' 
        };
    }
    
    if (topHandProbability >= 0.70) {
        return {
            action: 'skip',
            reason: 'Your hand is strong (3 tiles away). Consider stopping to protect your tiles.'
        };
    }

    return {
        action: 'continue',
        reason: 'You can still improve your hand by exchanging more tiles.'
    };
}

/**
 * Recommends 0-3 tiles to pass during the Final Pass Across by identifying junk tiles.
 */
export function recommendFinalPass(playerHand, sortedHands) {
    if (!playerHand || !sortedHands || sortedHands.length === 0) {
        return { count: 0, tiles: [] };
    }

    const topHand = sortedHands[0];
    if (!topHand || !topHand.variations || topHand.variations.length === 0) {
        return { count: 0, tiles: [] };
    }

    const neededChecklist = {};
    topHand.variations[0].tiles.forEach(tile => {
        const tileId = tile.id === 'SOAP' ? 'WD' : tile.id;
        neededChecklist[tileId] = (neededChecklist[tileId] || 0) + 1;
    });

    const junkTiles = [];
    playerHand.forEach(tile => {
        if (tile.id === 'JOKER') return;
        
        if (neededChecklist[tile.id] && neededChecklist[tile.id] > 0) {
            neededChecklist[tile.id]--;
        } else {
            junkTiles.push(tile.id);
        }
    });

    const tilesToPass = junkTiles.slice(0, 3);

    return {
        count: tilesToPass.length,
        tiles: tilesToPass,
    };
}