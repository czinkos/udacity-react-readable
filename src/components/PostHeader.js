import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/util';

export function PostHeader({ upVote, downVote, post, category, deletePost}) {
  return (
    <div>
      <div className="head">
        <div className="title">
          <span className="voteScore">
            <span className="arrow" onClick={ () => upVote(category, post.id) }>↑</span>
            <span>{post.voteScore}</span>
            <span className="arrow" onClick={ () => downVote(category, post.id) }>↓</span>
          </span>
          <Link to={'/' + post.category + '/' + post.id}>{post.title}</Link>
        </div>
        <div className="category">{post.category}</div>
      </div>
      <div className="dateline">
        <div className="author">{post.author}</div>
        <div className="commentCount">{post.commentCount} comment{ post.commentCount > 1 ? 's' : ''}</div>
        <div className="timestamp">{formatDate(post.timestamp)}</div>
        <div>
          <Link to={'/edit/' + post.category + '/' + post.id}>Edit</Link> |
          <a href=""
            onClick={(e) => e.preventDefault() && deletePost(post.category, post.id)}>Delete</a>
        </div>
      </div>
    </div>
  )
}