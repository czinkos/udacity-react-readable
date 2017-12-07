import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PostHeader } from './PostHeader';
import EditPost from './EditPost';

import { fetchPost, fetchPosts, setSortBy, setScore, deletePost } from '../actions';

class List extends Component {

  state = {
    newPost: false,
    editPostId: null
  }

  componentDidMount = () => this.props.fetchPosts(this.props.match.params.category);

  componentDidUpdate = (prevProps) => {
    const { match: { params } } = this.props;
    if (params.category !== prevProps.match.params.category)
      this.props.fetchPosts(params.category);
  }

  onChange = fn => postId => {
    fn(postId, fetchPosts(this.props.match.params.category));
  }

  onEditPost = postId => {
    fetchPost(postId);
    this.setState({ editPostId: postId });
  }

  render() {
    const {
      match: { params },
      posts, setSortBy, loading, categories,
      sortBy, upVote, downVote, deletePost
    } = this.props;

    return (
      <div className="list">
        <h1>{ params.category || 'All' } { loading && <small> loading...</small> }</h1>
        <div id="sort">
          <div>
            Sort by:{' '}
            <button className={ sortBy === 'timestamp' ? 'selected' : ''  }
                    onClick={ () => setSortBy('timestamp')}>date</button>
            <button className={ sortBy === 'voteScore' ? 'selected' : ''  }
                    onClick={ () => setSortBy('voteScore')}>score</button>
          </div>
          <div id="newPost">
            <button onClick={() => this.setState({ newPost: true }) }>New Post</button>
          </div>
        </div>
        {
          this.state.newPost &&
          <EditPost post={ {} }
            onCancel={ () => this.setState( { newPost: false } ) }
            onSave={ () => false }
            categories={categories}/>
        }
        <div>
        { !loading && posts.map(post =>
            <div key={post.id} className="post">
              { this.state.editPostId !== post.id &&
              <PostHeader category={post.category}
                onUpVote={this.onChange(upVote)}
                onDownVote={this.onChange(downVote)}
                post={post}
                onDelete={this.onChange(deletePost)}
                onEdit={this.onEditPost} />
              }
              { this.state.editPostId === post.id &&
              <EditPost post={post}
                onCancel={() => this.setState({ editPostId: null })}
                onSave={ () => false }
                categories={categories}/>
              }
            </div>
          )
        }
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { posts, loading, sortBy, categories } = state;
  return {
    posts,
    loading,
    sortBy,
    categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: category => dispatch(fetchPosts(category)),
    fetchPost: id => dispatch(fetchPost(id)),
    setSortBy: sortBy => dispatch(setSortBy(sortBy)),
    upVote: (postId, nextAction) => dispatch(setScore('upVote', postId, nextAction)),
    downVote: (postId, nextAction) => dispatch(setScore('downVote', postId, nextAction)),
    deletePost: (postId, nextAction) => dispatch(deletePost(postId, nextAction))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(List));