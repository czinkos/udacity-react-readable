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
    const { match: { params }, posts, setSortBy, loading, sortBy, upVote, downVote } = this.props;

    return (
      <div className="list">
        <h1>{ params.category || 'All' } { loading && <small>loading...</small> }</h1>
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
              <div className="head">
                <div className="title">
                  <span className="voteScore">
                    <span className="arrow" onClick={ () => upVote(p.id) }>↑</span>
                    <span>{p.voteScore}</span>
                    <span className="arrow" onClick={ () => downVote(p.id) }>↓</span>
                  </span>
                  <Link to={'/' + p.category + '/' + p.id}>{p.title}</Link>
                </div>
                <div className="category">{p.category}</div>
              </div>
              <div className="dateline">
                <div className="author">{p.author}</div>
                <div className="commentCount">{p.commentCount} comment{ p.commentCount > 1 ? 's' : ''}</div>
                <div className="timestamp">{new Date(p.timestamp).toLocaleDateString()}</div>
                <div><Link to={'/edit/' + p.category + '/' + p.id}>Edit</Link></div>
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
    setSortBy: sortBy => dispatch(setSortBy(sortBy))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(List));