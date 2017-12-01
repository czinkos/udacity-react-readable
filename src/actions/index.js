import * as API from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const receiveCategories = ( {categories} ) => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => (
  API
    .fetchCategories()
    .then(data => dispatch(receiveCategories(data)))
);

export const receivePosts = ( posts ) => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchPosts = () => dispatch => (
  API
    .fetchPosts()
    .then(data => dispatch(receivePosts(data)))
);
