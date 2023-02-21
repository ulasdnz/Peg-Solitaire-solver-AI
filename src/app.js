import { performance } from "perf_hooks";
import promptSync from "prompt-sync";
import { initialNode } from "./config.js";
import { getAlgorithmName } from "./utils.js";
import { recursivePrint } from "./utils.js";
import { getNumberOfPegs } from "./utils.js";
import { traverseTree } from "./searchTree.js";


const prompt = promptSync();
let frontier = [initialNode];

console.log(
  `\n\n Avaible algorithms algorithms: \n
  a - Breadth First Search\n
  b - Depth-First Search\n
  c - Iterative Deepening Search\n
  d - Depth-First Search With Random Selection\n
  e - Depth-First Search With a Node Selection Heuristic\n`
);

let algoritmLetter = prompt("Enter the algorithm you want to execute (a-e): ");
let timeLimit = prompt("Enter the time limit in minutes: ");
let typeOfAlgorithm = getAlgorithmName(algoritmLetter);
frontier.enqueue = frontier.push;

if (typeOfAlgorithm == "bfs") frontier.dequeue = frontier.shift;
else frontier.dequeue = frontier.pop;

let resultingNode = null,
  maxFrontier = 0,
  numberOfExtendedNodes = 0,
  depthLimit = 0,
  message = "";
var startTime = performance.now();

// If the algorithm type is iterative deepining search, then search the tree
// with the limit starting from the zero, incrementing by one at each time
// and continue to the infinity.
//
// Otherwise search the tree just one time.

if (typeOfAlgorithm !== "ids") {
  [resultingNode, maxFrontier, numberOfExtendedNodes, message] = traverseTree(
    frontier,
    typeOfAlgorithm,
    startTime,
    timeLimit
  );
} else {
  while (true) {
    let currentNode =null;
    let currentMaxFrontierNumber = 0;
    let currentNumberOfExtendedNodes = 0;
    [currentNode, currentMaxFrontierNumber, currentNumberOfExtendedNodes, message] = traverseTree(
      frontier,
      typeOfAlgorithm,
      startTime,
      timeLimit,
      true,
      depthLimit
    );
    if(currentNode!=null && resultingNode == null){
      resultingNode = currentNode
    }
    if(currentNode!=null && resultingNode != null && currentNode.depth > resultingNode.depth){
      resultingNode = currentNode
    }
    if(maxFrontier< currentMaxFrontierNumber){
      maxFrontier = currentMaxFrontierNumber
    }
    numberOfExtendedNodes += currentNumberOfExtendedNodes
    frontier = [initialNode];
    frontier.enqueue = frontier.push;
    frontier.dequeue = frontier.pop;
    depthLimit++;
    if (performance.now() - startTime > 1000 * 60 * timeLimit) {
      break;
    }
  }
}

var endTime = performance.now();

console.log(
  "\n\nThe search method: " +
    typeOfAlgorithm +
    "\t\tTime limit: " +
    timeLimit +
    " minutes"
);
if (resultingNode) console.log(message +
  getNumberOfPegs(resultingNode) +
  " remaining pegs"+ "\n\n");
else console.log("No solution found – Time Limit\n\n");
recursivePrint(resultingNode);

console.log(`Process took ${endTime - startTime} milliseconds`);
console.log(
  "The number of nodes expanded during the search: " + numberOfExtendedNodes
);
console.log(
  "Max number of nodes stored in the memory during the search: " +
    maxFrontier +
    "\n"
);
