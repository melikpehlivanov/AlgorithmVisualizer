import {
  ROWS,
  COLS,
  START_NODE_ROW,
  START_NODE_COL,
  END_NODE_ROW,
  END_NODE_COL,
  SHORTEST_PATH_CLASSNAME,
  VISITED_NODE_CLASSNAME
} from '../constants/gridConstants';

// Modifiable
let StartNodeRow;
let StartNodeCol;
let EndNodeRow;
let EndNodeCol;

export function getInitialGrid() {
  const grid = [[], []];
  for (let row = 0; row < ROWS; row++) {
    grid[row] = [];
    for (let col = 0; col < COLS; col++) {
      grid[row][col] = createNode(row, col);
    }
  }

  StartNodeRow = START_NODE_ROW;
  StartNodeCol = START_NODE_COL;
  EndNodeRow = END_NODE_ROW;
  EndNodeCol = END_NODE_COL;

  return grid;
}

export const removeAllWeightNodes = grid => {
  if (!grid) return;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col].isWeight) {
        grid[row][col].isWeight = false;
      }
    }
  }
  return grid;
};

export const clearGrid = () => {
  const nodeClassName = 'node';
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const element = document.getElementById(`${nodeClassName}-${row}-${col}`);
      if (
        element &&
        (element.className === SHORTEST_PATH_CLASSNAME ||
          element.className === VISITED_NODE_CLASSNAME)
      ) {
        element.className = nodeClassName;
      }
    }
  }
};

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
