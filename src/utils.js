import { initialBoardState } from "./config.js";
import { goalState } from "./config.js";
import { positions } from "./config.js";

export const getSlotLabel = (x, y) => {
  if (initialBoardState[x][y] === -1)
    throw new Error("Illegal slot position!!");

  let sum = 0;
  for (let i = 0; i < initialBoardState.length; i++) {
    for (let j = 0; j < initialBoardState[0].length; j++) {
      if (initialBoardState[i][j] !== -1) sum++;
      if (i === x && j === y) return sum;
    }
  }
  return sum;
};

export const isGoalState = (state) => {
  const ln = 33;
  let matched = 0;

  for (let position of positions) {
    if (
      state[position.row][position.column] ===
      goalState[position.row][position.column]
    )
      matched += 1;
  }
  if (ln == matched) return true;
  return false;
};

export const extendNode = (node, type) => {
  let childNodes = [];
  let actions = [];

  for (let position of positions) {
    if (node.state[position.row][position.column] === 1) {
      if (
        node.state[position.row + 2]?.[position.column] === 0 &&
        node.state[position.row + 1]?.[position.column] === 1
      ) {
        let temp = JSON.parse(JSON.stringify(node.state));
        temp[position.row + 2][position.column] = 1;
        temp[position.row + 1][position.column] = 0;
        temp[position.row][position.column] = 0;
        actions.push(temp);
        childNodes.push({
          state: temp,
          parent: node,
          depth: node.depth + 1,
          removedLabel:
            type === "randomDfs"
              ? Math.floor(Math.random() * 100)
              : getSlotLabel(position.row + 1, position.column),
        });
      }
      if (
        node.state[position.row - 2]?.[position.column] === 0 &&
        node.state[position.row - 1]?.[position.column] === 1
      ) {
        let temp = JSON.parse(JSON.stringify(node.state));
        temp[position.row - 2][position.column] = 1;
        temp[position.row - 1][position.column] = 0;
        temp[position.row][position.column] = 0;
        actions.push(temp);
        childNodes.push({
          state: temp,
          parent: node,
          depth: node.depth + 1,
          removedLabel:
            type == "randomDfs"
              ? Math.floor(Math.random() * 100)
              : getSlotLabel(position.row - 1, position.column),
        });
      }
      if (
        node.state[position.row][position.column + 2] === 0 &&
        node.state[position.row][position.column + 1] === 1
      ) {
        let temp = JSON.parse(JSON.stringify(node.state));
        temp[position.row][position.column + 2] = 1;
        temp[position.row][position.column + 1] = 0;
        temp[position.row][position.column] = 0;
        actions.push(temp);
        childNodes.push({
          state: temp,
          parent: node,
          depth: node.depth + 1,
          removedLabel:
            type === "randomDfs"
              ? Math.floor(Math.random() * 100)
              : getSlotLabel(position.row, position.column + 1),
        });
      }
      if (
        node.state[position.row][position.column - 2] === 0 &&
        node.state[position.row][position.column - 1] === 1
      ) {
        let temp = JSON.parse(JSON.stringify(node.state));
        temp[position.row][position.column - 2] = 1;
        temp[position.row][position.column - 1] = 0;
        temp[position.row][position.column] = 0;
        actions.push(temp);
        childNodes.push({
          state: temp,
          parent: node,
          depth: node.depth + 1,
          removedLabel:
            type === "randomDfs"
              ? Math.floor(Math.random() * 100)
              : getSlotLabel(position.row, position.column - 1),
        });
      }
    }
  }

  // Order the nodes (according the algorithm type) in place.
  orderTheQueue(childNodes, type);
  return childNodes;
};

function orderTheQueue(nodes, type) {
  if (type == "bfs") nodes.sort((a, b) => a.removedLabel - b.removedLabel);
  else if (type == "dfsHeuristic") {
    nodes.sort((a, b) => getHeuristicPoint(a) - getHeuristicPoint(b));
  } else nodes.sort((a, b) => a.removedLabel - b.removedLabel);
}

// Checks if the state of the given node has empty block like this:
//
//    0 0 0
//    0 0 0
//    0 0 0
//
// Sums the total number of these blocks and returns it.
// With this way, we aim to extend the most concentrated node.
// We then select the highest number of
function getHeuristicPoint({ state }) {
  let totalEmptyBlocks = 0;
  for (let position of positions) {
    if (
      state[position.row][position.column] === 0 &&
      state[position.row][position.column - 1] === 0 &&
      state[position.row][position.column + 1] === 0 &&
      state[position.row - 1]?.[position.column] === 0 &&
      state[position.row + 1]?.[position.column] === 0 &&
      state[position.row + 1]?.[position.column + 1] === 0 &&
      state[position.row + 1]?.[position.column - 1] === 0 &&
      state[position.row - 1]?.[position.column - 1] === 0 &&
      state[position.row - 1]?.[position.column + 1] === 0
    )
      totalEmptyBlocks++;
  }
  return totalEmptyBlocks;
}

export const getAlgorithmName = (algoritmLetter) => {
  if (algoritmLetter == "A" || algoritmLetter == "a") return "bfs";
  else if (algoritmLetter == "B" || algoritmLetter == "b") return "dfs";
  else if (algoritmLetter == "C" || algoritmLetter == "c") return "ids";
  else if (algoritmLetter == "D" || algoritmLetter == "d") return "randomDfs";
  else if (algoritmLetter == "E" || algoritmLetter == "e")
    return "dfsHeuristic";
};

// Counts the number of pegs in the state of a node.
export const getNumberOfPegs = (node) => {
  let numberOfPegsLeft = 0;
  if (!node) return 32;
  for (let position of positions)
    if (node.state[position.row][position.column] === 1) numberOfPegsLeft++;
  return numberOfPegsLeft;
};

// Print all nodes starting from the first node and ending with the last node.
// Here we also add spaces to make it look better.
export function recursivePrint(node) {
  let printNodeHistory = "";
  if (!node) return;
  recursivePrint(node.parent);
  printNodeHistory += node.state
    .map((e) => {
      return e.join("").replaceAll("-1", " ");
    })
    .join("\n");
  printNodeHistory += "\n\n\n";
  console.log(printNodeHistory);
}
