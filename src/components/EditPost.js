import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/util';

class EditPost extends Component {
  state = {
    id: '',
    timestamp: '',
    author: '',
    title: '',
    body: '',
    category: '',
    isDirty: false
  }

  componentDidMount() {
    this.setState(Object.assign({}, this.state, this.props.post));
  }

  setValue = (key, value) => {
    this.setState({ [key]: value, isDirty: true });
  }

  onCancel = () => {
    if (!this.state.isDirty || window.confirm('Are you sure?')) {
      this.props.onCancel();
    }
  }

  render() {
    const {categories, onSave} = this.props;

    return (
      <div className="editPost">
        <div>
          <div>Id: {this.state.id}</div>
          <div>Last edited: {formatDate(this.state.timestamp || Date.now())}</div>
          <div><label>Author</label>:
            <input onChange={ e => this.setValue('author', e.target.value) } value={this.state.author} /></div>
          <div><label>Title</label>:
            <input onChange={ e => this.setValue('title', e.target.value) } value={this.state.title} /></div>
          <div><label>Body</label>:
            <textarea onChange={ e => this.setValue('body', e.target.value) } value={this.state.body}></textarea></div>
          <div><label>Category</label>:
            <select onChange={ e => this.setValue('category', e.target.value) } value={this.state.category}>
              {categories.map(category =>
                <option key={category.path} value={category.path}>{category.name}</option>
              )}
            </select>
          </div>
        </div>
        <div className="buttons">
          <button onClick={this.onCancel}>Cancel</button>
          <button onClick={() => onSave(this.state)} disabled={!this.state.isDirty}>Save</button>
        </div>
      </div>
    )
  }
}

export default EditPost;