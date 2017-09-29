import {
  REMOVE_POST,
  OPEN_POST_DETAIL
} from '../actions/types'

const openPost = (state = {}, action) => {
  const { openPost } = action
  switch (action.type) {
    case OPEN_POST_DETAIL:
      return {
        ...state,
        openPost: openPost
      }
    case REMOVE_POST:
      return {
        ...state,
        openPost: undefined
      }
    default:
      return state
  }
}

export default openPost
