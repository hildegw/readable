import { SET_SORT_CATEGORY } from '../actions'

// sorting posts
const sortCategory = (state = {}, action) => {
  const { sortCategory } = action
  switch (action.type) {
    case SET_SORT_CATEGORY:
      return {
        ...state,
        sortCategory
      }
    default:
      return state
  }
}

export default sortCategory
