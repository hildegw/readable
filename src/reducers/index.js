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
  }
}

const posts = (state=defaultData, action) => {
  switch (action.type) {
    case OPEN_POST_EDIT:
      const { editingPostID } = action
      return {
        ...state,
        [editingPostID]: editingPostID
      }
  case ADD_POST:

    return {

    }
  case REMOVE_POST:

    return {

    }
    default:
      return state

  }

}

const category = (state= {}, action) => {
  return state
}



export default combineReducers({posts, category})
