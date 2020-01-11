import React, { Component } from 'react'

export default class Node extends Component {
    render() {
        const {
            row,
            col,
        } = this.props;

        return (
            <div id={`${node.row}-${node-col}`} className="node"></div>
        )
    }
}
