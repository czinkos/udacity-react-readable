import {
  RECEIVE_CATEGORIES
} from '../actions'

const initialState = {
  posts: {},
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

    default :
      return state
  }
}

export default reducer;