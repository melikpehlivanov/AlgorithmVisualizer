export const ROWS = 21;
export const COLS = 60;

export const START_NODE_ROW = 5;
export const START_NODE_COL = 15;
export const END_NODE_ROW = 10;
export const END_NODE_COL = 35;

export const TOTAL_NODES_EXPLORED_DEFAULT_VALUE = 0;

export const INITIALIZE_GRID = 'INITIALIZE_GRID';
export const SET_START_NODE = 'SET_START_NODE';
export const SET_END_NODE = 'SET_END_NODE';

export const SET_IS_NAVBAR_CLICKABLE = 'SET_IS_NAVBAR_CLICKABLE';

export const SET_WEIGHT_NODE = 'SET_WEIGHT_NODE';
export const SET_WALL_NODE = 'SET_WALL_NODE';

export const SET_TOTAL_NODES_EXPLORED = 'SET_TOTAL_NODES_EXPLORED';

export const SET_ALGORITHM = 'SET_ALGORITHM';
export const SET_ALGORITHM_DESCRIPTION = 'SET_ALGORITHM_DESCRIPTION';

export const REMOVE_WEIGHT_NODES = 'REMOVE_WEIGHT_NODES';

export const CLEAR_STATE = 'CLEAR_STATE';
export const CLEAR_GRID = 'CLEAR_GRID';

export const SHORTEST_PATH_CLASSNAME = 'node node-shortest-path';
export const VISITED_NODE_CLASSNAME = 'node node-visited';

export const modalTutorialContent = [
  {
    title: 'Welcome to Algorithm Visualizer!',
    body: {
      __html:
        '<h4>This short tutorial will walk you through the basic features of the application and will show you how to use them.</h4><p>If you want to wade right in, feel free to press the "Skip Tutorial" button below. Otherwise, press "Next"!</p>'
    }
  },
  {
    title: 'What is a pathfinding algorithm ?',
    body: {
      __html:
        '<h4>At its core, a pathfinding algorithm searches a graph/grid by starting at one vertex/node and exploring adjacent nodes until the destination node is reached, generally with the intent of finding the cheapest route.</h4><p>All the algorithms for this application are adapted for a 2D grid, where movements from node to node have cost of 1.</p><img class="img-fluid rounded mx-auto d-block" src="point-a-b.jpg" />'
    }
  },
  {
    title: 'How to pick an algorithm',
    body: {
      __html:
        '<h4>Choose an algorithm from the "Algorithms" drop-down menu.</h4><p>Note that some algorithms are <strong><i>unweighted</i></strong>, while others are <strong><i>weighted</i></strong>. Unweighted algorithms do not take weight nodes into account, whereas weighted ones do. Furthermore, not all algorithms guarantee the shortest path.</p><img class="img-fluid rounded mx-auto d-block" src="algorithms-menu.jpg" />'
    }
  },
  {
    title: 'Meet the algorithms',
    body: {
      __html:
        "<h4>Not all algorithms are equal. Please read the notes down below!</h4><ul><li><b>A* Search</b> is <b><i>weighted</i></b> and it is arguably the best pathfinding algorithm out there. It uses heuristics to <b>guarantee</b> the shortest path and is much faster than Dijkstra's Algorithm</li><li><b>Dijkstra's Algorithm is also </b> <b><i>weighted</i></b>. Dijkstra's algorithm is the father of pathfinding algorithms and it </b> <b>guarantees</b> the shortest path</li><li><b>Breath-first Search</b> is <b><i>unweighted</i></b> and it's a good algorithm which <b>guarantees</b> the shortest path</li><li><b>Depth-first Search</b> is <b><i>unweighted</i></b> and it's a very bad algorithm for pathfinding. Moreover, it <b>does not guarantee</b> the shortest path</li></ul><p><b>P.S</b> Many new algorithms are going to come out with the next version of this app!</p>"
    }
  },
  {
    title: 'How to move start and end point nodes',
    body: {
      __html:
        '<div><div><h4>1. How to set a new start point.</h4><p>1.1 In order to set new start point you simply need to hold down "Ctrl" key while clicking on the desired node.</p></div><div><h4>2. How to set a new end point.</h4><p>2.1 Setting an end node is the same as setting start node but instead of holding down <b>"Ctrl"</b> key you must hold down <b>"Alt"</b> key.</p><img class="img-fluid mx-auto d-block" src="set-start-end-nodes.gif" /></div></div>'
    }
  },
  {
    title: 'How to add and remove weight and wall nodes',
    body: {
      __html:
        '<div><div><h4>1. How to add wall node.</h4><h5>1.1 In order to add wall node you need to click on the desired node. Additionaly, you can hold down your left mouse button while moving over the nodes and this will also set wall nodes.</h5></div><div><h4>2. How to add weight node.</h4><h5>2.1 Adding a wall node is the same as adding weight node except we have to keep the <b>"Shift"</b> key pressed.</h5><div><h4>3. Removing wall and weight nodes</h4><h5>In order to remove wall or weight node, simply click onto the node with the same key combination you have used to add them or use the "Clear board" button.</h6></div></div><p><b>Walls</b> are <b>impassable</b> meaning that a path <i>cannot</i> cross through. <b>Weights</b>, however, are <b>not</b> impassable. They simply cost <b>more</b> to move through. If you are wondering what does that mean, imagine the following situation: It is time to go home after a long day at work and you turn on your GPS, put in your home address and the GPS will calculate the route for you. But in the meantime, there could be a traffic jam so the GPS would say: "Hey, there is a traffic jam, would you like me to take a roundabout route which will save you a lot of time by avoiding the traffic jams and you will get home much faster". In this application, moving through a weight node has a "cost" of 15.</p><img class="img-fluid mx-auto d-block" src="set-weight-and-wall-nodes.gif" /></div></div>'
    }
  },
  {
    title: 'How to visualize an algorithm',
    body: {
      __html:
        '<h4>Use the navbar buttons to visualize algorithms and clear grid!</h4><p>Click on the "Visualize" button after you have chosen an algorithm in order to visualize it. Also, you can clear the current path, walls and weights from the "Clear Board" button positioned in the top right corner. Moreover, you do not need to clear the board manually after you have visualized given algorithm, simply choose the new algorithm which you want to visualize and the grid will clear itself automatically when "Visualize" button is clicked.</p><img class="img-fluid rounded ml-auto d-block" src="navbar-menu.jpg" />'
    }
  },
  {
    title: 'Thank you for coming to this stage of the tutorial.',
    body: {
      __html:
        '<h4>I believe that you are ready to go on your own now and explore the different algorithms.</h4><p>If for some reason you want to get back to this tutorial simply refresh the page.</p><p> By the way, if you are interested in the source code of this project you can check it out in my <a href="https://github.com/melikpehlivanov/AlgorithmVisualizer" target="_blank">github</a> account.</p>'
    }
  }
];
