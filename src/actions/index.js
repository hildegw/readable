import * as PostsApi from '../utils/api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const OPEN_POST_EDIT = 'OPEN_POST_EDIT'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'  // TODO check if needed
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const OPEN_POST_DETAIL = 'OPEN_POST_DETAIL'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const RECEIVE_ONE_COMMENT = 'RECEIVE_ONE_COMMENT'

// fetch data from DB
// thunk for asynchronous call to fetch posts
export const fetchPosts = () => dispatch => (
  PostsApi.fetchPosts().then((data) => {
    dispatch(receivePosts(data))
  }))
// action creator functions being called when posts have been fetched
export const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

// thunk to fetch comments for a parentId/post
export const fetchComments = (id) => dispatch => (
  PostsApi.fetchComments(id).then((data) => {
    dispatch(receiveComments(data))
  }))
// action creator functions being called when comments have been fetched
export const receiveComments = (comments) => {
  return {
    type: RECEIVE_COMMENTS,
    comments
  }
}

// thunk to fetch single comment by ID
export const fetchOneComment = (id) => dispatch => (
  PostsApi.fetchOneComment(id).then((data) => {
    dispatch(receiveOneComment(data))
  }))
// action
export const receiveOneComment = (comment) => {
  return {
    type: RECEIVE_ONE_COMMENT,
    comment
  }
}

// fetch categories from DB
// thunk middleware for asynchronous call to fetch categories
export const fetchCategories = () => dispatch => (
  PostsApi.fetchCategories().then((data) => {
    dispatch(receiveCategories(data))
  }))
// action creator functions being called upon receive
export const receiveCategories = (categories) => {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

// add a post to DB and state
// thunk
export const addPost = (post) => dispatch => {
  PostsApi.addPost(post).then(dispatch(newPost(post)))
}
// actionpost
export const newPost = (post) => {
  return {
    type: ADD_POST,
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
    type: ADD_POST,
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
    type: REMOVE_POST,
    post
  }
}

// remove comment from DB and from store
// thunk
export const deleteComment = (comment) => dispatch => {
  PostsApi.deleteComment(comment['id']).then(dispatch(removeComment(comment)))
}
// action
export const removeComment = (comment) => {
  return {
    type: REMOVE_COMMENT,
    comment
  }
}

// update edited post in DB and store
// thunk to update DB
export const updatePostInDb = (id, title, body, editPost) => dispatch => {
  PostsApi.updatePost(id, title, body)
  .then(
    (data) => {
      dispatch(openPostEdit(editPost))
    })
}
// action to set state keeping the post to be edited
export const openPostEdit = (editPost) => {
  return {
    type: OPEN_POST_EDIT,
    editPost
  }
}

// update edited comment in DB, calls same action as post edit
export const updateCommentInDb = (id, body, editPost) => dispatch => {
  PostsApi.updateComment(id, body)
  .then(
    (data) => {
      dispatch(openPostEdit(editPost))
    })
}

// TODO fetch comments for post
export const openPostDetail = (openPost) => {
  return {
    type: OPEN_POST_DETAIL,
    openPost
  }
}

export const selectCategory = (categorySelected) => {
  return {
    type: SELECT_CATEGORY,
    categorySelected
  }
}
