import {
  RECEIVE_CATEGORIES,
  SELECT_CATEGORY
} from '../actions'

const categories = (state = {}, action) => {
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
        categorySelected
      }
    default:
      return state
  }
}

export default categories
