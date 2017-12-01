export const NEW_POST = 'NEW_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export function newPost(post) {
  return {
    type: NEW_POST,
    post
  }
}

export function deletePost(postId) {
  return {
    type: DELETE_POST,
    postId
  }
}

export function updatePost(post) {
  return {
    type: UPDATE_POST,
    post
  }
}

export function fetchPosts(category) {
  return {
    type: FETCH_POSTS,
    category
  }
}

export function fetchCategories() {
  return {
    type: FETCH_CATEGORIES
  }
}
