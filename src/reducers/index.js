import { combineReducers } from 'redux'
import posts from './posts'
import categories from './categories'
import openPost from './openPost'
import comments from './comments'
import comment from './comment'
import commentCounter from './commentCounter'
import vote from './vote'
import sortCategory from './sortCategory'

export default combineReducers({
  posts,
  categories,
  openPost,
  comments,
  comment,
  commentCounter,
  vote,
  sortCategory
})
