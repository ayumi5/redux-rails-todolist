import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import NewToDo from '../components/new-to-do';
import { newTodo } from '../actions'

class App extends Component {
  render(){
    const { dispatch } = this.props;
    return (
      <div>
        <NewToDo onAddClick={text =>
          dispatch(newTodo(text))
        }/>
      </div>
    );
  }
}

export default connect()(App);
