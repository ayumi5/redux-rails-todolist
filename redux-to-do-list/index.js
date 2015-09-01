import React from 'react';
import App from './containers/App';
import { connect } from 'react-redux';

let rootElement = document.getElementById('root');
React.render(
  <App />,
  rootElement
);

export default connect()(App);
