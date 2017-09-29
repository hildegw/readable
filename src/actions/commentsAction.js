import * as PostsApi from '../utils/api'
import * as Types from './types'

// thunk to fetch comments for a parentId/post
export const fetchComments = (id) => dispatch => (
  PostsApi.fetchComments(id).then((data) => { dispatch(receiveComments(data)) }))
// action creator functions being called when comments have been fetched
export const receiveComments = (comments) => {
  return {
    type: Types.RECEIVE_COMMENTS,
    comments
  }
}

// thunk to fetch single comment by ID
export const fetchOneComment = (id) => dispatch => (
  PostsApi.fetchOneComment(id).then((data) => { dispatch(receiveOneComment(data)) }))
// action
export const receiveOneComment = (comment) => {
  return {
    type: Types.RECEIVE_ONE_COMMENT,
    comment
  }
}

// add a comment to DB and state
// thunk
export const addComment = (comment) => dispatch => {
  PostsApi.addComment(comment).then(dispatch(newComment(comment)))
}
// action
export const newComment = (comment) => {
  return {
    type: Types.ADD_COMMENT,
    comment
  }
}

// remove comment from DB and from store
// thunk
export const deleteComment = (comment) => dispatch => {
  PostsApi.deleteComment(comment['id']).then(dispatch(removeComment(comment)))
}
// action with payload = comment
export const removeComment = (comment) => {
  return {
    type: Types.REMOVE_COMMENT,
    comment
  }
}

// update edited comment in DB, calls same action as post edit
export const updateCommentInDb = (id, body, openPost) => dispatch => {
  PostsApi.updateComment(id, body)
  .then((data) => { dispatch(openPostDetail(openPost)) })
}

// setting openPost state to currently opened post or comment
export const openPostDetail = (openPost) => {
  return {
    type: Types.OPEN_POST_DETAIL,
    openPost
  }
}

export const countComments = (count, parentId) => {
  return {
    type: Types.COUNT_COMMENTS,
    count,
    parentId
  }
}
