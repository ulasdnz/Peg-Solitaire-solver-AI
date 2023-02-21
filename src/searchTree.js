import { isGoalState } from "./utils.js";
import { extendNode } from "./utils.js";
import { getNumberOfPegs } from "./utils.js";
import { goalState } from "./config.js";

export const traverseTree = (
  frontier,
  type,
  startTime,
  timeLimit,
  iterativeDfs = false,
  depthLimit
) => {
  let numberOfExtendedNodes = 0;
  let maxFrontier = 0;
  let subOptimal = null;

  while (true) {
    if (frontier.length === 0 && !iterativeDfs) throw new Error("failure!");

    // If the algorithm type is iterativeDfs, dont throw error
    // just return the current optimum solution.
    if (frontier.length === 0 && iterativeDfs)
      return [
        subOptimal,
        maxFrontier,
        numberOfExtendedNodes,
        "Sub-optimum Solution Found with "
      ];

    let node = frontier.dequeue();
    let children = [];

    if (isGoalState(node.state, goalState))
      return [
        node,
        maxFrontier,
        numberOfExtendedNodes,
        "Optimum solution found.",
      ]; //** checks if child is the goal state

    // If its a iterativeDfs and the current node has reached limit, do not extend it.
    if (!iterativeDfs || node.depth < depthLimit)
      children = extendNode(node, type);

      const childNumber = extendNode(node, type).length
      // childNumber show how many move we can make
      // if there is no other move to make from the node
      // and its depth is higher than current sub-optimal node,
      // it should be the new sub-optimal solution.
    if (
      ( childNumber === 0 && subOptimal === null) ||
      ( childNumber === 0 && subOptimal.depth < node.depth)
    ) {
      subOptimal = node;
    }

    for (let child of children) frontier.enqueue(child);

    let currentFrontierLength = frontier.length;
    if (currentFrontierLength > maxFrontier)
      maxFrontier = currentFrontierLength;

    var endTime = performance.now();
    if ((endTime - startTime) / 1000 > 60 * timeLimit)
      return [
        subOptimal,
        maxFrontier,
        numberOfExtendedNodes,
        "Sub-optimum Solution Found with "
      ];

    numberOfExtendedNodes++;
  }
};
