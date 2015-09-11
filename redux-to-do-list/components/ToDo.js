import React, {findDOMNode, Component, PropTypes} from 'react';

export default class ToDo extends Component {
  render() {
    return (
      <li
        onClick={this.props.onClick}
        style={{
          textDecoration: this.props.item.completed ? "line-through" : "none",
          cursor: this.props.item.completed ? "default" : "pointer"
        }}>
        {this.props.item.todo}
      </li>
    );
  }
}
