import { combineReducers } from 'redux'

import {
  NEW_POST,
  DELETE_POST,
  UPDATE_POST,
  FETCH_POSTS,
  FETCH_CATEGORIES
} from '../actions'

const initialState = {
  posts: {},
  comments: {},
  votes: {},
  categories: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case NEW_POST :
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.post.id]: action.post
        }
      }
    default :
      return state
  }
}

export default combineReducers({
 reducer
})