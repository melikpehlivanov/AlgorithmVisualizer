import React, { Component } from 'react'

import './Node.css'

export default class Node extends Component {
    render() {
        const {
            row,
            col,
            isStart,
            isEnd,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
          } = this.props;
          const extraClassName = isStart
            ? 'node-start'
            : isEnd
            ? 'node-end'
            : isWall
            ? 'node-wall' 
            : '';

          return (
            <div
                id={`${row}-${col}`}
                className={extraClassName ? `node ${extraClassName}` : 'node'}
                onMouseDown={(event) => onMouseDown(event, row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp(row, col)}
                ></div>
          );
    }
}
