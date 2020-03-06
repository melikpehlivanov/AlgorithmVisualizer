import {
  SHORTEST_PATH_CLASSNAME,
  VISITED_NODE_CLASSNAME
} from '../../constants/gridConstants';
import {
  setIsNavbarClickable,
  setWallNode,
  setWeightNode,
  setTotalNodesExplored
} from '../../store/pathFindingAlgorithms/actions';

const nodeName = 'node';
const msTimeout = 20;

export const visualizeResult = (
  dispatch,
  visitedNodesInOrder,
  nodesInShortestPathOrder,
  totalNodesExplored
) => {
  const allVisitedNodesInOrder = visitedNodesInOrder;
  const allNodesInShortestPathOrder = nodesInShortestPathOrder;
  dispatch(setIsNavbarClickable(false));
  animateResult(
    dispatch,
    allVisitedNodesInOrder,
    allNodesInShortestPathOrder,
    totalNodesExplored
  );
};

export const visualizeMazeGeneration = (dispatch, nodes, mazeType) => {
  dispatch(setIsNavbarClickable(false));
  animateMazeGeneration(dispatch, nodes, mazeType);
};

const animateMazeGeneration = (dispatch, nodes, mazeType) => {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const row = node[0];
    const col = node[1];

    setTimeout(() => {
      if (mazeType === 'wall') {
        dispatch(setWallNode(row, col));
      }
      if (mazeType === 'weight') {
        dispatch(setWeightNode(row, col));
      }

      if (i === nodes.length - 1) {
        dispatch(setIsNavbarClickable(true));
        clearTimeout();
      }
    }, msTimeout * i);
  }
};

const animateResult = (
  dispatch,
  allVisitedNodesInOrder,
  allNodesInShortestPathOrder,
  totalNodesExplored
) => {
  for (let i = 0; i <= allVisitedNodesInOrder.length; i++) {
    if (i === allVisitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(
          dispatch,
          allNodesInShortestPathOrder,
          totalNodesExplored
        );
      }, msTimeout * i);
      return;
    }

    setTimeout(() => {
      const node = allVisitedNodesInOrder[i];
      if (node) {
        const element = getElement(nodeName, node.row, node.col);
        if (element === null) return;
        element.className = VISITED_NODE_CLASSNAME;
      }

      return;
    }, msTimeout * i);
  }
};

const animateShortestPath = (dispatch, nodes, totalNodesExplored) => {
  for (let i = 0; i <= nodes.length; i++) {
    setTimeout(() => {
      const node = nodes[i];
      if (node) {
        const element = getElement(nodeName, node.row, node.col);
        if (element === null) return;
        element.className = SHORTEST_PATH_CLASSNAME;
      }

      if (i === nodes.length - 1) {
        dispatch(setIsNavbarClickable(true));
        dispatch(setTotalNodesExplored(totalNodesExplored));
        clearTimeout();
      }
    }, 50 * i * 2);
  }
};

const getElement = (nodeName, row, col) =>
  document.getElementById(`${nodeName}-${row}-${col}`);
