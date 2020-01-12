import React, { Component, Fragment } from 'react'
import Node from './Node/Node'

import './Grid.css'

const Rows = 21;
const Cols = 60;

let StartNodeRow = 5;
let StartNodeCol = 15;
let EndNodeRow = 10;
let EndNodeCol = 35;

export default class Grid extends Component {
    constructor(){
        super();
        this.state = {
            grid: [],
            isMouseStillClicked: false,
        }
    }

    componentDidMount(){
        this.setState({grid: getInitialGrid()});
    }

    handleOnClickEvent(event, row, col){
        
    }

    handleMouseDown(event, row, col) {
        //const newGrid = setWallNode(this.state.grid, row, col);
        //this.setState({grid: newGrid, isMouseStillClicked: true});

        let newGrid;
        if(event){
            if(event.ctrlKey){
                newGrid = setStartNode(this.state.grid, row, col);
            }
            if(event.altKey){
                newGrid = setEndNode(this.state.grid, row, col);
            }
            if(event.shiftKey){
                newGrid = setStartNode(this.state.grid, row, col);
            }
        }

        newGrid = setWallNode(this.state.grid, row, col);
        this.setState({grid: newGrid, isMouseStillClicked: true});
    }

    handleMouseEnter(row, col) {
        if (!this.state.isMouseStillClicked) 
            return;

        const newGrid = setWallNode(this.state.grid, row, col);
        this.setState({grid: newGrid});
    }
    
    handleMouseUp() {
        this.setState({isMouseStillClicked: false});
    }      

    render() {
        const {grid} = this.state;

        return (
            <Fragment>
            <button className="btn btn-primary">Visualize Algo</button>
            
            <div className="grid">
                {grid.map((row, rowIndex) => {
                    return(
                            <div id={`row-${rowIndex}`} key={rowIndex}>
                                {row.map((node, nodeIndex) => {
                                    const {row, col, isStart, isEnd, isWall} = node;
                                    return(
                                        <Node key={nodeIndex}
                                            row={row}
                                            col={col}
                                            isStart={isStart}
                                            isEnd={isEnd}
                                            isWall={isWall}
                                            onMouseDown={(event, row, col) => this.handleMouseDown(event, row, col)}
                                            onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                            onMouseUp={() => this.handleMouseUp()}
                                            //onClick={(event, row, col) => this.handleOnClickEvent(event, row, col)}
                                            >
                                        </Node>
                                    );
                                })}
                            </div>
                    );
                })
            }
            </div>
            </Fragment>
        );
    }
}

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < Rows; row++) {
      const currentRow = [];
      for (let col = 0; col < Cols; col++) {
        currentRow.push(createNode(row, col));
      }
      grid.push(currentRow);
    }
    return grid;
  };

const createNode = (row, col) => {
    return {
        row,
        col,
        isStart: row === StartNodeRow && col === StartNodeCol,
        isEnd: row === EndNodeRow && col === EndNodeCol,
        isWall: false,
    };
};

const setWallNode = (grid, row, col) => {
    if(!isPlaceable(row, col))
        return grid;

    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

const setStartNode = (grid, row, col) => {
    if(!isPlaceable(row, col)){
        return grid;
    }

    const newGrid = grid.slice();
    newGrid[StartNodeRow][StartNodeCol].isStart=false;
    newGrid[row][col].isStart = true;

    StartNodeRow = row;
    StartNodeCol = col;

    return newGrid;
}

function isPlaceable(row, col){
    if((row === StartNodeRow && col === StartNodeCol) 
        || (row === EndNodeRow && col === EndNodeCol)){
        return false;
    }

    return true;
}