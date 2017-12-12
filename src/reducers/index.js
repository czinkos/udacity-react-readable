import {
  SET_LOADING,
  SET_SORTBY,
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
} from '../actions'

const initialState = {
  post: null,
  comment: null,
  loading: false,
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
      return {
        ...state,
        loading: false,
        posts: sort(action.posts.filter(notDeleted), state.sortBy)
      }
    case RECEIVE_POST:
      return {
        ...state,
        loading: false,
        post: action.post
      }
    case RECEIVE_COMMENTS:
      return {
        ...state,
        loading: false,
        comments: sort(action.comments.filter(notDeleted), state.sortBy)
      }
    case RECEIVE_COMMENT:
      return {
        ...state,
        loading: false,
        comment: action.comment
      }
    default :
      return state
  }
}

export default reducer;