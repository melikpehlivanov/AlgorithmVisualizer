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
            isWeight,
            onClick,
            onMouseOver,
            onMouseDown,
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
                onClick={(event) => onClick(event, row, col)}
                onMouseOver={(event) => onMouseOver(event, row, col)}
                onMouseDown={() => onMouseDown()}
                onMouseUp={() => onMouseUp()}
                >
                  {isWeight ? <i className="node-dumbbell"></i> : ''}
                </div>
          );
    }
}
