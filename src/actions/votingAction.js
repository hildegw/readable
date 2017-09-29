import * as PostsApi from '../utils/api'
import * as Types from './types'

// voting thunk
export const setVote = (id, option, type, startScore, posts) => dispatch => {
  PostsApi.vote(id, option, type)
  .then((data) => {
    if (type === 'posts') dispatch(updateVote(id, option, startScore, posts))
    else dispatch(vote(id, option, startScore))
  })
}
// action upon voting for comments only
export const vote = (id, option, startScore) => {
  return {
    type: Types.VOTE,
    id,
    option,
    startScore
  }
}
// action upon voting for posts only
export const updateVote = (id, option, startScore, posts) => {
  return {
    type: Types.UPDATE_VOTE,
    id,
    option,
    startScore,
    posts
  }
}
