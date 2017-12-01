import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class List extends Component {
  render() {
    const { title, posts } = this.props;
console.log(posts);
    return (
      <div className="list">
        <h1>{ title }</h1>
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
                <div className="timestamp">{p.timestamp}</div>
              </div>
            </div>
          )
        }
        </div>
      </div>
    )
  }
}

export default List;