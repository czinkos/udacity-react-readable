import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PostHeader } from './PostHeader';

class Post extends Component {

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  render() {
    const { category, upVote, downVote, post, deletePost } = this.props;

    return (
      <div id="post">
        <PostHeader category={category}
          upVote={upVote}
          downVote={downVote}
          post={post}
          deletePost={deletePost} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { post, comments, loading } = state;
  return {
    post,
    comments,
    loading
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPost: (id) => dispatch(fetchPost(id)),
    upVote: (category, postId) => dispatch(setScore('upVote', category, postId)),
    downVote: (category, postId) => dispatch(setScore('downVote', category, postId)),
    deletePost: (category, postId) => dispatch(deletePost(category, postId))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Post));