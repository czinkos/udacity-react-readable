import * as API from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
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
    .then(data => {
      dispatch(receivePost(data));
      dispatch(fetchComments(postId));
    })
}

/*
  comments
*/

export const deleteComment = (commentId, nextAction) => dispatch => {
  API
    .deleteComment(commentId)
    .then(() => dispatch(nextAction));
}

export const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
})

export const fetchComment = commentId => dispatch => {
  dispatch(setLoading(true));
  API
    .fetchComment(commentId)
    .then(data => dispatch(receiveComment(data)))
}

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
})

export const fetchComments = postId => dispatch => {
  dispatch(setLoading(true));
  API
    .fetchComments(postId)
    .then(data => dispatch(receiveComments(data)));
}
