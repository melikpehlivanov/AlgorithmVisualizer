import {
  SHORTEST_PATH_CLASSNAME,
  VISITED_NODE_CLASSNAME
} from '../../constants/gridConstants';
import { setIsNavbarClickable } from '../../store/actions/grid';

const nodeName = 'node';
const msTimeout = 20;

export const visualizeResult = (
  dispatch,
  visitedNodesInOrder,
  nodesInShortestPathOrder
) => {
  const allVisitedNodesInOrder = visitedNodesInOrder;
  const allNodesInShortestPathOrder = nodesInShortestPathOrder;
  dispatch(setIsNavbarClickable(false));
  animateResult(dispatch, allVisitedNodesInOrder, allNodesInShortestPathOrder);
};

const animateResult = (
  dispatch,
  allVisitedNodesInOrder,
  allNodesInShortestPathOrder
) => {
  for (let i = 0; i <= allVisitedNodesInOrder.length; i++) {
    if (i === allVisitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(dispatch, allNodesInShortestPathOrder);
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

const animateShortestPath = (dispatch, nodes) => {
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
        clearTimeout();
      }
    }, 50 * i * 2);
  }
};

const getElement = (nodeName, row, col) =>
  document.getElementById(`${nodeName}-${row}-${col}`);
