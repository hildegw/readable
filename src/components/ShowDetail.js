import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchPosts, deletePost, openPostEdit, openPostDetail } from '../actions'
import { Link, withRouter } from "react-router-dom"
import ShowPosts from './ShowPosts'
import OnePost from './OnePost'


class ShowDetail extends Component {

  componentDidMount(){
    console.log('ShowDetail mounting')

    const postId = this.props.match.params.id
    if (this.props.openPostDetail===undefined || !this.props.openPostDetail.hasOwnProperty('detailPost')) {
      this.props.fetchPosts()
        .then(() => {
          const { posts } = this.props.posts
          const post = posts.filter((post) => post.id===postId)
          console.log(post)
          this.props.openPostDetail(post[0])
  })}}

  render() {
    console.log(this.props)

  //  const detailPost = this.props.openPostDetail.detailPost
    const detailPost = {}

    return (
      <div>
        <OnePost postDetail={ detailPost } />
      </div>
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
    openPostDetail: (data) => dispatch(openPostDetail(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowDetail)
