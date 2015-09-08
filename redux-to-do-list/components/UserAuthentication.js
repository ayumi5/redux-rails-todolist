import React, { Component } from 'react';

export default class UserAuthentication extends Component {
  render() {
    return (
      <div>
        <label>Email</label>
        <input type='text' ref='email' />
        <label>Password</label>
        <input type='text' ref='password' />
        <button onClick={(e) => this.props.onLoginClick({email: 'example@test.com', password: 'password'})}>Login</button>
      </div>
    );
  }
}
