import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchPosts, deletePost, openPostEdit, openPostDetail, fetchComments } from '../actions'
import OnePost from './OnePost'

class ShowDetail extends Component {

  componentDidMount () {
    console.log('Detail mounting')
    const postId = this.props.match.params.id
    this.props.fetchComments(postId)
    this.props.fetchPosts()
      .then(() => {
        const { posts } = this.props.posts
        const post = posts.filter((post) => post.id === postId)
        this.props.openPostDetail(post.shift())
      })
  }

  render () {
    const { openPost } = this.props.openPost
    const { comments } = this.props.comments
    const showBody = true

    return (
      <div>
        <div className='post'>
          { openPost !== undefined && (
          <OnePost
            post={openPost}
            showBody={showBody}
            history={this.props.history}
              />)}
        </div>

        { comments !== undefined && openPost !== undefined && (
        <div className='post'>
          <ol className='post-list'>
            {comments.map((comment) =>
              <li key={comment.id} >
                <OnePost
                  post={comment}
                  showBody={showBody}
                  />
              </li>
            )}
          </ol>
        </div>)}
      </div>

    )
  }
}

const mapStateToProps = ({ posts, openPost, comments }) => {
  return { posts, openPost, comments }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchComments: (data) => dispatch(fetchComments(data)),
    deletePost: (data) => dispatch(deletePost(data)),
    openPostEdit: (data) => dispatch(openPostEdit(data)),
    openPostDetail: (data) => dispatch(openPostDetail(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowDetail)
