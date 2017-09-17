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
  console.log("receivePosts")
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
  console.log('addPost')
  return {
    type: ADD_POST,
    post,
  }
})

//remove data from DB and from store
//thunk
export const deletePost = (post) => dispatch => {
  console.log(post[1].id)
  PostsApi.deletePost(post[1].id).then(dispatch(removePost(post)))
}
//action
export const removePost = ((post) => {
  console.log("removePost")
  return {
    type: REMOVE_POST,
    post,
  }
})

export const openPostEdit = (({editingPostId}) => {
  return {
    type: OPEN_POST_EDIT,
    editingPostId,
  }
})

export const selectCategory = ((categorySelected) => {
  return {
    type: SELECT_CATEGORY,
    categorySelected,
  }
})
