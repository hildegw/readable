import { RECEIVE_POSTS, RECEIVE_CATEGORIES, ADD_POST,
  REMOVE_POST, SELECT_CATEGORY, OPEN_POST_DETAIL,
  RECEIVE_COMMENTS, ADD_COMMENT, REMOVE_COMMENT,
  RECEIVE_ONE_COMMENT, COUNT_COMMENTS, VOTE} from '../actions'
import { combineReducers } from 'redux'

const posts = (state = {}, action) => {
  const { posts, post } = action
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        posts
      }
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat(post)
      }
    case REMOVE_POST:
      const newStatePosts = state.posts.filter((item) => item.id !== post.id)
      return {
        ...state,
        posts: newStatePosts
      }
    default:
      return state
  }
}

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

const openPost = (state = {}, action) => {
  const { openPost } = action
  switch (action.type) {
    case OPEN_POST_DETAIL:
      return {
        ...state,
        openPost: openPost
      }
    default:
      return state
  }
}

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

// voting
const vote = (state = {}, action) => {
  const { id, option, startScore } = action
  let count = startScore
  count = (option === 'upVote') ? count + 1 : count - 1
  console.log('reducer vote: ', count)
  switch (action.type) {
    case VOTE:
      return {
        ...state,
        [id]: count
      }
    default:
      return state
  }
}

export default combineReducers({posts, categories, openPost, comments, comment, commentCounter, vote})
