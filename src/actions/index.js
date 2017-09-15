import * as PostsApi from '../utils/api'

export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const ADD_POST = "ADD_POST"
export const REMOVE_POST = "REMOVE_POST"
export const OPEN_POST_EDIT = "OPEN_POST_EDIT"
export const SELECT_CATEGORY = "SELECT_CATEGORY"

//action creator functions
export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts,
});

//thunk middleware for asynchronous call
export const fetchPosts = () => dispatch => (
  PostsApi.fetchPosts().then((data) => {
    console.log(data)
    dispatch(receivePosts(data))}))

export const addPost = (({id}) => {
  return {
    type: ADD_POST,
    id,
  }
})

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

export const selectCategory = (({categorySelected}) => {
  return {
    type: SELECT_CATEGORY,
    categorySelected,
  }
})
