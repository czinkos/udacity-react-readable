import {
  SET_LOADING,
  SET_SORTBY,
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  RECEIVE_POST
} from '../actions'

const initialState = {
  post: null,
  sortBy: 'timestamp',
  posts: [],
  comments: {},
  votes: {},
  categories: []
}

const sort = (arr, field) => arr.slice().sort( (a, b) => a[field] > b[field] );

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading
      }
    case SET_SORTBY:
      return {
        ...state,
        posts: sort(state.posts, action.sortBy),
        sortBy: action.sortBy
      }
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    case RECEIVE_POSTS:
      const { posts } = action;
      return {
        ...state,
        loading: false,
        posts: sort(posts.filter(e => !e.deleted), state.sortBy)
      }
    case RECEIVE_POST:
      return {
        ...state,
        post: action.post
      }
    default :
      return state
  }
}

export default reducer;