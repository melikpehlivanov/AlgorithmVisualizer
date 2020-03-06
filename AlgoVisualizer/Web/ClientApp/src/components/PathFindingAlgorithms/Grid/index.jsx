import React, { Fragment, useState, useContext } from 'react';
import Node from './Node';
import {
  initializeGrid,
  setStartNode,
  setEndNode,
  setWeightNode,
  setWallNode,
  removeWeightNodes
} from '../../../store/pathFindingAlgorithms/actions';

import './index.css';
import { PathFindingAlgorithmsContext } from '../../../store/pathFindingAlgorithms/context';
import { useEffect } from 'react';

const ShiftKeyCode = 16;
const KeyDownEvent = 'keydown';
const KeyUpEvent = 'keyup';

const Grid = () => {
  const { state, dispatch } = useContext(PathFindingAlgorithmsContext);
  const [isMouseStillClicked, setIsMouseStillClicked] = useState(false);
  const [isShiftStillPressed, setIsShiftStillPressed] = useState(false);
  const {
    grid,
    algorithmDescription,
    isLoading,
    isWeightNodeAllowed,
    isNavbarClickable
  } = state;

  useEffect(() => {
    document.addEventListener(KeyDownEvent, handleKeyPress);
    document.addEventListener(KeyUpEvent, handleKeyUp);
    dispatch(initializeGrid());
    return () => {
      document.removeEventListener(KeyDownEvent, handleKeyPress);
      document.removeEventListener(KeyUpEvent, handleKeyUp);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isWeightNodeAllowed) {
      dispatch(removeWeightNodes());
    }
  }, [isWeightNodeAllowed]);

  const handleKeyPress = e => {
    if (e.keyCode === ShiftKeyCode) {
      setIsShiftStillPressed(true);
    }
  };

  const handleKeyUp = e => {
    if (e.keyCode === ShiftKeyCode) {
      setIsShiftStillPressed(false);
    }
  };

  const handleMouseDown = () => {
    setIsMouseStillClicked(true);
  };

  const handleMouseUp = () => {
    setIsMouseStillClicked(false);
  };

  const handleOnClick = (event, row, col) => {
    if (isNavbarClickable) {
      if (event) {
        if (event.ctrlKey) {
          dispatch(setStartNode(row, col));
        }
        if (event.altKey) {
          dispatch(setEndNode(row, col));
        }
        if (isWeightNodeAllowed && event.shiftKey) {
          dispatch(setWeightNode(row, col));
        }
      }
      if (!event.shiftKey && !event.ctrlKey && !event.altKey) {
        dispatch(setWallNode(row, col));
      }
    }
  };

  const handleMouseOver = (event, row, col) => {
    if (!isMouseStillClicked || !isNavbarClickable) return;
    if (event && isWeightNodeAllowed && isShiftStillPressed) {
      dispatch(setWeightNode(row, col));
    } else {
      dispatch(setWallNode(row, col));
    }
  };

  return (
    <Fragment>
      <p className="text-center">{algorithmDescription}</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={!isNavbarClickable ? 'grid disabled' : 'grid'}>
          {grid.map((row, rowIndex) => {
            return (
              <div id={`row-${rowIndex}`} key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  return (
                    <Node
                      key={nodeIndex}
                      node={node}
                      onClick={(event, row, col) =>
                        handleOnClick(event, row, col)
                      }
                      onMouseOver={(event, row, col) =>
                        handleMouseOver(event, row, col)
                      }
                      onMouseDown={() => handleMouseDown()}
                      onMouseUp={() => handleMouseUp()}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

export default Grid;
