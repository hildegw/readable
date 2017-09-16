import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { addPost, deletePost, openPostEdit, selectCategory } from '../actions'


class AddPosts extends Component {

  render() {


    return (
      <div>

      </div>


    )
  }
}


const mapStateToProps = ({ posts, category }) => {
  //const postType = ['oPost', 'comment']  //TODO map correct type
  return {
    posts: posts,
    category: category,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (data) => dispatch(addPost(data)),
    deletePost: (data) => dispatch(deletePost(data)),
    openPostEdit: (data) => dispatch(openPostEdit(data)),
    selectCategory: (data) => dispatch(selectCategory(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPosts)
