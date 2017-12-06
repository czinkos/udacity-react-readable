import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/util';

export function CommentHeader({ onUpVote, onDownVote, comment, onDelete}) {
  return (
    <div>
      <div className="head">
        <div className="title">
          <span className="voteScore">
            <span className="arrow" onClick={ () => onUpVote(comment.id) }>↑</span>
            <span>{comment.voteScore}</span>
            <span className="arrow" onClick={ () => onDownVote(comment.id) }>↓</span>
          </span>
        </div>
      </div>
      <div className="dateline">
        <div className="author">{comment.author}</div>
        <div className="timestamp">{formatDate(comment.timestamp)}</div>
        <div>
          {
            //<Link to={'/edit/' + post.category + '/' + post.id}>Edit</Link> |
          }
          <a href=""
            onClick={(e) => e.preventDefault() && onDelete(comment.id)}>Delete</a>
        </div>
      </div>
    </div>
  )
}