import React, {findDOMNode, Component, PropTypes} from 'react';
import ToDo from './ToDo';

export default class ToDoList extends Component {
  render(){
    return (
      <ul>
        {this.props.todos.items.map((item, index) =>
          <ToDo item={item}
                onClick={() => this.props.onTodoClick({id: item.id, index: index}, this.props.user)} />
        )}
      </ul>
    )
  }
}
