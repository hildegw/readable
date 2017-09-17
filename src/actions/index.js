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
export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts,
});

//add a post to DB and state
//thunk
export const addPost = (post) => dispatch => {
  dispatch(newPost(post))
  PostsApi.addPost(post)
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
export const deletePost = (id) => dispatch => {
  dispatch(removePost({id}))
  PostsApi.deletePost(id)  //does not return value
}
//action
export const removePost = (({id}) => {
  return {
    type: REMOVE_POST,
    id,
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
