import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PostHeader } from './PostHeader';
import { CommentHeader } from './CommentHeader';

import { fetchPost, setScore, deletePost } from '../actions';
import { formatDate } from '../utils/util';

class Post extends Component {

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.post_id);
  }

  onChange = fn => postId => {
    fn(postId, fetchPost(this.props.match.params.post_id));
  }

  render() {
    const { loading, category, upVote, downVote, post, comments, deletePost } = this.props;

    return (
      loading || post === null ? <h2>Loading...</h2> :
      <div className="post">
        <PostHeader category={post.category}
                onUpVote={this.onChange(upVote)}
                onDownVote={this.onChange(downVote)}
                post={post}
                onDeletePost={this.onChange(deletePost)} />
        <div className="body">{post.body}</div>
        <div className="comments">
          {comments.map(comment =>
            <div key={comment.id} className="comment">
              <CommentHeader comment={comment}/>
              <div className="body">
                {comments.body}
              </div>
            </div>
          )}
        </div>
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
    fetchPost: id => dispatch(fetchPost(id)),
    upVote: (postId, nextAction) => dispatch(setScore('upVote', postId, nextAction)),
    downVote: (postId, nextAction) => dispatch(setScore('downVote', postId, nextAction)),
    deletePost: (postId, nextAction) => dispatch(deletePost(postId, nextAction))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Post));