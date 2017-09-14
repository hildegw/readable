//possibel actions
export const ADD_POST = "ADD_POST"
export const REMOVE_POST = "REMOVE_POST"
export const OPEN_POST_EDIT = "OPEN_POST_EDIT"
export const SELECT_CATEGORY = "SELECT_CATEGORY"

//action creator functions

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

export const openPostEdit = (({editingPostID}) => {
  return {
    type: OPEN_POST_EDIT,
    editingPostID,
  }
})

export const selectCategory = (({categorySelected}) => {
  return {
    type: SELECT_CATEGORY,
    categorySelected,
  }
})
