import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/util';

class EditPost extends Component {
  state = {
    post: {
      id: '',
      timestamp: '',
      author: '',
      title: '',
      body: '',
      category: ''
    },
    isDirty: false
  }

  componentDidMount() {
    if (this.props.post) {
      this.setState({ post: this.props.post });
    } else {
      this.setState({
        post: {
          ...this.state.post,
          category: this.props.categories[0].path
        }
      });
    }
  }

  setValue = (key, value) => {
    this.setState({
      post:{
        ...this.state.post,
        [key]: value
      },
      isDirty: true });
  }

  onCancel = () => {
    if (!this.state.isDirty || window.confirm('Are you sure?')) {
      this.setState({ isDirty: false });
      this.props.onCancel();
    }
  }

  onSave = () => {
    this.setState({ isDirty: false });
    this.props.onSave(this.state.post);
  }

  render() {
    const { categories } = this.props;
    const { post, isDirty } = this.state;

    return (
      <div className="editPost">
        <div>
          <div>Id: {post.id}</div>
          <div>Last edited: {formatDate((!isDirty && post.timestamp) || Date.now())}</div>
          <div><label>Author</label>:
            <input onChange={ e => this.setValue('author', e.target.value) }
              value={post.author} /></div>
          <div><label>Title</label>:
            <input onChange={ e => this.setValue('title', e.target.value) }
              value={post.title} /></div>
          <div><label>Body</label>:
            <textarea onChange={ e => this.setValue('body', e.target.value) }
              value={post.body}></textarea></div>
          <div><label>Category</label>:
            <select onChange={ e => this.setValue('category', e.target.value) }
              value={post.category}>
              {categories.map(category =>
                <option key={category.path}
                  value={category.path}>{category.name}</option>
              )}
            </select>
          </div>
        </div>
        <div className="buttons">
          <button onClick={this.onCancel}>Cancel</button>
          <button onClick={this.onSave} disabled={!isDirty}>Save</button>
        </div>
      </div>
    )
  }
}

export default EditPost;