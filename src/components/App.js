import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import List from './List';
import Post from './Post';

import { fetchCategories } from '../actions';

class App extends Component {

  componentDidMount = () => {
    this.props.fetchCategories();
  }

  render() {

    const { categories } = this.props;

    return (
      <div className="App">
        <div id="header">
          <div id="categories">
            {categories.map( ({ name, path }) =>
              <div key={path}><Link to={'/' + path}>{name}</Link></div>
            )}
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
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
