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
        
        // A function to render the contents of the gameboard array to the webpage :
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
    player.moves = [];
    return player;
})

// Players are stored in objects
const player1 = createPlayer('Player 1', 'X');
const player2 = createPlayer('Player 2', 'O');

// A function to allow players to add marks to a specific spot on the board
// and then tie it to the dom, letting players click on the ganmboard to place their marker
(function() {

    let whosTurn = player1;
    let gameInProgress = false;

    const gameLogic = {

        gameOn: function() {
            this.render()
        },

        render: function() {
            const startGame = document.querySelector('#start-game');
            startGame.addEventListener('click', this.init())  
            console.log('render game');
            gameInProgress = true;
        },

        init: function() {

            this.listenToClick();
  
        },

        // Listen to user's click on boxes
        listenToClick: function() {
            const getBoxes = document.querySelectorAll('.box');
            for (i = 0; i < getBoxes.length; i++) {
                // All 'this' refers to the div elements that triggered the event, so I need to use 'this.makeMove.bind(this)' instead of just 'this.makeMove' to
                // make it refers to the gameLogic object instead :
                getBoxes[i].addEventListener('click', this.makeMove.bind(this));
            }
        },

        // Put X or O to box; then switch player :
        makeMove: function(e) {
            // When a click is triggered, an 'event' is an object containing information about the action that just happened
            // So when I'm interested in an 'event', it's when I add an 'eventListener' to the element I know will create 'event'
            // the event parameter 'e' above locates the new 'event', and when I use 'e.target.innerText' in the if else statement below,
            // it traces back to the click 'event' (which button is clicked in this case)
            // Thank you u/jml26 on Reddit's r/learnJavascript for this

            if (e.target.innerText == '') {
                if (whosTurn == player1) {
                    e.target.innerText = 'X';
                    this.logMove(e)
                    whosTurn = player2;
          
                    
                } else if (whosTurn == player2) {
                    e.target.innerText = 'O';
                    this.logMove(e)
                    whosTurn = player1;
                
                }

            } else if (e.target.innerText !== '') {
                console.log('this box is not available');
                return
            }
        },

        // Log players' moves:
        logMove: function(e) {
            let regexPlayer1 = /1/;
            let getBoxNum = e.target.id

            if (regexPlayer1.test(whosTurn.name)) {
                if (player1.moves.length < 4) {
                    player1.moves.push(getBoxNum);
                    whosTurn = player2;
                    console.log(`Player 1 put the ${player1.marker} on box ${player1.moves}`);
                    this.checkWin(player1);
                } else {
                    this.gameOver();
                }
            } else {
                player2.moves.push(getBoxNum);
                whosTurn = player1;
                console.log(`Player 2 put the ${player2.marker} on box ${player2.moves}`);
                this.checkWin(player2)
            };

        },

        // Game logic to check for when the game is over, should check for 3-in-a-row and a tie :
        checkWin: function(getPlayer) {
            const winningCombos = [
                [1, 2, 3],
                [1, 5, 9],
                [1, 4, 7],
                [2, 5, 8],
                [3, 6, 9],
                [3, 5, 7],
                [4, 5, 6],
                [7, 8, 9],
            ]

            function findMatch(a, b) {
                return a.some(nestedArray => nestedArray.toString() == b.toString());
            };
            
            if (findMatch(winningCombos, getPlayer.moves.sort())) {
                console.log('winner')
                this.gameOver();
                this.init()
            };
        },

        // Call this function when there is no winner
        gameOver: function() {
            console.log('Game is over')

        }


    };

    // gameLogic.init()
    gameLogic.gameOn()

})();

// Create display controller with module pattern
// let displayController = (function() {

// })();




// An interface to allow players to put in their names, include a button to start / restart the game. Also add a display element that congratulates the winning player

// As little code as possible, try tucking everything away inside of a module or factory



// Bonus / Optional :

// Create an AI so that a player can play against the computer


// Start by just getting the computer to make a random legal move

// Next step is making the computer smart.
