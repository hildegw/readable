import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchPosts, deletePost, openPostEdit, openPostDetail } from '../actions'
import OnePost from './OnePost'


class ShowDetail extends Component {

  componentDidMount(){
    console.log('ShowDetail mounting', this.props)
    const postId = this.props.match.params.id
    if (this.props===undefined || !this.props.openPost.hasOwnProperty('openPost')) {
      this.props.fetchPosts()
        .then(() => {
          const { posts } = this.props.posts
          const post = posts.filter((post) => post.id===postId)
          console.log(post)
          this.props.openPostDetail(post[0])
  })}}

  //TODO: fetch Comments from DB via openPostDetail
  //load comments in list below post

  render() {
    console.log("render show detail", this.props.history)
    const { openPost } = this.props.openPost

    return (
      <div className='post'>
        { openPost!==undefined && (
            <OnePost
              post={ openPost }
              history={ this.props.history }
            /> )}
      </div>
    )
  }
}

const mapStateToProps = ({ posts, openPost }) => {
  return { posts, openPost }
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