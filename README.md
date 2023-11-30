# project-tictactoe

## This project is part of The Odin Project's Full Stack JavaScript Course.

### The project

The aim of this project is to create a simple Tic-Tac-Toe / X's and O's game using mainly factory function and module pattern - IIFEs.

### Factory Function

Factory function is a function that can create an object and returns it. It is similar to constructor function that I've learned previously.

### Module Pattern - IIFE

The idea of IIFE (Immediately Invoked Function Expression) is to execute a JavaScript function as soon as it is defined. One of the main reasons of doing so is to create a new scope for variables and functions that are hidden from outside of the function. It could also prevent variable shadowing. It is also commonly used to avoid polluting the global namespace with too many varibles, and most importantly, it creates a layer of security.

JavaScript has two main types of scopes - global scope and local. In the case of IIFE, it creates its own scope, as a result, all variable declared inside an IIFE is only visible to its scope. This is the main reason this project was challenging.

Another main goal of this project is one function only does one thing in order to make more modular.







