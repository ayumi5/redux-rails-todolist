import React, {findDOMNode, Component, PropTypes} from 'react';

export default class FetchList extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.lists}
        </ul>
        <button onClick={(e) => this.props.onFetchClick(this.props.user)}>Fetch</button>
      </div>
    )
  }
}
