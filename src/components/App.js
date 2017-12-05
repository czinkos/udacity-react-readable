import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';

import List from './List';
import Post from './Post';

import { fetchCategories } from '../actions';

import './App.css';

class App extends Component {

  componentDidMount = () => {
    this.props.fetchCategories();
  }

  render() {

    const { categories } = this.props;

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
          <Route exact path="/" component={List} />
          <Route exact path="/:category" component={List} />
          <Route exact path="/:category/:post_id" component={Post} />
          <Route exact path="/edit/:category/:post_id" component={Post}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
