import React, {findDOMNode, Component, PropTypes} from 'react';

export default class FetchList extends Component {
  render() {
    return (
      <div>
        <p>{this.props.lists.items}</p>
        <button onClick={(e) => this.props.onFetchClick('test')}>Fetch</button>
      </div>
    )
  }
}
