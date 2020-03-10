import React, { Fragment, useState, useEffect } from 'react';
import { VerticallyCenteredModal } from '../Modal/VerticallyCenteredModal';
import { modalTutorialContent } from '../../constants/gridConstants';
import { Grid } from './Grid';

export const PathFindingAlgorithmsContainer = () => {
  const [modalShow, setModalShow] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setModalShow(true);
  }, []);

  return (
    <Fragment>
      {modalShow ? (
        <VerticallyCenteredModal
          show={modalShow}
          title={modalTutorialContent[pageNumber - 1].title}
          body={modalTutorialContent[pageNumber - 1].body}
          onHide={() => setModalShow(false)}
          previousPage={() =>
            pageNumber > 1 ? setPageNumber(pageNumber - 1) : null
          }
          nextPage={() =>
            pageNumber <= modalTutorialContent.length - 1
              ? setPageNumber(pageNumber + 1)
              : null
          }
          currentPage={pageNumber}
          totalPages={modalTutorialContent.length}
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
      <Grid />
    </Fragment>
  );
};
