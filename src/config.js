export const goalState = [
  [-1, -1, 0, 0, 0, -1, -1],
  [-1, -1, 0, 0, 0, -1, -1],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [-1, -1, 0, 0, 0, -1, -1],
  [-1, -1, 0, 0, 0, -1, -1]
];

export const initialBoardState = [
  [-1, -1, 1, 1, 1, -1, -1],
  [-1, -1, 1, 1, 1, -1, -1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [-1, -1, 1, 1, 1, -1, -1],
  [-1, -1, 1, 1, 1, -1, -1]
];

export const initialNode = {
  state: [...initialBoardState],
  child: [],
  parent: null,
  depth: 0
};

export const positions = [
  { row: 0, column: 2 },
  { row: 0, column: 3 },
  { row: 0, column: 4 },
  { row: 1, column: 2 },
  { row: 1, column: 3 },
  { row: 1, column: 4 },
  { row: 2, column: 0 },
  { row: 2, column: 1 },
  { row: 2, column: 2 },
  { row: 2, column: 3 },
  { row: 2, column: 4 },
  { row: 2, column: 5 },
  { row: 2, column: 6 },
  { row: 3, column: 0 },
  { row: 3, column: 1 },
  { row: 3, column: 2 },
  { row: 3, column: 3 },
  { row: 3, column: 4 },
  { row: 3, column: 5 },
  { row: 3, column: 6 },
  { row: 4, column: 0 },
  { row: 4, column: 1 },
  { row: 4, column: 2 },
  { row: 4, column: 3 },
  { row: 4, column: 4 },
  { row: 4, column: 5 },
  { row: 4, column: 6 },
  { row: 5, column: 2 },
  { row: 5, column: 3 },
  { row: 5, column: 4 },
  { row: 6, column: 2 },
  { row: 6, column: 3 },
  { row: 6, column: 4 }
];
