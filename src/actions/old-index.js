import * as PostsApi from '../utils/api'
import * as Types from './types'

// fetch data from DB and then set state
// thunk for asynchronous call to fetch posts
export const fetchPosts = () => dispatch => (
  PostsApi.fetchPosts().then((data) => { dispatch(receivePosts(data)) }))
// action creator functions being called when posts have been fetched
export const receivePosts = (posts) => {
  return {
    type: Types.RECEIVE_POSTS,
    posts
  }
}

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

// add a post to DB and state
// thunk
export const addPost = (post) => dispatch => {
  PostsApi.addPost(post).then(dispatch(newPost(post)))
}
// action
export const newPost = (post) => {
  return {
    type: Types.ADD_POST,
    post
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

// remove post from DB and from store
// thunk
export const deletePost = (post) => dispatch => {
  PostsApi.deletePost(post['id']).then(dispatch(removePost(post)))
}
// action
export const removePost = (post) => {
  return {
    type: Types.REMOVE_POST,
    post
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

// thunk to update post in DB
export const updatePostInDb = (id, title, body, openPost) => dispatch => {
  PostsApi.updatePost(id, title, body)
  .then((data) => { dispatch(openPostDetail(openPost)) })
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

export const selectCategory = (categorySelected) => {
  return {
    type: Types.SELECT_CATEGORY,
    categorySelected
  }
}

export const countComments = (count, parentId) => {
  return {
    type: Types.COUNT_COMMENTS,
    count,
    parentId
  }
}

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

export const setSortCategory = (sortCategory) => {
  return {
    type: Types.SET_SORT_CATEGORY,
    sortCategory
  }
}
