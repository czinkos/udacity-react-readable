import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { fetchPosts, setSortBy } from '../actions';

class List extends Component {

  componentDidMount = () => this.props.fetchPosts(this.props.match.params.category);

  componentDidUpdate = (prevProps) => {
    const { match: { params } } = this.props;
    if (params.category !== prevProps.match.params.category)
      this.props.fetchPosts(params.category);
  }

  render() {
    const { match: { params }, posts, setSortBy } = this.props;
    return (
      <div className="list">
        <h1>{ params.category }</h1>
        <div id="sort">
          Sort by
          <button onClick={ () => setSortBy('timestamp')}>timestamp</button>
          <button onClick={ () => setSortBy('voteScore')}>voteScore</button>
        </div>
        <div>
        {
          posts.map(p =>
            <div key={p.id} className="post">
              <div className="head">
                <div className="title">
                  <span className="voteScore">{p.voteScore}</span>
                  <Link to={'/' + p.category + '/' + p.id}>{p.title}</Link>
                </div>
                <div className="category">{p.category}</div>
              </div>
              <div className="dateline">
                <div className="author">{p.author}</div>
                <div className="timestamp">{new Date(p.timestamp).toLocaleDateString()}</div>
              </div>
            </div>
          )
        }
        </div>
      </div>
    )
  }
}


function mapStateToProps (state) {
  return {
    ...state
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: (category) => dispatch(fetchPosts(category)),
    setSortBy: sortBy => dispatch(setSortBy(sortBy))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(List));