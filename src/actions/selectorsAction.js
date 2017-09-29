import * as PostsApi from '../utils/api'
import * as Types from './types'

// fetch categories from DB
// thunk middleware for asynchronous call to fetch categories
export const fetchCategories = () => dispatch => (
  PostsApi.fetchCategories().then((data) => { dispatch(receiveCategories(data)) }))
// action creator functions being called upon receive
export const receiveCategories = (categories) => {
  return {
    type: Types.RECEIVE_CATEGORIES,
    categories
  }
}

export const selectCategory = (categorySelected) => {
  return {
    type: Types.SELECT_CATEGORY,
    categorySelected
  }
}

export const setSortCategory = (sortCategory) => {
  return {
    type: Types.SET_SORT_CATEGORY,
    sortCategory
  }
}
