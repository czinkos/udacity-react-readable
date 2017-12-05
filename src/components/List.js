import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PostHeader } from './PostHeader';

import { fetchPosts, setSortBy, setScore, deletePost } from '../actions';

class List extends Component {

  componentDidMount = () => this.props.fetchPosts(this.props.match.params.category);

  componentDidUpdate = (prevProps) => {
    const { match: { params } } = this.props;
    if (params.category !== prevProps.match.params.category)
      this.props.fetchPosts(params.category);
  }

  render() {
    const {
      match: { params },
      posts, setSortBy, loading,
      sortBy, upVote, downVote, deletePost
    } = this.props;

    return (
      <div className="list">
        <h1>{ params.category || 'All' } { loading && <small> loading...</small> }</h1>
        <div id="sort">
          Sort by:{' '}
          <button className={ sortBy === 'timestamp' ? 'selected' : ''  }
                  onClick={ () => setSortBy('timestamp')}>date</button>
          <button className={ sortBy === 'voteScore' ? 'selected' : ''  }
                  onClick={ () => setSortBy('voteScore')}>score</button>
        </div>
        <div>
        { !loading && posts.map(p =>
            <div key={p.id} className="post">
              <PostHeader category={params.category}
                upVote={upVote}
                downVote={downVote}
                post={p}
                deletePost={deletePost} />
            </div>
          )
        }
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { posts, loading, sortBy } = state;
  return {
    posts,
    loading,
    sortBy
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: (category) => dispatch(fetchPosts(category)),
    setSortBy: sortBy => dispatch(setSortBy(sortBy)),
    upVote: (category, postId) => dispatch(setScore('upVote', category, postId)),
    downVote: (category, postId) => dispatch(setScore('downVote', category, postId)),
    deletePost: (category, postId) => dispatch(deletePost(category, postId))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(List));