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

// thunk to update post in DB
export const updatePostInDb = (id, title, body, openPost) => dispatch => {
  PostsApi.updatePost(id, title, body)
  .then((data) => { dispatch(openPostDetail(openPost)) })
}

// setting openPost state to currently opened post or comment
export const openPostDetail = (openPost) => {
  return {
    type: Types.OPEN_POST_DETAIL,
    openPost
  }
}
