import React, { Component } from 'react';

class List extends Component {
  render() {
    const { title, posts } = this.props;

    return (
      <div>
        <h1>{ title }</h1>
        <div>List: { posts }</div>
      </div>
    )
  }
}

export default List;