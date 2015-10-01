import React, {findDOMNode, Component, PropTypes} from 'react';
import ToDo from './ToDo';

export default class ToDoList extends Component {
  render(){
    return (
      <ul>
        {this.props.todos.map((todo, index)=>
          <ToDo todo={todo}
                key={index}
                onClick={() => this.props.onTodoClick(index)}
           />
        )}
      </ul>
    )
  }
}
