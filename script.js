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

    const startButtonFor2Players = document.querySelector('#start-game-2-players');
    const startButtonForPlayAgainstAi = document.querySelector('#start-game-vs-ai');
    const showNameDialog = document.querySelector('#name-dialog');
    const showWinnerDialog = document.querySelector('#win-dialog');
    const form = showNameDialog.querySelector('#form');
    const confirm = form.querySelector('#confirm-button');
    const noname = form.querySelector('#no-name');
    const cancel = form.querySelector('#cancel-button');
    const nameDialog = document.querySelector('#name-dialog');
    const winnerDialog = document.querySelector('#win-dialog');
    let p1InputName = nameDialog.querySelector('#p1-input-name');
    let p2InputName = nameDialog.querySelector('#p2-input-name');
    let errorMessage = nameDialog.querySelector('#error-message');
    let announceWinner = winnerDialog.querySelector('#announce-win');
    let player1CustomName = document.querySelector('#p1-custom-name');
    let player2CustomName = document.querySelector('#p2-custom-name');

    let whosTurn = player1;

    const gameLogic = {

        init: function() {
            this.startGame()
        },

        startGame: function() {
            
            // 2 Players mode
            startButtonFor2Players.addEventListener('click', ()  => {
                p1InputName.value = '';
                p2InputName.value = '';
                p2InputName.placeholder = 'Your name';
                showNameDialog.showModal();
                this.submitForm();
            });

            // VS AI
            startButtonForPlayAgainstAi.addEventListener('click', () => {
                p1InputName.value = '';
                p2InputName.value = '';
                p2InputName.placeholder = 'Artificial Intelligent'
                showNameDialog.showModal();
                this.submitForm();
            })
        },

        submitForm: function() {
            
            confirm.addEventListener('click', (e) => {          
                e.preventDefault();
                console.log('reach submitForm function')
                console.log(p1InputName.value)
                console.log(p2InputName.value)

                // display error message for invalid name
                if (p1InputName.value.length == 0) {
                    errorMessage.innerText = 'Please fill in a name or press PLAY ANONYMOUSLY.'
                    return

                } if (p1InputName.value.length > 10 || p2InputName.value.length > 10) {
                    errorMessage.innerText = 'Name is too long.'
                    return

                } else {
                    // make changes here to make current player (1 or 2) to insert name
                    this.getNames()
                    showNameDialog.close();
                };
                  
                this.render();
            });

            noname.addEventListener('click', () => {
                console.log('Play without name');
                player1CustomName.innerText = '';
                player2CustomName.innerText = '';
                showNameDialog.close();
                this.render();
            })

            cancel.addEventListener('click', (e) => {
                showNameDialog.close();
            })

        },

        getNames: function() {
            player1CustomName.innerText = p1InputName.value;
            player2CustomName.innerText = p2InputName.value;
        },

        render: function(e) {
            console.log('start game')
            this.clearBoard()
            this.listenToMove();
        },

        // Listen to user's click on boxes
        listenToMove: function() {
            const getBoxes = document.querySelectorAll('.box');
            for (let i = 0; i < getBoxes.length; i++) {
                // All 'this' refers to the div elements that triggered the event, so I need to use 'this.makeMove.bind(this)' instead of just 'this.makeMove' to
                // make it refers to the gameLogic object instead :
                getBoxes[i].addEventListener('click', this.makeMove.bind(this));
            };
        },

        deleteMove: function() {
            const emptyBoxes = document.querySelector('.box');
            for (i = 0; i < emptyBoxes.length; i++) {
                emptyBoxes[i].innerText === '';
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
                } else if (e.target.innerText !== '') {
                    console.log('this box is not available');
                    return           
                }
            }
        },

        // Log players' moves:
        logMove: function(e) {
            let regexPlayer1 = /1/;
            let getBoxNum = parseInt(e.target.id)

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

        clearBoard: function(e) {
            console.log('clearing up gameboard')
            const board = document.querySelector('#container').childNodes;
            for (let i = 0; i < board.length; i++) {
                board[i].innerText = '';
                player1.moves = [];
                player2.moves = [];
            }
            this.deleteMove();
            whosTurn = player1;
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

            let includesEveryMove = (moves, winCombo) => winCombo.every(element => moves.includes(element))
            for (let i = 0; i < winningCombos.length; i++) {
                if (includesEveryMove(getPlayer.moves, winningCombos[i])) {
                    console.log(getPlayer.moves, winningCombos[i]);
                    console.log(`${getPlayer.name} has won this round`);
                    announceWinner.innerText = `${getPlayer.name} has won this round`;
                    this.gameOver();                
                    break
                }
            }
        },

        // Call this function when there is no winner or someone has won
        gameOver: function(getPlayer) {
            console.log('Game is over')
            // console.log(getPlayer.names)
            this.winningModal();
        },

        // Announce winner
        winningModal: function(getPlayer) {
            // console.log()
            // announceWinner.innerText = getPlayer.name
            showWinnerDialog.showModal();
            this.playAgain();
        },

        playAgain: function() {
            document.querySelector('#play-again').addEventListener('click', (e) => {
                showWinnerDialog.close();
                this.clearBoard()
                gameLogic.init();
            })
        },

    };
    gameLogic.init()

})();


// An interface to allow players to put in their names, include a button to start / restart the game. Also add a display element that congratulates the winning player

// As little code as possible, try tucking everything away inside of a module or factory



// Bonus / Optional :

// Create an AI so that a player can play against the computer


// Start by just getting the computer to make a random legal move

// Next step is making the computer smart.
