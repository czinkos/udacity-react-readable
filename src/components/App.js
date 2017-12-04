import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';

import List from './List';
import Post from './Post';

import { fetchCategories, fetchPosts, fetchPost, setSortBy } from '../actions';

import './App.css';

class App extends Component {

  componentDidMount = () => {
    this.props.fetchCategories();
  }

  render() {

    const { categories, posts, post, sortBy, fetchPosts, fetchPost, setSortBy } = this.props;

    const renderList = ({ match }) => {
      const category = match.params.category;
      fetchPosts(category);
      return <List
          sortBy={sortBy}
          onSortByChange={setSortBy}
          title={ category ? category : 'All'}
          posts={ posts } />
    }

    const renderPost = (edit, post) => ({match}) => {
      const { category, post_id } = match.params;
      this.props.fetchPost(category, post_id);
      return <Post
        post={post}
        edit={edit} />
    }

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
          <Route exact path="/" render={renderList} />
          <Route exact path="/:category" render={renderList} />
          <Route exact path="/:category/:post_id" render={renderPost(false, post)} />
          <Route exact path="/edit/:category/:post_id" render={renderPost(true, post)}/>
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
    fetchPosts: (category) => dispatch(fetchPosts(category)),
    fetchPost: (category, post_id) => dispatch(fetchPost(category, post_id)),
    setSortBy: sortBy => dispatch(setSortBy(sortBy))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
