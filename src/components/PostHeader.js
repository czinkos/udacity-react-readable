import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/util';

export function PostHeader({ onUpVote, onDownVote, post, onDelete, onEdit}) {
  return (
    <div className="postHeader">
      <div className="head">
        <div className="title">
          <span className="voteScore">
            <span className="arrow" onClick={ () => onUpVote(post.id) }>↑</span>
            <span>{post.voteScore}</span>
            <span className="arrow" onClick={ () => onDownVote(post.id) }>↓</span>
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
          <a href="#"
            onClick={e => { e.preventDefault(); onEdit(post.id); }}>Edit</a>|
          <a href="#"
            onClick={e => { e.preventDefault(); onDelete(post.id); }}>Delete</a>
        </div>
      </div>
    </div>
  )
}