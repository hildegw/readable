import {
  COUNT_COMMENTS
} from '../actions/types'

// adding comment counts as key-value pair with parentId
const commentCounter = (state = {}, action) => {
  const { count, parentId } = action
  switch (action.type) {
    case COUNT_COMMENTS:
      return {
        ...state,
        [parentId]: count
      }
    default:
      return state
  }
}

export default commentCounter
