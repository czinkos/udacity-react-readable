import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';

import List from './List';
import Post from './Post';

import { fetchCategories, fetchPosts } from '../actions';

import './App.css';

class App extends Component {

  componentDidMount = () => {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  render() {

    const { categories, posts } = this.props;

    return (
      <div className="App">
        <div id="header">
          <div id="newPost">
            <button onClick={() => false}>New Post</button>
          </div>
          <div id="categories">
              <div><Link to="/">All</Link></div>
            {categories.map( ({ name, path }) =>
              <div key={path}><Link to={'/' + path}>{name}</Link></div>
            )}
          </div>
          
        </div>
        <div id="main">
          <Route exact path="/" render={() =>
            <List
              title="All"
              posts={posts}/>
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
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
