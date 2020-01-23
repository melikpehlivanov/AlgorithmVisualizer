import {
  SHORTEST_PATH_CLASSNAME,
  VISITED_NODE_CLASSNAME
} from '../constants/gridConstants';

export const makeApiCallAsync = async (url, startNode, endNode, grid) => {
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
  return response.json();
};

export const visualizeResult = (
  visitedNodesInOrder,
  nodesInShortestPathOrder
) => {
  const allVisitedNodesInOrder = visitedNodesInOrder;
  const allNodesInShortestPathOrder = nodesInShortestPathOrder;
  animateResult(allVisitedNodesInOrder, allNodesInShortestPathOrder);
};

const animateResult = (allVisitedNodesInOrder, allNodesInShortestPathOrder) => {
  for (let i = 0; i <= allVisitedNodesInOrder.length; i++) {
    if (i == allVisitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(allNodesInShortestPathOrder);
      }, 10 * i);
      return;
    }
    setTimeout(() => {
      const node = allVisitedNodesInOrder[i];
      document.getElementById(
        `node-${node.row}-${node.col}`
      ).className = VISITED_NODE_CLASSNAME;
    }, 30 * i);
  }
};

const animateShortestPath = nodes => {
  for (let i = 0; i < nodes.length; i++) {
    setTimeout(() => {
      const node = nodes[i];
      document.getElementById(
        `node-${node.row}-${node.col}`
      ).className = SHORTEST_PATH_CLASSNAME;
    }, 50 * i);
  }
};
