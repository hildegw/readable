import { RECEIVE_POSTS, ADD_POST, REMOVE_POST, OPEN_POST_EDIT, SELECT_CATEGORY } from '../actions'
import { combineReducers } from 'redux'

const posts = (state={}, action) => {
  const { posts, editingPostId, id, post } = action
  switch (action.type) {
    case RECEIVE_POSTS:
      const statePostsFetched = posts.map((post)=>Object.assign({}, post))
      return statePostsFetched
    case OPEN_POST_EDIT:
      return {
        ...state,
        editingPostId: editingPostId,
      }
    case ADD_POST:
      console.log(state)
      const stateAfterAdded = state
      stateAfterAdded.push(post) //adding new post to existing posts
      console.log(stateAfterAdded)
      return state
    case REMOVE_POST:
      const postToRemove = Object.keys(id)[0]
      const stateAfterDelete = Object.assign({}, state) //copy state
      delete stateAfterDelete[postToRemove]
      return stateAfterDelete
    default:
      return state
  }
}

const category = (state= {}, action) => {
  const { categorySelected } = action
  switch (action.type) {
    case SELECT_CATEGORY:
      return {
        ...state,
        categorySelected: categorySelected,
      }
    default:
      return state
  }
}

export default combineReducers({posts, category})
