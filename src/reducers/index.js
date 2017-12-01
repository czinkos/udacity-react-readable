import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS
} from '../actions'

const initialState = {
  posts: [],
  comments: {},
  votes: {},
  categories: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const { categories } = action;
      return {
        ...state,
        categories
      }
    case RECEIVE_POSTS:
      const { posts } = action;
      return {
        ...state,
        posts: posts.filter(e => !e.deleted)
      }
    default :
      return state
  }
}

export default reducer;