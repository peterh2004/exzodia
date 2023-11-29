// Wait for the DOM to be fully loaded before executing the JavaScript
window.addEventListener('DOMContentLoaded', () => {
    // Selecting elements from the DOM
    const tiles = Array.from(document.querySelectorAll('.tile')); // Array of tile elements
    const playerDisplay = document.querySelector('.display-player'); // Player display element
    const resetButton = document.querySelector('#reset'); // Reset button element
    const announcer = document.querySelector('.announcer'); // Announcer element

    // Initial game state
    let board = ['', '', '', '', '', '', '', '', '']; // Represents the Tic Tac Toe board
    let currentPlayer = 'X'; // Current player (initially X)
    let isGameActive = true; // Flag to check if the game is still active

    // Constants for game outcomes
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    // Possible winning combinations on the board
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Function to check if the current state of the board represents a winning condition
    function handleResultValidation() {
        let roundWon = false;

        // Iterate through each winning condition
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];

            // Check if the cells in the current winning condition are all filled with the same player's symbol
            if (a === '' || b === '' || c === '') {
                continue; // Skip to the next iteration if any cell is empty
            }

            if (a === b && b === c) {
                roundWon = true; // Set the flag to true if the condition is met
                break; // Exit the loop since a winning condition is found
            }
        }

        // Check the result of the round
        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        // If there are no empty cells and no winner, it's a tie
        if (!board.includes('')) {
            announce(TIE);
        }
    }

    // Function to display the game outcome in the announcer element
    const announce = (type) => {
        switch (type) {
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide'); // Display the announcer element
    };

    // Function to check if a tile is a valid move
    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O') {
            return false;
        }
        return true;
    };

    // Function to update the game board with the current player's move
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    // Function to switch to the other player after a move
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    // Function to handle a user's action (clicking a tile)
    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    // Function to reset the game board and start a new game
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        // If the current player is 'O', switch to 'X' for the new game
        if (currentPlayer === 'O') {
            changePlayer();
        }

        // Reset each tile on the board
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    // Event listeners for each tile to handle user clicks
    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    // Event listener for the reset button to start a new game
    resetButton.addEventListener('click', resetBoard);
});
