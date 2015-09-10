import React, {findDOMNode, Component, PropTypes} from 'react';

export default class ToDo extends Component {
  render() {
    return (
      <li
        onClick={this.props.onClick}
        style={{
          textDecoration: this.props.todo.completed ? "line-through" : "none",
          cursor: this.props.todo.completed ? "default" : "pointer"
        }}>
        {this.props.todo.todo}
      </li>
    )
  }
}
