import React, {findDOMNode, Component, PropTypes} from 'react';
import ToDo from './ToDo';

export default class ToDoList extends Component {
  render(){
    return (
      <ul>
        {this.props.todos.items.map((item, index) =>
          <ToDo item={item}
                key={index}
                onClick={() => this.props.onTodoClick(index)} />
        )}
      </ul>
    )
  }
}
