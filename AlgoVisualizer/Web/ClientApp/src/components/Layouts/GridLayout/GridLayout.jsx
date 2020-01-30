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
  }
];

export const GridLayout = props => {
  const [modalShow, setModalShow] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  console.log(pageNumber);
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
