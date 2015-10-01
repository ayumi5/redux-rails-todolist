import React, {findDOMNode, Component, PropTypes} from 'react';

export default class FetchList extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.lists.items.map((list, index)=>
            <li style={{
              textDecoration: list.todo.completed ? "line-through" : "none",
              cursor: list.todo.completed ? "default" : "pointer"
            }}>
              {list.todo}
            </li>
          )}
        </ul>
        <button onClick={(e) => this.props.onFetchClick('test')}>Fetch</button>
      </div>
    )
  }
}
