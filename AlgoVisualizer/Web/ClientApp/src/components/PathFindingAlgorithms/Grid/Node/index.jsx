import React from 'react';

import './index.css';

export const Node = props => {
  const { row, col, isStart, isEnd, isWall, isWeight } = props.node;
  const extraClassName = isStart
    ? 'node-start'
    : isEnd
    ? 'node-end'
    : isWall
    ? 'node-wall'
    : '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={extraClassName ? `node ${extraClassName}` : 'node'}
      onClick={event => props.onClick(event, row, col)}
      onMouseOver={event => props.onMouseOver(event, row, col)}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
    >
      {isWeight ? <i className="node-dumbbell" /> : ''}
    </div>
  );
};
