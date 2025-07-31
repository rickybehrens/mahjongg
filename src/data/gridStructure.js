// src/data/gridStructure.js
import tilesData from './tiles';

// This file organizes your raw tile data into a structure that matches the grid layout.

const suitsOrder = ["Dot", "Bamboo", "Crack"];
const windsOrder = ["North", "East", "South", "West"];

const structuredGrid = {
  // Create an array for the three main suit rows
  suits: suitsOrder.map(suit => ({
    name: suit,
    // Get all numbered tiles for the suit and sort them
    tiles: tilesData.filter(t => t.suit === suit && typeof t.value === 'number').sort((a,b) => a.value - b.value),
    // Find the matching dragon for the suit
    dragon: tilesData.find(t => t.suit === suit && String(t.value).includes('Dragon')),
  })),

  // Create an array for the wind tiles in the correct order
  winds: windsOrder.map(wind => tilesData.find(t => t.suit === "Wind" && t.value === wind)).filter(Boolean),
  
  // Group all remaining special tiles together
  special: {
    flowers: tilesData.filter(t => t.suit === "Flower"),
    jokers: tilesData.filter(t => t.suit === "Joker"),
    blanks: tilesData.filter(t => t.suit === "Blank"),
  }
};

export default structuredGrid;
