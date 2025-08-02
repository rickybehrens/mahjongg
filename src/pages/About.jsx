// src/pages/About.jsx
import React from 'react';
import PageHeader from '../components/PageHeader';

function About({ onMenuToggle }) {
  return (
    <div>
      <PageHeader title="About This App" onMenuToggle={onMenuToggle} />
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
        <h2>Welcome to the American Mah Jongg Strategic Assistant!</h2>
        <p>This tool is designed to help you make sense of your initial hand and navigate the Charleston with confidence. By analyzing your tiles against the official NMJL card, it suggests the strongest hands to aim for and guides you through every pass.</p>
        
        <h3>Here’s how to use it step-by-step:</h3>
        
        <h4>1. Game Setup</h4>
        <p>Before you begin, tell the app about your game:</p>
        <ul>
          <li><strong>Choose Your Card:</strong> Select the NMJL card year you are playing with (e.g., 2024-2025 or 2025-2026).</li>
          <li><strong>Dealer Status:</strong> Are you the dealer? Select 'Yes' to input 14 tiles, or 'No' for 13 tiles.</li>
          <li><strong>Custom Rules:</strong> Set the number of Jokers (usually 8 or 10) and Blanks in play to match your group's rules.</li>
        </ul>

        <h4>2. Input Your Hand</h4>
        <p>Click or tap on the tile images to select the tiles you were dealt. Once you have selected all your tiles, click the "Confirm Hand" button.</p>

        <h4>3. Analyze Your Options</h4>
        <p>Once your hand is confirmed, the app will instantly analyze it. Below your hand, you'll see a list of the best potential hands you could make, sorted from best to worst. For each potential hand, you will see two scores:</p>
        <ul>
            <li><strong>Probability:</strong> This score shows how close you are to completing that specific hand. The higher the score, the fewer tiles you need.</li>
            <li><strong>Strategic Value:</strong> This score is more advanced. It combines the Probability with the hand's point value. A high-value hand that is also easy to make will have a very high Strategic Value. This helps you decide between two hands that have a similar probability.</li>
        </ul>
        <p>On your main hand display, the tiles will be color-coded based on the #1 ranked hand:</p>
        <ul>
            <li><strong>Green Margin:</strong> These are "keeper" tiles for your best hand.</li>
            <li><strong>No Margin:</strong> These are "junk" tiles that don't fit into your best hand. They are your primary candidates to pass during the Charleston.</li>
            <li><strong>Yellow Margin:</strong> These are "either" tiles, which could potentially be used in different groups for the same hand (e.g., a 3 Crak could be part of a Pung or a Kong).</li>
        </ul>

        <h4>4. Navigating the Charleston</h4>
        <p>This is where the assistant really shines. It will guide you through all six passes.</p>
        <ul>
            <li><strong>Passing Tiles:</strong> For each pass, select three tiles to give away (the tiles without margins are your best bets).</li>
            <li><strong>Receiving Tiles:</strong> After you pass, select the three new tiles you received from another player. Your hand and the list of potential hands will automatically update.</li>
            <li><strong>To Continue or To Stop?</strong> After the first Charleston is complete, the app will analyze your improved hand and give you a strategic recommendation: Continue with the second Charleston or Stop.</li>
            <li><strong>The Final Pass:</strong> If you choose to stop, or after the second Charleston is complete, the app will guide you through the final courtesy pass with the player across from you.</li>
        </ul>

        <h4>5. After the Charleston: Planning Your Game</h4>
        <p>Once the Charleston is over, your final starting hand is set. You can now use the app to focus on your goal.</p>
        <ul>
            <li>Click on any hand in the results list to "target" it. When you do, the tile colors in your main hand will update instantly to show you the keepers for that specific targeted hand.</li>
            <li>Below your hand, a "Looking For" grid will also appear, showing you the exact tiles you need to draw to complete your targeted hand.</li>
        </ul>
        
        <p><strong>We hope this tool helps you learn faster, play smarter, and enjoy the wonderful game of American Mah Jongg!</strong></p>
      </div>
    </div>
  );
}

export default About;
