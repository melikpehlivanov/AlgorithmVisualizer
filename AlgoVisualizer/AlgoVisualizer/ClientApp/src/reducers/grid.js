import {
  SET_GRID,
  SET_START_NODE,
  SET_ALGORITHM,
  SET_ALGORITHM_DESCRIPTION,
  CLEAR_STATE,
  REMOVE_WEIGHT_NODES
} from '../constants/gridConstants';

import {
  getInitialGrid,
  removeAllWeightNodes,
  setStartNode
} from '../helpers/gridHelper';

const availableAlgorithms = [
  {
    value: 'astar',
    label: 'A* Search',
    description: 'A* Search is 𝐰𝐞𝐢𝐠𝐡𝐭𝐞𝐝 and 𝐠𝐮𝐚𝐫𝐚𝐧𝐭𝐞𝐞𝐬 the shortest path!',
    isWeight: true
  },
  {
    value: 'dijkstra',
    label: "Dijkstra's Search",
    description:
      "Dijkstra's Algorithm is 𝐰𝐞𝐢𝐠𝐡𝐭𝐞𝐝 and 𝐠𝐮𝐚𝐫𝐚𝐧𝐭𝐞𝐞𝐬 the shortest path!",
    isWeight: true
  },
  {
    value: 'bfs',
    label: 'Breadth-first Search',
    description:
      'Breath-first Search is 𝐮𝐧𝐰𝐞𝐢𝐠𝐡𝐭𝐞𝐝 and 𝐠𝐮𝐚𝐫𝐚𝐧𝐭𝐞𝐞𝐬 the shortest path!',
    isWeight: false
  },
  {
    value: 'dfs',
    label: 'Depth-first Search',
    description:
      'Depth-first Search is 𝐮𝐧𝐰𝐞𝐢𝐠𝐡𝐭𝐞𝐝 and 𝐝𝐨𝐞𝐬 𝐧𝐨𝐭 𝐠𝐮𝐚𝐫𝐚𝐧𝐭𝐞𝐞 the shortest path!',
    isWeight: false
  }
];

const initialState = {
  isLoading: true,
  data: getInitialGrid,
  algorithms: availableAlgorithms,
  algorithm: '',
  algorithmDescription: '',
  isWeightNodeAllowed: true
};

const gridReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GRID:
      return { ...state, data: action.payload, isLoading: false };
    case SET_START_NODE:
      return {
        ...state,
        data: setStartNode(
          action.payload.grid,
          action.payload.row,
          action.payload.col
        )
      };
    case SET_ALGORITHM:
      let algorithm = state.algorithms.find(el => el.value === action.payload);
      if (algorithm) {
        return {
          ...state,
          algorithm: action.payload,
          isWeightNodeAllowed: algorithm.isWeight
        };
      }
      break;
    case SET_ALGORITHM_DESCRIPTION:
      if (action.payload) {
        return { ...state, algorithmDescription: action.payload };
      }
      break;
    case CLEAR_STATE:
      state = initialState;

      return {
        ...state,
        data: getInitialGrid(),
        isLoading: false
      };
    case REMOVE_WEIGHT_NODES:
      let newGrid = removeAllWeightNodes(state.data);
      return {
        ...state,
        data: newGrid
      };
    default:
      return state;
  }
};

export default gridReducer;
