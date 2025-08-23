// src/pages/Tutorial.jsx
import React from 'react';
import './Tutorial.css'; // We'll create this file for styling

// Import your screenshots from the assets folder
import step1Image from '../assets/tutorial_images/step1.png';
import step2Image from '../assets/tutorial_images/step2.png';
import step3Image from '../assets/tutorial_images/step3.png';
import step4Image from '../assets/tutorial_images/step4.png';
import step5Image from '../assets/tutorial_images/step5.png';
import step6Image from '../assets/tutorial_images/step6.png';
import step7Image from '../assets/tutorial_images/step7.png';
import step8Image from '../assets/tutorial_images/step8.png';
import step9Image from '../assets/tutorial_images/step9.png';
import step10Image from '../assets/tutorial_images/step10.png';
import step11Image from '../assets/tutorial_images/step11.png';
import step12Image from '../assets/tutorial_images/step12.png';
import step13Image from '../assets/tutorial_images/step13.png';
import step14Image from '../assets/tutorial_images/step10.png';

function Tutorial() {
    return (
        <div className="tutorial-container">
            <h1>How to Use the American Mah Jongg Charleston Assistant</h1>

            <p>This guide will walk you through the key features of the app, from selecting your initial hand to understanding the Charleston recommendations.</p>

            {/* --- Step 1 --- */}
            <h2>Step 1: Choose the Year of the Card you want to play with. Then, specify how many jokers and how many blanks will be in the game. Finally, let the app know if you are the dealer. This will determine how many tiles you are dealt.</h2>
            <p>Begin by selecting the 13 tiles (or 14 if you are the Dealer) that you were dealt. You can click on a tile's image to add it to your hand.</p>
            <img src={step1Image} alt="Screenshot of the top section grid" className="tutorial-image" />
            <p>Select the year from the drop down list. If you are the <strong>DEALER</strong>, you will have to click the box as you will be dealt 14 tiles instead of 13. American Mah Jongg can be played with a different number of jokers (8 or 10) and it can be played with <strong>or without blanks</strong>. You will have to select the combination you will be playing with.</p>

            <hr />

            {/* --- Step 2 --- */}
            <h2>Step 2: Selecting Your Initial Hand</h2>
            <p>Begin by selecting the 13 tiles (or 14 if you are the Dealer) that you were dealt. You can click on a tile's image to add it to your hand.</p>
            <img src={step2Image} alt="Screenshot of the tile selection grid" className="tutorial-image" />
            <p>Use the <strong>"-"</strong> button below each tile to remove it if you make a mistake. The counter in the top-right will show how many tiles you've selected. Once you selected all 13 tiles (14 if you are the Dealer), a green button will appear to "Comfirn Hand & Start Charleston".</p>
            <img src={step3Image} alt="Screenshot of the comfirm button" className="tutorial-image" />

            <hr />

            {/* --- Step 3 --- */}
            <h2>Step 3: The Charleston</h2>
            <p>Once you confirm your hand, the app will show you the top-rated hands based on your tiles, sorted by probability.</p>
            <p>Your hand at the top will re-sort to show you which tiles are "keepers" (green border) and which are "junk" (red border).</p>
            <p>Select three junk tiles to pass (blue border).</p>
            <p>The "Exchange" button will turn on once you have selected three tiles.</p>
            <img src={step4Image} alt="Screenshot of the Charleston view with a targeted hand" className="tutorial-image" />
            
            <hr />

            {/* --- Step 4 --- */}
            <p>Once the exchange tiles are confirmed, you will select which 3 tiles did your playing give you.</p>
            <img src={step5Image} alt="Screenshot of received tiles" className="tutorial-image" />

            <hr />

            {/* --- Step 5 --- */}
            <p>After confirming the received tiles by clicking on the green button, the app will update your hand.</p>
            <img src={step6Image} alt="Screenshot of the updated hand" className="tutorial-image" />

            <hr />

            {/* --- Step 6 --- */}
            <p>On the <strong>FIRST LEFT and the LAST RIGHT</strong> exchange, the user can blind pass 1, 2, or 3 tiles. You will get that option everytime it is possible.</p>
            <p>If you would like to blind pass, simply click on the "Blind Pass" button and select from the dropdown menu how many tiles will you be passing blindly and complete the three tiles with which ever you selected from your hand.</p>
            <p>After, you will have to input again which tiles did you receive to complete your hand.</p>
            <img src={step7Image} alt="Screenshot of blind pass option" className="tutorial-image" />

            <hr />

            {/* --- Step 7 --- */}
            <p>After the first round of the Charleston is complete, the app will recommend whether you should continue to the second Charleston or skip it based on the strength of your hand.</p>
            <p>If you choose to continue, the process is the same as the first Charleston.</p>
            <img src={step8Image} alt="Screenshot of the second Charleston recommendation" className="tutorial-image" />

            <hr />

            {/* --- Step 8 --- */}
            <p>If you continue, everything will repeat. If you <strong>SKIP</strong> the second Charleston round, the app will finalize your hand and you can proceed to the next phase of the game.</p>
            <img src={step9Image} alt="Screenshot of the skip second Charleston" className="tutorial-image" />

            <hr />

            {/* --- Step 9 --- */}
            <p>Finally, you will have to select which tiles do you pass during the "Final Pass Across". The app will recommend which tiles to pass based on the strength of your hand.</p>
            <p>You can choose to pass 0, 1, 2, or 3 tiles. Select the tiles you want to pass and click on the green button to finalize your hand.</p>
            <img src={step10Image} alt="Screenshot of the final pass across" className="tutorial-image" />
            <img src={step11Image} alt="Screenshot of the final pass across" className="tutorial-image" />
            <img src={step12Image} alt="Screenshot of the final pass across" className="tutorial-image" />
            <img src={step13Image} alt="Screenshot of the final pass across" className="tutorial-image" />

            <hr />

            {/* --- Step 10 --- */}
            <p>After confirming what tiles you passed across, you will select which tiles you received and confirm your final hand.</p>
            <p>The helper will show your probabilities and which tiles you are missing to complete the selected hand!</p>
            <img src={step14Image} alt="Screenshot of the final hand confirmation" className="tutorial-image" />

            <hr />

            <h2>You're All Set! GOOD LUCK!!!</h2>

        </div>
    );
}

export default Tutorial;