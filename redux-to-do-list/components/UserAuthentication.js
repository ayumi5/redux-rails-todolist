import React, { findDOMNode, Component } from 'react';

export default class UserAuthentication extends Component {
  render() {
    return (
      <div>
        <label>Email</label>
        <input type='text' ref='email' value="example@test.com"/>
        <label>Password</label>
        <input type='text' ref='password' value="password" />
        <button onClick={(e) => this.handleClick(e)}>Login</button>
      </div>
    );
  }
  handleClick(event) {
    const emailNode = findDOMNode(this.refs.email);
    const email = emailNode.value.trim();
    const passwordNode = findDOMNode(this.refs.password);
    const password = passwordNode.value.trim();
    this.props.onLoginClick({ email: email, password: password });
    emailNode.value = '';
    passwordNode.value = '';
  }
}
