import React, { Fragment, useState, useContext } from 'react';
import Node from './Node/Node';
import {
  initializeGrid,
  setStartNode,
  setEndNode,
  setWeightNode,
  setWallNode,
  removeWeightNodes
} from '../../store/actions/grid';

import './Grid.css';
import { GridContext } from '../../store/context/gridContext';
import { useEffect } from 'react';

const ShiftKeyCode = 16;
const KeyDownEvent = 'keydown';
const KeyUpEvent = 'keyup';

const Grid = () => {
  const { state, dispatch } = useContext(GridContext);
  const [isMouseStillClicked, setIsMouseStillClicked] = useState(false);
  const [isShiftStillPressed, setIsShiftStillPressed] = useState(false);

  useEffect(() => {
    document.addEventListener(KeyDownEvent, handleKeyPress);
    document.addEventListener(KeyUpEvent, handleKeyUp);
    dispatch(initializeGrid());

    return () => {
      document.removeEventListener(KeyDownEvent, handleKeyPress);
      document.removeEventListener(KeyUpEvent, handleKeyUp);
    };
  }, []);

  const { grid, algorithmDescription, isLoading, isWeightNodeAllowed } = state;
  // constructor() {
  //   super();
  //   this.state = {
  //     isMouseStillClicked: false,
  //     isShiftStillPressed: false
  //   };

  //   this.handleKeyPress = this.handleKeyPress.bind(this);
  //   this.handleKeyUp = this.handleKeyUp.bind(this);
  // }

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

  // componentDidMount() {
  // document.addEventListener(KeyDownEvent, this.handleKeyPress);
  // document.addEventListener(KeyUpEvent, this.handleKeyUp);
  // this.props.initializeGrid();
  //   console.log(this.props.grid);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener(KeyDownEvent, this.handleKeyPress);
  //   document.removeEventListener(KeyUpEvent, this.handleKeyUp);
  // }

  const handleMouseDown = () => {
    setIsMouseStillClicked(true);
  };

  const handleMouseUp = () => {
    setIsMouseStillClicked(false);
  };

  const handleOnClick = (event, row, col) => {
    if (event) {
      if (event.ctrlKey) {
        dispatch(setStartNode(grid, row, col));
      }
      if (event.altKey) {
        dispatch(setEndNode(grid, row, col));
      }
      if (isWeightNodeAllowed && event.shiftKey) {
        dispatch(setWeightNode(grid, row, col));
      }
    }
    if (!event.shiftKey && !event.ctrlKey && !event.altKey) {
      dispatch(setWallNode(grid, row, col));
    }
  };

  const handleMouseOver = (event, row, col) => {
    if (!isMouseStillClicked) return;

    if (event && isWeightNodeAllowed && isShiftStillPressed) {
      dispatch(setWeightNode(grid, row, col));
    } else {
      dispatch(setWallNode(grid, row, col));
    }
  };

  if (!isWeightNodeAllowed) {
    dispatch(removeWeightNodes());
  }

  return (
    <Fragment>
      <p className="text-center">{algorithmDescription}</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
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

// const mapStateToProps = state => {
//   return {
//     isLoading: state.grid.isLoading,
//     grid: state.grid.grid,
//     algorithmDescription: state.grid.algorithmDescription,
//     isWeightNodeAllowed: state.grid.isWeightNodeAllowed
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     initializeGrid: () => {
//       dispatch(initializeGrid());
//     },
//     setStartNode: (grid, row, col) => {
//       dispatch(setStartNode(grid, row, col));
//     },
//     setEndNode: (grid, row, col) => {
//       dispatch(setEndNode(grid, row, col));
//     },
//     setWeightNode: (grid, row, col) => {
//       dispatch(setWeightNode(grid, row, col));
//     },
//     setWallNode: (grid, row, col) => {
//       dispatch(setWallNode(grid, row, col));
//     },
//     removeWeightNodes: () => {
//       dispatch(removeWeightNodes());
//     }
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Grid);
