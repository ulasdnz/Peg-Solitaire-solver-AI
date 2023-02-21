# Peg Solitaire Solver AI
<br>

This program implements algorithms to solve the Peg Solitaire game. Our aim is to compare these algorithms and their success for this particular game.
Fewer pieces on the board in shorter time means the algorithm and its performance is better. We use a good heuristic which allow us find the optimal solution 
in reasonable time. The algorithms we use are as follows:
<br>

* a. Breadth-First Search
* b. Depth-First Search
* c. Iterative Deepening Search
* d. Depth-First Search with Random Selection
* e. Depth-First Search with a Node Selection Heuristic


## Usage

This project requires [node](http://nodejs.org) and [npm](https://npmjs.com) installed globally.

### To Install The Necessary Packages

`npm install`

Navigate the src folder and run this command:

`node app.js`

After running this commang, you will be asked to choose one algorithm (a-e) to execute. Enter the algorithm you want to execute (a-e).
You will then be asked about the time limit for the program. Enter the time limit in minutes. Thats it. It will print the result after the time you specified.
