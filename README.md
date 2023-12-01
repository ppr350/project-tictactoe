# project-tictactoe

## This project is part of The Odin Project's Full Stack JavaScript Course.

### The project

The aim of this project is to create a simple Tic-Tac-Toe / X's and O's game using mainly factory function and module pattern - IIFEs.

## HTML

This HTML files contains 2 dialogs that are closed by default, one of which has a name entry form when called, and several buttons to control the flow of the game.

It has an empty div to be used after to house the TicTacToe / Xs and Os gameboard.

## JavaScript

### Factory Function

Factory function is a function that can create an object and returns it. It is similar to constructor function that I've learned previously.

Because I only needed to create 2 players object when the page loads, I used Factory Function to do it. the 'createPlayer' factory function set up and return the new objects when I called the function. In this case they are 'player.name', 'player.maker' and 'player.moves'.

### Module Pattern - IIFE

The idea of IIFE (Immediately Invoked Function Expression) is to execute a JavaScript function as soon as it is defined. One of the main reasons of doing so is to create a new scope for variables and functions that are hidden from outside of the function. It could also prevent variable shadowing. It is also commonly used to avoid polluting the global namespace with too many varibles, and most importantly, it creates a layer of security.

JavaScript has two main types of scopes - global scope and local. In the case of IIFE, it creates its own scope, as a result, all variable declared inside an IIFE is only visible to its scope. This is the main reason this project was challenging.

Another main goal of this project is one function only does one thing in order to make more modular.

The first IIFE on this JavaScript file is a anonymous function that creates the TicTacToe / Xs and Os gameboard when the page loads. the 'gameBoard.init' method calls 'setBoard' to create an array, and then calls 'displayBoard' to fills its HTML files with a new game board.

The second IIFE is also an anonymous function that handles TicTacToe / Xs and Os game logic. gameLogic.init() initializes the action by first calling 'startGame' method, the 'startGame' method in turn adds 'click' event listerners to the start buttons. a relevant dialog box will open when one of the buttons is clicked in order to get players name, a player can also play the game without inputting a name by choosing the 'PLAY ANONYMOUSLY' button. 

p/s: I decided to leave playing against AI code alone for now. As of now, when players choose 'vs Computer AI', the game behaves identical to 2 players mode.

submitForm() is called and it will implement a simple form validation. If the validation is successful, 'getNames' method will run to assign the inputted names to players. At last it calls 'render'.

The main responsibility of 'render' is to clear the board if the board was previously populated. The next thing it does is to call the 'listenToMove' method.

As the name suggests, after 'listenToMove' runs, players will be able to make move on the board. This action is made possible by calling the next method - 'makeMove'. The 'if' statements here first check if the box is available, and log the move that has just made by the player by calling the 'logMove' method, lastly it changes the player.

'logMove' method gets which player makes a move by using regex, and records players' moves to the previously defined 'player.move' array. It then runs 'checkWin' to compare the 'player.move' array with the 'winningCombos' nested array.

'checkWin' uses a combination of 2 array methods to decide if a player has won the game - 'every' and 'includes'. If a winner has found, it will break the 'if' statement and moves on to 'gameOver' method, which in turn calls a dialog to pop up showing which player has won the game.

the 'winningModal' also provides a 'PLAY AGAIN' button.

## CSS

I wrote a simple CSS for this project because the main focus of it is JavaScript. It is mainly responsive. The game board container has a 'grid' display in order to make the game board. It has hover effect when it detects mouse hovering over.

The colour scheme here is mainly black and white to maximize contrast.

## Special Thanks

[The Odin Projects and its Discord community, thank you for providing such an amazing course](https://www.theodinproject.com/)

[MDN Web Doc for the awesome documentation](https://developer.mozilla.org/en-US/)

[Stack Overflow](https://stackoverflow.com/)

[Tomek Buszewski's blog post about Module pattern](https://dev.to/tomekbuszewski/module-pattern-in-javascript-56jm)

[This Youtube series about Modular JavaScript by LearnCode.academy](https://www.youtube.com/playlist?list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f)

[Dave Gray's YouTube videos about Closures and IIFE](https://www.youtube.com/@DaveGrayTeachesCode)