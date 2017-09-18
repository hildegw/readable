import * as PostsApi from '../utils/api'

export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const ADD_POST = "ADD_POST"
export const REMOVE_POST = "REMOVE_POST"
export const OPEN_POST_EDIT = "OPEN_POST_EDIT"
export const SELECT_CATEGORY = "SELECT_CATEGORY"

//fetch data from DB
//thunk middleware for asynchronous call to fetch posts
export const fetchPosts = () => dispatch => (
  PostsApi.fetchPosts().then((data) => {
    dispatch(receivePosts(data))}))
//action creator functions being called when posts have been fetched
export const receivePosts = ((posts) => {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
})

//add a post to DB and state
//thunk
export const addPost = (post) => dispatch => {
  PostsApi.addPost(post).then(dispatch(newPost(post)))
}
//action
export const newPost = ((post) => {
  return {
    type: ADD_POST,
    post,
  }
})

//remove data from DB and from store
//thunk
export const deletePost = (post) => dispatch => {
  PostsApi.deletePost(post[1].id).then(dispatch(removePost(post)))
}
//action
export const removePost = ((post) => {
  return {
    type: REMOVE_POST,
    post,
  }
})

//update edited post in DB and store
//thunk to update DB
export const updatePostInDb = (id, title, body, editPost) => dispatch => {
  PostsApi.updatePost(id, title, body).then(dispatch(openPostEdit(editPost)))
}
////action to set state keeping the post to be edited
export const openPostEdit = ((editPost) => {
  return {
    type: OPEN_POST_EDIT,
    editPost,
  }
})

export const selectCategory = ((categorySelected) => {
  return {
    type: SELECT_CATEGORY,
    categorySelected,
  }
})
