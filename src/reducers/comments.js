import {
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions/types'

const comments = (state = {}, action) => {
  const { comments, comment } = action
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        comments
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: state.comments.concat(comment)
      }
    case REMOVE_COMMENT:
      const newStateComments = state.comments.filter((item) => item.id !== comment.id)
      return {
        ...state,
        comments: newStateComments
      }
    default:
      return state
  }
}

export default comments
