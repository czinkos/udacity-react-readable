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
  comments: [],
  categories: []
}

const sort = (arr, field) => arr.slice().sort( (a, b) => a[field] > b[field] );
const notDeleted = e => !e.deleted;

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
        posts: sort(state.posts.filter(notDeleted), action.sortBy),
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
        posts: sort(posts.filter(notDeleted), state.sortBy)
      }
    case RECEIVE_POST:
      return {
        ...state,
        loading: false,
        post: action.post
      }
    default :
      return state
  }
}

export default reducer;