import * as API from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const SET_SORTBY = 'SET_SORTBY';
export const SET_LOADING = 'SET_LOADING';

export const setLoading = loading => ({
  type: SET_LOADING,
  loading
})

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

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchPosts = category => dispatch => {
  dispatch(setLoading(true));
  API
    .fetchPosts(category)
    .then(data => dispatch(receivePosts(data)));
}

export const setScore = (option, postId, nextAction) => dispatch => {
  API
    .setScore(option, postId)
    .then(() => dispatch(nextAction));
}

export const deletePost = (postId, nextAction) => dispatch => {
  API
    .deletePost(postId)
    .then(() => dispatch(nextAction));
}

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
})

export const fetchPost = postId => dispatch => {
  dispatch(setLoading(true));
  API
    .fetchPost(postId)
    .then(data => dispatch(receivePost(data)))
}
