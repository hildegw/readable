import { RECEIVE_POSTS, RECEIVE_CATEGORIES, ADD_POST, REMOVE_POST, OPEN_POST_EDIT, SELECT_CATEGORY } from '../actions'
import { combineReducers } from 'redux'

const posts = (state={}, action) => {
  const { posts, post } = action
  switch (action.type) {
    case RECEIVE_POSTS:
      return posts

    case ADD_POST:
      state.push(post) //TODO review
      return state

    case REMOVE_POST:
      const exclude = state.splice([post[0]], 1)
      const newState = state.filter((item) =>  item.id !== exclude[0].id)
      return newState

    default:
      return state
  }
}

const categories = (state= {}, action) => {
  const { categories, categorySelected } = action
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories
      }
    case SELECT_CATEGORY:
      return {
        ...state,
        categorySelected,
      }
    default:
      return state
  }
}

const editPost = (state= {}, action) => {
  const { editPost } = action
  switch (action.type) {
    case OPEN_POST_EDIT:
      return {
        ...state,
        editPost: editPost,
      }
    default:
      return state
  }
}

export default combineReducers({posts, categories, editPost})
