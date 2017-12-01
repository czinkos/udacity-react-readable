import React, { Component } from 'react';

class Post extends Component {
  render() {
    const { category, postId } = this.props;
    return (
      <div>Post { category } : { postId }</div>
    )
  }
}

export default Post;