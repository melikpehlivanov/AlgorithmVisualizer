import {
  ROWS,
  COLS,
  START_NODE_ROW,
  START_NODE_COL,
  END_NODE_ROW,
  END_NODE_COL
} from '../constants/gridConstants';

// Modifiable
let StartNodeRow = START_NODE_ROW;
let StartNodeCol = START_NODE_COL;
let EndNodeRow = END_NODE_ROW;
let EndNodeCol = END_NODE_COL;

export function getInitialGrid() {
  const grid = [];
  for (let row = 0; row < ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < COLS; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }

  return grid;
}

const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isEnd: row === END_NODE_ROW && col === END_NODE_COL,
    isWall: false,
    isWeight: false
  };
};

export const setWallNode = (grid, row, col) => {
  if (!isPlaceable(row, col)) return grid;

  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
    isWeight: false
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export const setWeightNode = (grid, row, col) => {
  if (!isPlaceable(row, col)) return grid;

  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWeight: !node.isWeight,
    isWall: false
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export const setStartNode = (grid, row, col) => {
  if (!isPlaceable(row, col)) {
    return grid;
  }

  const newGrid = grid.slice();
  newGrid[StartNodeRow][StartNodeCol].isStart = false;
  newGrid[row][col].isStart = true;
  newGrid[row][col].isWall = false;
  newGrid[row][col].isWeight = false;

  StartNodeRow = row;
  StartNodeCol = col;

  return newGrid;
};

export const setEndNode = (grid, row, col) => {
  if (!isPlaceable(row, col)) {
    return grid;
  }

  const newGrid = grid.slice();
  newGrid[EndNodeRow][EndNodeCol].isEnd = false;
  newGrid[row][col].isEnd = true;
  newGrid[row][col].isWall = false;
  newGrid[row][col].isWeight = false;

  EndNodeRow = row;
  EndNodeCol = col;

  return newGrid;
};

const isPlaceable = (row, col) => {
  if (
    (row === StartNodeRow && col === StartNodeCol) ||
    (row === EndNodeRow && col === EndNodeCol)
  ) {
    return false;
  }

  return true;
};
