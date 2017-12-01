import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import List from './List';
import Post from './Post';

import { deletePost, FETCH_CATEGORIES, fetchCategories, fetchPosts, newPost, updatePost } from '../actions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="header">
          <div id="categories">
            <div><Link to="/cat1">cat 1</Link></div>
          </div>
          <div id="newPost">
            <button onClick={() => false}>New Post</button>
          </div>
        </div>
        <div id="main">
          <Route exact path="/" render={() =>
            <List
              title="All"
              posts={ [1, 2, 3] }/>
          }/>
          <Route exact path="/:category" render={({match}) =>
            <List
              title={ match.params.category}
              posts={ [4, 5, 6] }/>
          } />
          <Route exact path="/:category/:post_id" render={({match}) =>
            <Post
              category={match.params.category}
              postId={match.params.post_id}/>
          } />
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    ...state
  }
}

function mapDispatchToProps (dispatch) {
  return {
    newPost: (post) => dispatch(newPost(post)),
    updatePost: (post) => dispatch(updatePost(post)),
    deletePost: (postId) => dispatch(deletePost(postId)),
    fetchPosts: (category) => dispatch(fetchPosts(category)),
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
