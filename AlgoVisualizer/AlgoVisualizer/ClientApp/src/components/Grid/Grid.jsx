import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Node from './Node/Node';
import {
  setGrid,
  setStartNode,
  setEndNode,
  setWeightNode,
  setWallNode,
  removeWeightNodes
} from '../../actions';
import { getInitialGrid } from '../../helpers/gridHelper';

import './Grid.css';

const ShiftKeyCode = 16;
const KeyDownEvent = 'keydown';
const KeyUpEvent = 'keyup';

export class Grid extends Component {
  constructor() {
    super();
    this.state = {
      isMouseStillClicked: false,
      isShiftStillPressed: false
    };

    // These events will be improved in future releases with faster and more elegant solution
    // P.S (Keep in mind that the main focus for this project is the backend(the actual algo's implementation), not the front end)
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyPress(e) {
    if (e.keyCode === ShiftKeyCode) {
      this.setState({ isShiftStillPressed: true });
    }
  }

  handleKeyUp(e) {
    if (e.keyCode === ShiftKeyCode) {
      this.setState({ isShiftStillPressed: false });
    }
  }

  componentDidMount() {
    document.addEventListener(KeyDownEvent, this.handleKeyPress);
    document.addEventListener(KeyUpEvent, this.handleKeyUp);
    this.props.setGrid(getInitialGrid());
  }

  componentWillUnmount() {
    document.removeEventListener(KeyDownEvent, this.handleKeyPress);
    document.removeEventListener(KeyUpEvent, this.handleKeyUp);
  }

  handleMouseDown() {
    this.setState({ isMouseStillClicked: true });
  }

  handleOnClick(event, row, col) {
    let newGrid;
    if (event) {
      if (event.ctrlKey) {
        this.props.setStartNode(this.props.grid, row, col);
      }
      if (event.altKey) {
        this.props.setEndNode(this.props.grid, row, col);
      }
      if (this.props.isWeightNodeAllowed && event.shiftKey) {
        this.props.setWeightNode(this.props.grid, row, col);
      }
    }
    if (!event.shiftKey && !event.ctrlKey && !event.altKey) {
      this.props.setWallNode(this.props.grid, row, col);
    }

    if (newGrid) {
      this.props.setGrid(newGrid);
    }
  }

  handleMouseOver(event, row, col) {
    if (!this.state.isMouseStillClicked) return;

    let newGrid;
    if (
      event &&
      this.props.isWeightNodeAllowed &&
      this.state.isShiftStillPressed
    ) {
      this.props.setWeightNode(this.props.grid, row, col);
    } else {
      this.props.setWallNode(this.props.grid, row, col);
    }

    if (newGrid) {
      this.props.setGrid(newGrid);
    }
  }

  handleMouseUp() {
    this.setState({ isMouseStillClicked: false });
  }

  render() {
    const {
      grid,
      algorithmDescription,
      isLoading,
      isWeightNodeAllowed
    } = this.props;

    if (!isWeightNodeAllowed) {
      this.props.removeWeightNodes();
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
                          this.handleOnClick(event, row, col)
                        }
                        onMouseOver={(event, row, col) =>
                          this.handleMouseOver(event, row, col)
                        }
                        onMouseDown={() => this.handleMouseDown()}
                        onMouseUp={() => this.handleMouseUp()}
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
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.grid.isLoading,
    grid: state.grid.data,
    algorithmDescription: state.grid.algorithmDescription,
    isWeightNodeAllowed: state.grid.isWeightNodeAllowed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setGrid: grid => {
      dispatch(setGrid(grid));
    },
    setStartNode: (grid, row, col) => {
      dispatch(setStartNode(grid, row, col));
    },
    setEndNode: (grid, row, col) => {
      dispatch(setEndNode(grid, row, col));
    },
    setWeightNode: (grid, row, col) => {
      dispatch(setWeightNode(grid, row, col));
    },
    setWallNode: (grid, row, col) => {
      dispatch(setWallNode(grid, row, col));
    },
    removeWeightNodes: () => {
      dispatch(removeWeightNodes());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
