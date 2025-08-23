// src/helpers/charlestonHelper.js
import calculateProbabilities from './probabilityCalculator';
import tiles from '../data/tiles';

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
    // FIX: Use the bestVariation object for accuracy.
    if (!topHand || !topHand.bestVariation || !topHand.bestVariation.tiles) {
        return { count: 0, tiles: [] };
    }

    const neededChecklist = {};
    topHand.bestVariation.tiles.forEach(tile => {
        const tileId = tile.id === 'SOAP' ? 'WD' : tile.id;
        neededChecklist[tileId] = (neededChecklist[tileId] || 0) + 1;
    });

    const junkTiles = [];
    // Create a temporary hand array with unique instance keys for each tile
    const handWithKeys = playerHand.map((tile, index) => {
        // Create a unique key to differentiate identical tiles
        return { ...tile, instanceKey: `${tile.id}-${index}` };
    });

    handWithKeys.forEach(tile => {
        if (tile.id === 'JOKER') return;
        
        if (neededChecklist[tile.id] && neededChecklist[tile.id] > 0) {
            neededChecklist[tile.id]--;
        } else {
            junkTiles.push(tile);
        }
    });

    const tilesToPass = junkTiles.slice(0, 3);

    return {
        count: tilesToPass.length,
        tiles: tilesToPass.map(t => t.instanceKey),
    };
}


/**
 * Analyzes a pool of tiles and selects the best ones to keep for an optimal hand.
 */
export function cherryPickTiles(currentHand, incomingTiles, handSize, winningHands, gameSettings) {
    const combinedTiles = [...currentHand, ...incomingTiles];
    
    let bestHand = combinedTiles.slice(0, handSize);
    let bestValue = 0;

    // This is a simplified combination generator. For very large pools, a more optimized algorithm would be needed.
    function findCombinations(arr, k) {
        if (k > arr.length || k <= 0) {
            return [[]];
        }
        if (k === arr.length) {
            return [arr];
        }
        if (k === 1) {
            return arr.map(item => [item]);
        }
        const combs = [];
        for (let i = 0; i < arr.length - k + 1; i++) {
            const head = arr.slice(i, i + 1);
            const tailcombs = findCombinations(arr.slice(i + 1), k - 1);
            for (let j = 0; j < tailcombs.length; j++) {
                combs.push(head.concat(tailcombs[j]));
            }
        }
        return combs;
    }

    const possibleHands = findCombinations(combinedTiles, handSize);

    possibleHands.forEach(hand => {
        const results = calculateProbabilities(hand, winningHands, gameSettings);
        const topValue = Object.values(results).reduce((max, current) => Math.max(max, current.value), 0);
        
        if (topValue > bestValue) {
            bestValue = topValue;
            bestHand = hand;
        }
    });

    // Convert the winning array of tiles back into the object format used for state
    const newHandObject = {};
    bestHand.forEach(tile => {
        newHandObject[tile.id] = (newHandObject[tile.id] || 0) + 1;
    });

    return newHandObject;
}
