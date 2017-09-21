import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchPosts, deletePost, openPostEdit } from '../actions'
import { Link, withRouter } from "react-router-dom"
import ShowPosts from './ShowPosts'
import OnePost from './OnePost'


class ShowDetail extends Component {

  componentDidMount(){ this.props.fetchPosts() }

  /*postsToShow = (posts, category) => {
      if (category!==undefined && posts!==undefined) {
        return posts.filter((post) => post.category === category)
      } else {
        return posts
      }
  }*/

  render() {
    //const { detailPost } = this.props.detailPost //does not work, no idea why



    return (
        <div></div>
    )
  }
}

const mapStateToProps = ({ posts }) => {
  return { posts }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    deletePost: (data) => dispatch(deletePost(data)),
    openPostEdit: (data) => dispatch(openPostEdit(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowDetail)
