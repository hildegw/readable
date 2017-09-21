import { RECEIVE_POSTS, RECEIVE_CATEGORIES, ADD_POST,
  REMOVE_POST, OPEN_POST_EDIT, SELECT_CATEGORY,  OPEN_POST_DETAIL,
  RECEIVE_COMMENTS, ADD_COMMENT, REMOVE_COMMENT, } from '../actions'
import { combineReducers } from 'redux'

//TODO is editComment needed?

const posts = (state={}, action) => {
  const { posts, post } = action
  switch (action.type) {
    case RECEIVE_POSTS:
      return  {
        ...state,
        posts,
      }
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat(post),
      }

    case REMOVE_POST:
      const newStatePosts = state.posts.filter((item) => item.id !== post.id)
      return {
        ...state,
        posts: newStatePosts,
      }

    default:
      return state
  }
}

const categories = (state= {}, action) => {
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
        categorySelected,
      }
    default:
      return state
  }
}

const editPost = (state= {}, action) => {
  const { editPost } = action
  switch (action.type) {
    case OPEN_POST_EDIT:
      return {
        ...state,
        editPost: editPost,
      }
    default:
      return state
  }
}

const openPost = (state= {}, action) => {
  const { openPost } = action
  switch (action.type) {
    case OPEN_POST_DETAIL:
      return {
        ...state,
        openPost: openPost,
      }
    default:
      return state
  }
}

const comments = (state={}, action) => {
  const { comments, comment } = action
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return  {
        ...state,
        comments,
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: state.comments.concat(comment),
      }

    case REMOVE_COMMENT:
      const newStateComments = state.comments.filter((item) => item.id !== comments.id)
      return {
        ...state,
        comments: newStateComments,
      }

    default:
      return state
  }
}

export default combineReducers({posts, categories, editPost, openPost, comments})
