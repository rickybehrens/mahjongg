// src/helpers/randomHandGenerator.js
import tiles from '../data/tiles';

/**
 * Creates a full deck of 152 tiles based on game settings.
 * @param {object} gameSettings - Contains jokerCount and blankCount.
 * @returns {Array} A full deck of tile objects.
 */
function buildDeck(gameSettings) {
    const deck = [];
    tiles.forEach(tileInfo => {
        let count = 0;
        if (tileInfo.id === 'JOKER') {
            count = gameSettings.jokerCount || 8;
        } else if (tileInfo.id === 'BLANK') {
            count = gameSettings.blankCount || 0;
        } else {
            count = tileInfo.maxQuantity || 4;
        }
        for (let i = 0; i < count; i++) {
            deck.push({ ...tileInfo });
        }
    });
    return deck;
}

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * @param {Array} array - The array to be shuffled.
 */
function shuffleDeck(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Generates a random hand of a specified size.
 * @param {object} gameSettings - Contains jokerCount, blankCount, and handSize.
 * @returns {object} A hand object with tile IDs as keys and quantities as values.
 */
export function generateRandomHand(gameSettings) {
    const deck = buildDeck(gameSettings);
    shuffleDeck(deck);

    const handSize = gameSettings.handSize || 13;
    const drawnTiles = deck.slice(0, handSize);

    const handObject = {};
    drawnTiles.forEach(tile => {
        handObject[tile.id] = (handObject[tile.id] || 0) + 1;
    });

    return handObject;
}
