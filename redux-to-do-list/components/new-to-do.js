import React, {findDOMNode, Component, PropTypes} from 'react';

export default class NewToDo extends Component {
  render(){
    return (
      <div>
        <label>New To Do</label>
        <input type='text' ref='newtodo' />
        <button onClick={(e) => this.handleClick(e)}>Add</button>
      </div>
    )
  }
  handleClick(event) {
    const node = findDOMNode(this.refs.newtodo);
    const text = node.value.trim();
    this.props.onAddClick(text);
    node.value = '';
  }
}

NewToDo.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
