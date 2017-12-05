import * as API from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const SET_SORTBY = 'SET_SORTBY';

export const setSortBy = ( sortBy ) => ({
  type: SET_SORTBY,
  sortBy
})

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

export const fetchPosts = (category) => dispatch => {
  API
    .fetchPosts(category)
    .then(data => dispatch(receivePosts(data)));
}

export const receivePost = ( post ) => ({
  type: RECEIVE_POST,
  post
})

export const fetchPost = (category, postId) => dispatch => {
  API
    .fetchPost(category, postId)
    .then(data => dispatch(receivePost(data)))
}
