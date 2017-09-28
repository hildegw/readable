import {
  RECEIVE_ONE_COMMENT
} from '../actions'

const comment = (state = {}, action) => {
  const { comment } = action
  switch (action.type) {
    case RECEIVE_ONE_COMMENT:
      return {
        ...state,
        comment: comment
      }
    default:
      return state
  }
}

export default comment
