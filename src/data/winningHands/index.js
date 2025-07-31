// src/data/winningHands/index.js
import hands2024 from './2024-2025.js';
import hands2025 from './2025-2026.js'; // This line is now active

export const winningHandsData = {
    "2025-2026": hands2025, // Added the new year
    "2024-2025": hands2024,
};

// This exports the list of available years for the dropdown.
// The sorting logic automatically places the latest year first, making it the default.
export const availableYears = Object.keys(winningHandsData).sort((a, b) => b.localeCompare(a));
