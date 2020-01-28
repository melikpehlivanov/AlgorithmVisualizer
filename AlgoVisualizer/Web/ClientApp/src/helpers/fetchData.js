import {
  SHORTEST_PATH_CLASSNAME,
  VISITED_NODE_CLASSNAME
} from '../constants/gridConstants';
import { setIsNavbarClickable } from '../store/actions/grid';
import { showError } from '../store/actions/error';

const nodeName = 'node';
const msTimeout = 20;

export const makePostApiCallAsync = async (
  url,
  startNode,
  endNode,
  grid,
  dispatchError
) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        startNode: startNode,
        endNode: endNode,
        grid: grid
      })
    });

    const result = response.json();
    if (response.status <= 400) {
      return result;
    }
  } catch (error) {
    const message = 'Something terribly went wrong! Please try again later.';
    dispatchError(showError(true, [message]));
  }
};

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
        animateShortestPath(allNodesInShortestPathOrder);
        dispatch(setIsNavbarClickable(true));
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

const animateShortestPath = nodes => {
  for (let i = 0; i < nodes.length; i++) {
    setTimeout(() => {
      const node = nodes[i];
      if (node) {
        const element = getElement(nodeName, node.row, node.col);
        if (element === null) return;
        element.className = SHORTEST_PATH_CLASSNAME;
      }
      return;
    }, 50 * i * 2);
  }
};

const getElement = (nodeName, row, col) =>
  document.getElementById(`${nodeName}-${row}-${col}`);
