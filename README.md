# American Mah Jongg Strategic Assistant

This is a sophisticated web application built with React designed to assist players of American Mah Jongg. It serves as a strategic tool, helping players analyze their hand, understand their odds, and make informed decisions during the Charleston and the main game.

The app is currently deployed and can be viewed live at: **[https://rickybehrens.github.io/mahjongg/](https://rickybehrens.github.io/mahjongg/)**

## ✨ Features

* **Interactive Tile Selection:** A fully responsive, image-based grid allows users to input the 13 (or 14, for the dealer) tiles they were dealt.
* **Multi-Year Card Support:** A dropdown menu allows users to switch between different years of the National Mah Jongg League card (currently supports 2024-2025 and 2025-2026).
* **Dual-Metric Analysis:** For each possible winning hand, the app calculates and displays two key metrics:
    * **Probability:** A "completion score" that represents how close the player is to making the hand.
    * **Strategic Value:** A score that combines the completion score with the hand's point value and a bonus for jokerless hands, providing a more nuanced strategic recommendation.
* **Dynamic Sorting:** The list of potential hands is automatically sorted by the highest probability, allowing players to quickly identify their best options.
* **Interactive Hand Targeting:** Players can click on any hand in the list to "target" it. The main hand display will instantly re-sort to match the selected pattern, with "keeper" tiles highlighted in green, and "junk" tiles highlighted in red.
* **Intelligent Charleston Assistance:**
    * The app provides a strategic recommendation on whether to continue or skip the second Charleston based on the strength of the player's top hands.
    * It guides the user through all six passes of the Charleston, tracking the hand as it changes.
* **"Looking For" Grid:** After the Charleston is complete, the app displays a grid of the specific tiles the player is missing to complete their top hands.
* **Custom Game Rules:** Players can configure the number of Jokers and Blanks in play to match their house rules.

## 🛠️ Built With

* **React:** A JavaScript library for building user interfaces.
* **Vite:** A modern, fast build tool for web projects.
* **JavaScript (ES6+):** The core programming language.
* **CSS:** For styling and responsive design.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need to have Node.js and npm installed on your machine.

### Installation

1.  Clone the repo
    ```sh
    git clone [https://github.com/rickybehrens/mahjongg.git](https://github.com/rickybehrens/mahjongg.git)
    ```
2.  Navigate into the project directory
    ```sh
    cd mahjongg
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```
4.  Run the development server
    ```sh
    npm run dev
    ```
This will open the application in your browser, usually at `http://localhost:3000`.

