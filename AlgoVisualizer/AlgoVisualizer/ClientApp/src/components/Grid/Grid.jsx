import React, { Component, Fragment } from 'react'
import Node from './Node/Node'

import './Grid.css'

const ShiftKeyCode = 16;
const KeyDownEvent = "keydown";
const KeyUpEvent = "keyup";

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
            isShiftStillPressed: false,
        };
        
        // These events will be improved in future releases with faster solution
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleKeyPress(e) {
        if(e.keyCode === ShiftKeyCode) {
          this.setState({isShiftStillPressed: true});
        }
    }

    handleKeyUp(e){
        if(e.keyCode === ShiftKeyCode) {
            this.setState({isShiftStillPressed: false});
          } 
    }

    componentDidMount(){
        document.addEventListener(KeyDownEvent, this.handleKeyPress);
        document.addEventListener(KeyUpEvent, this.handleKeyUp);
        this.setState({grid: getInitialGrid()});
    }

    componentWillUnmount(){
        document.removeEventListener(KeyDownEvent, this.handleKeyPress);
        document.removeEventListener(KeyUpEvent, this.handleKeyUp);
    }

    handleMouseDown() {
        this.setState({isMouseStillClicked: true});
    }

    handleOnClick(event, row, col){
        let newGrid;
        if(event){
            if(event.ctrlKey){
                newGrid = setStartNode(this.state.grid, row, col);
            }
            if(event.altKey){
                newGrid = setEndNode(this.state.grid, row, col);
            }
            if(event.shiftKey){
                newGrid = setWeightNode(this.state.grid, row, col);
            }
        }
        if(!event.shiftKey && !event.ctrlKey && !event.altKey){
            newGrid = setWallNode(this.state.grid, row, col);
        }

        this.setState({grid: newGrid});
    }

    handleMouseOver(event, row, col) {
        if (!this.state.isMouseStillClicked) 
            return;
            
        let newGrid;
        if(event && this.state.isShiftStillPressed){
            newGrid = setWeightNode(this.state.grid, row, col);
        }
        else{
            newGrid = setWallNode(this.state.grid, row, col);
        }
        
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
                                    const {row, col, isStart, isEnd, isWall, isWeight} = node;
                                    return(
                                        <Node key={nodeIndex}
                                            row={row}
                                            col={col}
                                            isStart={isStart}
                                            isEnd={isEnd}
                                            isWall={isWall}
                                            isWeight={isWeight}
                                            onClick={(event, row, col) => this.handleOnClick(event, row, col)}
                                            onMouseOver={(event, row, col) => this.handleMouseOver(event, row, col)}
                                            onMouseDown={() => this.handleMouseDown()}
                                            onMouseUp={() => this.handleMouseUp()}
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
        isWeight: false,
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
        isWeight: false,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

const setWeightNode = (grid, row, col) => {
    if(!isPlaceable(row, col))
        return grid;

    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWeight: !node.isWeight,
        isWall: false
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
    newGrid[row][col].isWall = false;
    newGrid[row][col].isWeight = false;

    StartNodeRow = row;
    StartNodeCol = col;

    return newGrid;
}

const setEndNode = (grid, row, col) => {
    if(!isPlaceable(row, col)){
        return grid;
    }

    const newGrid = grid.slice();
    newGrid[EndNodeRow][EndNodeCol].isEnd=false;
    newGrid[row][col].isEnd = true;
    newGrid[row][col].isWall = false;
    newGrid[row][col].isWeight = false;

    EndNodeRow = row;
    EndNodeCol = col;

    return newGrid;
}

function isPlaceable(row, col){
    if((row === StartNodeRow && col === StartNodeCol) 
        || (row === EndNodeRow && col === EndNodeCol)){
        return false;
    }

    return true;
}