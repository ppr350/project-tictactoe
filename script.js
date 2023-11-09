// Store the gameboard as an array inside of a gameboard object,
// and pass it to DOM. The works is initialized by the 'init' function
(function() {

    const gameBoard = {
 
        init: function() {

            this.setBoard();
            this.displayBoard();
        },

        setBoard: function() {
            return board = [
                1, 2, 3,
                4, 5, 6,
                7, 8, 9
            ];
        },
        
        // A function to render the contents of the gameboard array to the webpage
        displayBoard: function() {
            console.log('setting up gameboard')
            let containerDiv = document.querySelector('#container');
            for (let x = 0; x < 9; x++) {
                let makeDiv = document.createElement('div');
                makeDiv.setAttribute('id', board[x]);
                makeDiv.setAttribute('class', 'box');
                containerDiv.appendChild(makeDiv);
            }
        }
    };

    gameBoard.init();

})();


// Create players with factory function
const createPlayer = (function(name, marker) {
    const player = {};
    player.name = name;
    player.marker = marker;
    return player;
})

// Players are stored in objects
const player1 = createPlayer('Player 1', 'X');
const player2 = createPlayer('Player 2', 'O');


// A function to allow players to add marks to a specific spot on the board
// and then tie it to the dom, letting players click on the ganmboard to place their marker
(function() {

    const gameLogic = {

        init: function() {

            this.listenToClick();
            this.switchPlayer();
        },

        // Listen to user's click on boxes
        listenToClick: function() {
            const getBoxes = document.querySelectorAll('.box');
            for (i = 0; i < getBoxes.length; i++) {
                getBoxes[i].addEventListener('click', this.makeMove);
            }
        },

        // Put X or O to box
        makeMove: function() {
            if (this.innerText === '') {
                this.innerText = 'X';
            } else {
                console.log('this box is not available');
                return
            }
        },

        // Switch player
        switchPlayer: function() {
            const { player, marker} = player1;
            console.log(player1)
        }
    };



    gameLogic.init()

})();

// Create display controller with module pattern
// let displayController = (function() {

// })();



// Game logic to check for when the game is over, should check for 3-in-a-row and a tie

// An interface to allow players to put in their names, include a button to start / restart the game. Also add a display element that congratulates the winning player

// As little code as possible, try tucking everything away inside of a module or factory



// Bonus / Optional :

// Create an AI so that a player can play against the computer


// Start by just getting the computer to make a random legal move

// Next step is making the computer smart.
