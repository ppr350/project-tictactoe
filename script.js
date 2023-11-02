// Store the gameboard as an array inside of a gameboard object
let gameboardObject = {

    gameboardArray: []
}

// Create players with factory function

// Players are stored in objects

// An object to control the flow of the game

const listenToClick = (function() {
    const getBoxes = document.querySelectorAll('.box');
    for (i = 0; i < getBoxes.length; i++) {
        getBoxes[i].addEventListener('click', function(e) {
            console.log(this.id)
            if (this.innerText === '') {
                this.innerText = 'X';
            } else {
                return;
            }
        });
    }
})();

// Create display controller with module pattern
let displayController = (function() {

})();

// Create game board with module pattern
let board = (function() {

})();

// A function to render the contents of the gameboard array to the webpage

// A function to allow players to add marks to a specific spot on the board, and then tie it to the dom, letting players click on the ganmboard to place their marker

// Game logic to check for when the game is over, should check for 3-in-a-row and a tie

// An interface to allow players to put in their names, include a buttob to start / restart the game. Also add a display element that congratulates the winning player

// As little code as possible, try tucking everything away inside of a module or factory



// Bonus / Optional :

// Create an AI so that a player can play against the computer


// Start by just getting the computer to make a random legal move

// Next step is making the computer smart.
