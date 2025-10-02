// src/helpers/probabilityCalculator.js
import tilesData from '../data/tiles';

/**
 * The main function to calculate probabilities and strategic values.
 * Now includes advanced logic for Quint hands based on joker availability.
 */
// --- MODIFIED --- Function now accepts remainingDeckCounts
function calculateProbabilities(playerHand, winningHands, gameSettings, remainingDeckCounts) {
    const results = {};

    const playerTileCounts = {};
    let playerJokerCount = 0;
    let playerBlankCount = 0;
    
    playerHand.forEach(tile => {
        if (tile.id === 'JOKER') playerJokerCount++;
        else if (tile.id === 'BLANK') playerBlankCount++;
        else {
            const tileId = tile.id === 'WD' ? 'SOAP' : tile.id; 
            playerTileCounts[tileId] = (playerTileCounts[tileId] || 0) + 1;
        }
    });

    // --- NEW --- Calculate total tiles and jokers remaining in the deck for probability calculations
    const jokersLeftInDeck = remainingDeckCounts ? (remainingDeckCounts['JOKER'] || 0) : 0;
    const totalTilesLeftInDeck = remainingDeckCounts ? Object.values(remainingDeckCounts).reduce((sum, count) => sum + count, 0) : 1;
    const probOfDrawingOneJoker = totalTilesLeftInDeck > 0 ? jokersLeftInDeck / totalTilesLeftInDeck : 0;

    winningHands.forEach(winningHand => {
        let bestProb = 0;
        let bestValue = 0;
        let bestVariation = null;

        if (winningHand.variations && winningHand.variations.length > 0) {
            winningHand.variations.forEach(variation => {
                let tilesNeeded = 0;
                let nonJokerableGaps = 0; 
                let jokerReliantGaps = 0;

                const requiredTileCounts = {};
                for (const needed of variation.tiles) {
                    requiredTileCounts[needed.id] = (requiredTileCounts[needed.id] || 0) + 1;
                }

                for (const tileId in requiredTileCounts) {
                    const requiredCount = requiredTileCounts[tileId];
                    const playerHasCount = playerTileCounts[tileId] || 0;
                    
                    if (playerHasCount < requiredCount) {
                        const missingCount = requiredCount - playerHasCount;
                        tilesNeeded += missingCount;
                        
                        if (requiredCount < 3) {
                            nonJokerableGaps += missingCount;
                        }
                    }
                    
                    const maxNaturalTiles = tilesData.find(t => t.id === tileId)?.maxQuantity || 4;
                    if (requiredCount > maxNaturalTiles) {
                        const neededForQuint = requiredCount - maxNaturalTiles;
                        const playerHasForQuint = Math.max(0, playerHasCount - maxNaturalTiles);
                        jokerReliantGaps += (neededForQuint - playerHasForQuint);
                    }
                }

                const blanksOnNonJokerable = Math.min(nonJokerableGaps, playerBlankCount);
                const remainingBlanks = playerBlankCount - blanksOnNonJokerable;
                const unfillableNonJokerable = nonJokerableGaps - blanksOnNonJokerable;

                const jokerableGaps = tilesNeeded - nonJokerableGaps;
                const jokersOnJokerable = Math.min(jokerableGaps, playerJokerCount);
                
                const remainingJokerableGaps = jokerableGaps - jokersOnJokerable;
                const blanksOnJokerable = Math.min(remainingJokerableGaps, remainingBlanks);
                const unfillableJokerable = remainingJokerableGaps - blanksOnJokerable;

                const finalTilesNeeded = unfillableNonJokerable + unfillableJokerable;
                
                const handSize = variation.tiles.length || 14;
                const completionScore = (handSize - finalTilesNeeded) / handSize;

                let strategicModifier = 1.0;

                if (winningHand.isConcealed && unfillableNonJokerable > 0) {
                    strategicModifier *= Math.pow(0.65, unfillableNonJokerable);
                }

                // --- REVISED QUINT/JOKER LOGIC ---
                // This replaces the old, flat penalty with a more dynamic, probabilistic one.
                const jokersStillNeeded = Math.max(0, jokerReliantGaps - playerJokerCount);

                if (jokersStillNeeded > 0) {
                    // Calculate the probability of acquiring the necessary jokers from the wall.
                    // This is a strong penalty, as drawing specific tiles is very hard.
                    // We use Math.pow because you need to succeed multiple times.
                    const jokerAcquisitionModifier = Math.pow(probOfDrawingOneJoker, jokersStillNeeded);
                    strategicModifier *= jokerAcquisitionModifier;
                }
                
                const handValue = winningHand.value || 25;
                const strategicValue = completionScore * handValue * strategicModifier;
                
                if (strategicValue > bestValue) {
                    bestValue = strategicValue;
                    bestProb = completionScore;
                    bestVariation = variation;
                }
            });
        }
        
        results[winningHand.name] = {
            prob: bestProb,
            value: bestValue,
            bestVariation: bestVariation
        };
    });

    return results;
}

export default calculateProbabilities;