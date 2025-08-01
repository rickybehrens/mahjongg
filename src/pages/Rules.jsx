// src/pages/Rules.jsx
import React from 'react';
import PageHeader from '../components/PageHeader';
import './Rules.css'; // We'll create this new CSS file next

function Rules({ onMenuToggle }) {
    return (
        <div className="rules-page">
            <PageHeader title="How to Play American Mah Jongg" onMenuToggle={onMenuToggle} />
            <div className="rules-content">
                <div className="table-of-contents">
                    <h3>Table of Contents</h3>
                    <ul>
            <li><a href="#tiles-accessories">Mah Jongg Tiles and Accessories</a></li>
            <li><a href="#set-up">The Set-Up</a></li>
            <li><a href="#deal">The Deal</a>
              <ul className="sub-list">
                <li><a href="#card">Understanding the Mah Jongg Card</a></li>
                <li><a href="#sort-hand">Sort Your Hand</a></li>
              </ul>
            </li>
            <li><a href="#charleston">The Charleston</a></li>
            <li><a href="#game-play">Game Play</a>
              <ul className="sub-list">
                <li><a href="#hold">The Hold</a></li>
                <li><a href="#joker">The Joker</a></li>
                <li><a href="#getting-Mah Jongg">Getting your Mah Jongg</a></li>
                <li><a href="#score">The Score</a></li>
              </ul>
            </li>
            <li><a href="#additional-rules">Additional Rules</a>
              <ul className="sub-list">
                <li><a href="#table-rules">Table Rules</a></li>
                <li><a href="#blank">The Blank</a></li>
                <li><a href="#dead">Dead Hands</a></li>
              </ul>
            </li>
          </ul>
        </div>

                <p>American Mah Jongg is a variation on the Chinese game Mah Jongg, and is a game of strategy, skill and luck. Typically, there are four players seated around a table, although two or three people can also play. There are also Mah Jongg online.</p>
                <p>The objective of the game is to be the first, by drawing and discarding tiles, to match tiles to a specific hand from a National Mah Jongg League (NMJL) card. This guide follows the National Mah Jongg League rules, but many players establish table rules when learning and playing for fun.</p>
                <p>The excitement of Mah Jongg lies in the continuous decision making process. Whether playing for fun or to win a tournament, there is a place for all in the game of Mah Jongg.</p>

                <h2 id="tiles-accessories">Mah Jongg Tiles and Accessories</h2>
                <p>The following items are necessary to play Mah Jongg:</p>
                <ul>
                    <li>Mah Jongg tiles</li>
                    <li>2 Dice, optional</li>
                    <li>4 National Mah Jongg League Cards</li>
                    <li>4 Racks & Pushers</li>
                    <li>Mah Jongg mat, optional</li>
                </ul>
                <h3>Mah Jongg Tiles</h3>
                <p>Mah Jongg sets come with varying amounts of tiles. There are 152 core tiles, however, sets may include extra tiles such as blanks, seasons (to be played as flowers) and extra jokers. Players can establish table rules for whether or not to play with extra tiles.</p>
                {/* You can add images here if you have them */}

                <h2 id="set-up">The Set-Up</h2>
                <p>To set-up to play, players:</p>
                <ol>
                    <li>Place mat on table.</li>
                    <li>Position rack with the pusher away from each player.</li>
                    <li>Place Mah Jongg tiles in the middle of the table, face down, and shuffle.</li>
                    <li>Each player builds a wall against a pusher, creating a row of two tiles, facedown and stacked.</li>
                    <li>Each wall has roughly the same quantity of tiles. (Quantity of tiles vary based on table rules.)</li>
                </ol>
                <a href="#top">Return to top</a>

                <h2 id="deal">The Deal</h2>
                <h3>Select a Dealer</h3>
                <p>Each player rolls the dice and the highest roller becomes the dealer. The dealer is also referred to as “East”.</p>
                <h3>Tile Distribution</h3>
                <p>The dealer rolls the dice. The roll represents the number of stacked tiles that will remain on the dealer's wall. The dealer counts down the stacks on the wall, starting from the right, to the number rolled.</p>
                <p>Slide the pusher left past the last tile counted, and break the wall by curtsying out the leftover wall. To curtsy the wall, use the right end of the pusher to angle the tiles forward towards the opposite player. Then, slide the pusher back into place.</p>
                <p>From the curtsied wall, the dealer takes the first two stacks (four tiles). The dealer continues counterclockwise, placing two stacks in front of each player until each player has six stacks (twelve tiles). When the wall runs out, the dealer curtsies the next wall to the left (clockwise).</p>
                <p>Once each player has twelve tiles, the dealer takes the first and third top tiles from the wall. The dealer then gives one tile to each player in a counterclockwise fashion.</p>
                <p>The dealer will have fourteen tiles and each of the other players will have thirteen. Once the game begins, the dealer will discard a tile and each player will then have thirteen Mah Jongg tiles.</p>
                <a href="#top">Return to top</a>

                <h2 id="card">Understanding the Mah Jongg Card</h2>
                <h3>Categories</h3>
                <p>The NMJL card has nine categories.  There is a category for the card publication year, and all hands in this section will contain the year (ex. “2025”).  Players use the white dragon/soap for the zero.  The other three tiles can be bams, dots or cracks but must all be the same suit.</p>
                <p>Other categories include:</p>
                <ol>
                    <li>2468</li>
                    <li>Any Like Numbers</li>
                    <li>Quints</li>
                    <li>Consecutive Run</li>
                    <li>13579</li>
                    <li>Winds - Dragons</li>
                    <li>369</li>
                    <li>Singles and Pairs</li>
                </ol>
                <p>Quints hands always require a joker, whereas a player cannot use a joker for a Singles and Pairs hand.</p>
                <h3>Color</h3>
                <p>Color represents any one suit.  The colors do not relate to a particular suit but instead communicate how many different suits are needed for a hand.  A hand in all blue indicates a single suit for all fourteen tiles, while blue and green hands require two suits.  Blue, green and red require all three suits.</p>
                <p>Flowers and Winds are always blue on the card but do not have a suit.  The white dragon/soap does not have a suit when used for as a zero.</p>
                <h3>Values</h3>
                <p>Next to each hand is an “X” or a “C” indicating whether the hand is exposed or concealed and a value.  Unlike a concealed or “C” hand,  the “X” means the player can expose the hand by picking up a discarded tile as explained HERE.</p>
                <p>Next to the “X” or “C” is a value.  This indicates the score for the hand, with more difficult hands lending a higher value.  Players use the value of the hand when keeping score.</p>
                <a href="#top">Return to top</a>

                <h2 id="sort-hand">Sort Your Hand</h2>
                <p>Each player takes their tiles and displays them on a rack.  Players then sort their hands.  One recommendation is to place tiles in this order - jokers, blanks, flowers, winds, dragons, and then each suit, numerically low to high.</p>
                <p>The player’s goal in sorting tiles is to determine the best possible category for their hand. </p>
                <p>To determine the best possible category, players should:</p>
                <ol>
                    <li>Identify multiples - pairs, pungs (3 identical tiles) and kongs (4 identical tiles).</li>
                    <li>Gather tiles that support the multiples and fit a category on the card.</li>
                    <li>If there are no multiples, look for a pattern that matches a category on the card, such as odds, evens, or consecutive run.</li>
                </ol>
                <p>Players move Mah Jongg tiles that do not support the selected category to the right end of the rack for future discard.</p>
                <a href="#top">Return to top</a>

                <h2 id="charleston">The Charleston</h2>
                <p>The Charleston is a ritual allowing a player to pass and receive three Mah Jongg tiles at a time with the goal of improving the hand.</p>
                <p>There are two Charlestons.  To remember the order, players use the acronym “ROLLOR”.  The first Charleston is Right, Over, Left and is mandatory.   After the Left pass, any player can stop the Charleston.</p>
                <p>If no player stops the Charleston then players continue with the second Charleston, Left, Over, Right.</p>
                <p>For each pass, players identify three Mah Jongg tiles that do not help their hands.  Players pass the tiles facedown.  Once a player passes three tiles, the player may then pick up the three received tiles.  At this point, players reevaluate their hands to see if their new tiles improve their hand or potentially move them to a different category on the card.</p>
                <p>Players cannot pass jokers in the Charleston.</p>
                <p>At the end of the Charleston, players opposite each other may mutually agree to exchange zero, one, two or three tiles.  This is called often referred to as an optional pass or a courtesy pass.</p>
                <p>Once the Charleston and optional pass are complete, players should have a category and possibly a specific hand in mind. </p>
                <h3>What to Pass</h3>
                <p>When passing tiles, players should pass defensively by not passing pairs, same numbers, flowers or dragons.  If passing winds, a player should only pass one wind at a time.</p>
                <h3>Blind Pass</h3>
                <p>For the last pass on each Charleston (the first left and the final right), a player can do a blind pass if the player does not have three unwanted tiles to pass.  In the blind pass, the player can take one, two or three of the tiles received and include them in the player’s own pass.  For example, if a player only wants to pass one tile, the player may blindly take two received tiles, add one tile from the player’s hand, and pass the three tiles to the next player. </p>
                <a href="#top">Return to top</a>

                <h2 id="game-play">Game Play</h2>
                <p>The dealer begins by discarding a tile face up and verbally naming the tile for everyone to hear.  Each player’s discard is said aloud for all players to hear.  As soon as the tile touches the mat or the tile has been named, it is considered discarded.</p>
                <p>Moving counterclockwise, the next player draws a tile from the wall and adds it to their rack.  With each draw, players are looking to improve their hand. The player then selects and discards an unwanted tile, naming it aloud. Play continues counterclockwise.</p>
                <p>When a wall runs out of tiles, the player clockwise will curtsy their wall for players to draw tiles. </p>
                <a href="#top">Return to top</a>

                <h2 id="hold">The Hold</h2>
                <p>When a tile is discarded, any player can pause the game to pick up the most recently discarded tile.  Player must announce “HOLD” before the next player draws AND places the tile in their rack.</p>
                <ol>
                    <li>To pick up a tile, it must complete a pung (3 identical tiles), kong (4 identical tiles) or quint (5 identical tiles, with use of a joker) for an exposed hand.  Remember to never pick up for a concealed hand, unless it is the final tile needed to declare Mah Jongg.</li>
                    <li>Players may use one or more jokers for the exposed pung/kong/quint.</li>
                    <li>Players cannot pick up a discarded tile for a single or a pair unless it is the final tile necessary to declare Mah Jongg.  This is one of the most important rules when playing Mah Jongg.</li>
                    <li>Accordingly, except to declare Mah Jongg, players cannot pick up a discarded tile to complete “NEWS” or to complete the year (ex. “2025”), as these are a group of singles. </li>
                    <li>The player who picks up a tile must expose the pung/kong/quint on top of the rack for all to see.</li>
                    <li>The player then discards an unwanted tile and play resumes with the player counterclockwise of the player who paused the game.  This may mean skipping other players’ turns.</li>
                    <li>When more than one player pauses the game, the player nearest in turn takes the discard unless the other player has started their exposure or can declare Mah Jongg.</li>
                    <li>Once a player exposes part of a hand, the exposure cannot be touched again throughout the game unless to replace a joker with the correct tile.</li>
                    <li>The player can retract the pause if the player decides not to pick up the discarded tile. </li>
                </ol>
                <a href="#top">Return to top</a>

                <h2 id="joker">The Joker</h2>
                <p>One of the most important rules of Mah Jongg is that a player cannot use a joker for a single or pair. A joker can substitute for a tile(s) in a pung, kong, or quint combination.</p>
                <p>Accordingly, a player cannot use a joker for “NEWS” or for the year (ex. “2025”), as these are a group of singles.</p>
                <p>During a player’s turn, the player can swap a specific tile for an exposed joker.</p>
                <p>If a player discards a joker, it is considered dead and no player can pick it up from the table.</p>
                <a href="#top">Return to top</a>

                <h2 id="getting-Mah Jongg">Getting your Mah Jongg</h2>
                <p>When a player completes a hand, either by drawing a tile or pausing to pick up their final tile, the player says “Mah Jongg!”.  The player then exposes the hand, sharing the category and line from the NMJL card to confirm Mah Jongg.</p>
                <p>For the fourteenth tile, a player can pause to pick up for any tile in the hand. This is the only time a player can pick up a discarded tile for a single or a pair. </p>
                <p>A player with a concealed hand can also use a discarded tile to declare Mah Jongg.</p>
                <a href="#top">Return to top</a>

                <h2 id="score">The Score</h2>
                <p>The card has a value for each hand next to the “X” or “C”.</p>
                <p>For basic scoring, the winner receives the value indicated on the NMJL card.</p>
                <p>Advanced scoring rules include:</p>
                <ol>
                    <li>The player who discarded a tile from which another player declares Mah Jongg must pay twice the value, while the other players pay only the value noted on the card.</li>
                    <li>If the final tile is drawn from the wall, players pay the winner twice the value.</li>
                    <li>If the winning hand does not contain jokers, players pay the winner double the value.</li>
                </ol>
                <a href="#top">Return to top</a>

                <h2 id="additional-rules">Additional Rules</h2>
                <h2 id="table-rules">Table Rules</h2>
                <p>Players often establish table rules, also called house rules, instead of playing strictly by the NMJL rules. Examples of table rules include:</p>
                <ol>
                    <li>Dealer does not roll dice to break the wall for tile distribution.</li>
                    <li>When taking a tile from the wall, a player can tap the tile on rack (instead of the NMJL rule to place tile in the rack). Once tapped, another player cannot pause the game for the most recently discarded tile.</li>
                    <li>Playing the game with blank tiles.</li>
                </ol>
                <h2 id="blank">The Blank</h2>
                <p>Some players use the blank Mah Jongg tiles that often come in a Mah Jongg set.  Table Rules determine how to use a blank. Table rules are separate and apart from the National Mah Jongg League Rules. A popular table rule is:</p>
                <ol>
                    <li>Using the blank to exchange for a discarded tile</li>
                    <ul>
                        <li>A player can exchange a blank tile for any discarded tile (except for a discarded joker) at any time during the game, not just during the player’s turn.</li>
                        <li>Once a blank is discarded, it is dead and no player can pick it up.</li>
                    </ul>
                </ol>
                <h2 id="dead">Dead Hands</h2>
                <p>The following rules are truly next-level and are only for the advanced player who wants to play by the books.  Many of these rules can be overlooked when learning the game or playing casually.</p>
                <p>A player is out of the game or “dead” when:</p>
                <ol>
                    <li>A player has too few or too many tiles.</li>
                    <li>A player has exposed too few or too many tiles to make any hand.</li>
                    <li>A player curtsies out the wrong wall or takes a tile from the wrong wall.</li>
                    <li>A player is able to determine another player cannot win based on exposures and/or discards.</li>
                    <li>A player incorrectly declares Mah Jongg and exposes hand.</li>
                </ol>
                <p>When a player’s hand is dead, the player can no longer draw and discard.  However, any exposed tiles remain on the player’s rack, and other players can exchange tiles for any exposed jokers.</p>
                <a href="#top">Return to top</a>
            </div>
        </div>
    );
}

export default Rules;