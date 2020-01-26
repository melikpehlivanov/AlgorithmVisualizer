import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
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
    this.props.initializeGrid();
  }

  componentWillUnmount() {
    document.removeEventListener(KeyDownEvent, this.handleKeyPress);
    document.removeEventListener(KeyUpEvent, this.handleKeyUp);
  }

  handleMouseDown() {
    this.setState({ isMouseStillClicked: true });
  }

  handleOnClick(event, row, col) {
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
  }

  handleMouseOver(event, row, col) {
    if (!this.state.isMouseStillClicked) return;

    if (
      event &&
      this.props.isWeightNodeAllowed &&
      this.state.isShiftStillPressed
    ) {
      this.props.setWeightNode(this.props.grid, row, col);
    } else {
      this.props.setWallNode(this.props.grid, row, col);
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
    initializeGrid: () => {
      dispatch(initializeGrid());
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
