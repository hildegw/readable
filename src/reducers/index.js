import { ADD_POST, REMOVE_POST, OPEN_POST_EDIT, SELECT_CATEGORY } from '../actions'
import { combineReducers } from 'redux'

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false
  },
  "99999y6ziyjabvozdd253nd": {
    id: '99999y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'xxx is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'four',
    category: 'react',
    voteScore: 6,
    deleted: false
  },
}

//TODO adapt reducers to data fetched from Server

const posts = (state={}, action) => {
  const { editingPostId, id } = action
  switch (action.type) {
    case OPEN_POST_EDIT:
      return {
        ...state,
        editingPostId: editingPostId,
      }
    case ADD_POST:
      const stateAfterAdded = Object.assign({}, state, id) //adding new post to existing posts
      return stateAfterAdded
    case REMOVE_POST:
      const postToRemove = Object.keys(id)[0]
      const stateAfterDelete = Object.assign({}, state) //copy state
      delete stateAfterDelete[postToRemove]
      return stateAfterDelete
    default:
      return state
  }
}

const category = (state= {}, action) => {
  const { categorySelected } = action
  switch (action.type) {
    case SELECT_CATEGORY:
      return {
        ...state,
        categorySelected: categorySelected,
      }
    default:
      return state
  }
}

export default combineReducers({posts, category})
