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
          } = this.props.node;
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
                onClick={(event) => this.props.onClick(event, row, col)}
                onMouseOver={(event) => this.props.onMouseOver(event, row, col)}
                onMouseDown={() => this.props.onMouseDown()}
                onMouseUp={() => this.props.onMouseUp()}
                >
                  {isWeight ? <i className="node-dumbbell"></i> : ''}
                </div>
          );
    }
}
