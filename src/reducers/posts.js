import {
  RECEIVE_POSTS,
  ADD_POST,
  REMOVE_POST,
  UPDATE_VOTE
} from '../actions/types'

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
    case UPDATE_VOTE:
      const { id, option, startScore } = action
      let count = startScore
      count = (option === 'upVote') ? count + 1 : count - 1
      const updateStatePosts = state.posts.map((item) => {
        if (item.id === id) { item.voteScore = count }
        return item
      })
      return {
        ...state,
        posts: updateStatePosts
      }
    default:
      return state
  }
}

export default posts
