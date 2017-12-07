import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/util';

class EditPost extends Component {
  state = {
    author: '',
    title: '',
    body: '',
    category: ''
  }

  componentDidMount() {
    this.setState( Object.assign({}, this.state, this.props.post));
  }

  render() {
    const { post, categories, onCancel, onSave} = this.props;

    return (
      <div className="editPost">
        <div>
          <div>Id: {post.id}</div>
          <div>Timestamp: {formatDate(post.timestamp || Date.now())}</div>
          <div><label>Author</label>:
            <input onChange={ e => this.setState( {author: e.target.value} )} value={this.state.author} /></div>
          <div><label>Title</label>:
            <input onChange={ e => this.setState( {title: e.target.value} )} value={this.state.title} /></div>
          <div><label>Body</label>:
            <textarea onChange={ e => this.setState( {body: e.target.value} )} value={this.state.body}></textarea></div>
          <div><label>Category</label>:
            <select onChange={e => this.setState( {category: e.target.value} )} value={this.state.category}>
              {categories.map(category =>
                <option key={category.path} value={category.path}>{category.name}</option>
              )}
            </select>
          </div>
        </div>
        <div className="buttons">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onSave}>Save</button>
        </div>
      </div>
    )
  }
}

export default EditPost;