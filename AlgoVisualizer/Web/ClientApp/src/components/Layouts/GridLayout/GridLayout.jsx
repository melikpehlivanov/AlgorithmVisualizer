import React, { Fragment, useState, useEffect } from 'react';
import './GridLayout.css';
import GridNavbar from '../../Navbar/GridNavbar';
import Error from '../../Error';
import { GridProvider } from '../../../store/context/gridContext';
import { ErrorProvider } from '../../../store/context/errorContext';
import VerticallyCenteredModal from '../../Modal/VerticallyCenteredModal';

const modalContent = [
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
        '<h4>At its core, a pathfinding algorithm searches a graph/grid by starting at one vertex/node and exploring adjacent nodes until the destination node is reached, generally with the intent of finding the cheapest route.</h4><p>All the algorithms for this application are adapted for a 2D grid, where 90 degree turns have a cost of 1, and movements from node to node have cost of 1 again.</p><img class="img-fluid rounded mx-auto d-block" src="point-a-b.jpg" />'
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
    title: 'How to move start and end point nodes',
    body: {
      __html:
        '<div><div><h4>1. How to set a new start point.</h4><p>1.1 In order to set new start point you simply need to hold down "Ctrl" key while clicking on the desired node.</p></div><div><h4>2. How to set a new end point.</h4><p>2.1 Setting an end node is the same as setting start node but instead of holding down <b>"Ctrl"</b> key you must hold down <b>"Alt"</b> key.</p><img class="img-fluid mx-auto d-block" src="set-start-end-nodes.gif" /></div></div>'
    }
  },
  {
    title: 'How to add weight and wall nodes',
    body: {
      __html:
        '<div><div><h4>1. How to add wall node.</h4><p>1.1 In order to add wall node you need to click on the desired node. Additionaly, you can hold down your left mouse button while moving over the nodes and this will also set wall nodes.</p></div><div><h4>2. How to add weight node.</h4><p>2.1 Adding a wall node is the same as adding weight node except we have to keep the <b>"Shift"</b> key pressed.</p><img class="img-fluid mx-auto d-block" src="set-weight-and-wall-nodes.gif" /></div></div>'
    }
  }
];

export const GridLayout = props => {
  const [modalShow, setModalShow] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setModalShow(true);
  }, []);

  return (
    <GridProvider>
      <ErrorProvider>
        <Fragment>
          <GridNavbar />
          <Error />
          {modalShow ? (
            <VerticallyCenteredModal
              show={modalShow}
              title={modalContent[pageNumber - 1].title}
              body={modalContent[pageNumber - 1].body}
              onHide={() => setModalShow(false)}
              previousPage={() =>
                pageNumber > 1 ? setPageNumber(pageNumber - 1) : null
              }
              nextPage={() =>
                pageNumber <= modalContent.length - 1
                  ? setPageNumber(pageNumber + 1)
                  : null
              }
              currentPage={pageNumber}
              totalPages={modalContent.length}
            />
          ) : (
            ''
          )}
          <div id="algo-legend">
            <ul>
              <li>
                <div className="node node-start"></div>
                Start Node
              </li>
              <li>
                <div className="node node-end"></div>
                End Node
              </li>
              <li>
                <div className="node node-wall"></div>
                Wall Node
              </li>
              <li>
                <img
                  className="dumbbell"
                  src="dumbbell-solid.svg"
                  alt="weight-node"
                />
                Weight Node
              </li>
              <li>
                <div className="node"></div>
                Unvisited Node
              </li>
              <li>
                <div className="node node-visited"></div>
                Visited Node
              </li>
              <li>
                <div className="node node-shortest-path"></div>
                Shortest Path Node
              </li>
            </ul>
          </div>
          <div className="main-grid">{props.children}</div>
        </Fragment>
      </ErrorProvider>
    </GridProvider>
  );
};
