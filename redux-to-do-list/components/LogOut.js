import React, { findDOMNode, Component } from 'react';

export default class LogOut extends Component {
  render() {
    return (
      <button onClick={this.props.onLogoutClick}>Log Out</button>
    )
  }
}
