import { RECEIVE_POSTS, RECEIVE_CATEGORIES, ADD_POST,
  REMOVE_POST, OPEN_POST_EDIT, SELECT_CATEGORY,
  OPEN_POST_DETAIL, } from '../actions'
import { combineReducers } from 'redux'


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

const openPostDetail = (state= {}, action) => {
  const { detailPost } = action
  switch (action.type) {
    case OPEN_POST_DETAIL:
      return {
        ...state,
        detailPost: detailPost,
      }
    default:
      return state
  }
}

export default combineReducers({posts, categories, editPost, openPostDetail})
