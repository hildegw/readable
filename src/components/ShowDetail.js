import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchPosts, deletePost, openPostDetail, fetchComments,
  addComment } from '../actions'
import OnePost from './OnePost'
import serializeForm from "form-serialize"
import uuid from "uuid"


class ShowDetail extends Component {

  componentDidMount () {
    console.log("mounting Show Detail")
    const postId = this.props.match.params.id
    this.props.fetchComments(postId)
    this.props.fetchPosts()
      .then(() => {
        const { posts } = this.props.posts
        const post = posts.filter((post) => post.id === postId)
        this.props.openPostDetail(post.shift())
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const parentId = this.props.match.params.id
    const newComment = serializeForm(event.target, {hash: true})
    const id = uuid()
    Object.assign(newComment, {id: id}, {parentId: parentId})
    console.log("reste ", event)
    this.props.addComment(newComment)
    this.addForm.reset()
  }

  render () {
    const { openPost } = this.props.openPost
    const { comments } = this.props.comments
    const showBody = true

    return (
      <div>
        <div className='post'>
          <div className='post-list'>
            { openPost !== undefined && (
            <OnePost
              post={openPost}
              showBody={showBody}
              history={this.props.history}
            />)}
          </div>
        </div>

        { comments !== undefined && openPost !== undefined && (
        <div className='comment'>
          <div className='post-list'>
            {comments.map((comment) =>
              <div key={comment.id} >
                <OnePost
                  post={comment}
                  showBody={showBody}
                  />
              </div>
            )}
          </div>
        </div>)}

        <div>
          { openPost !== undefined && (
          <container className='Add-post'>
            <form onSubmit={this.handleSubmit}
                  className='add-form'
                  ref={(addForm) => this.addForm = addForm} >
              <div className='add-details'>
                <div>
                  <input type='text' name='author' placeholder='Your name' required />
                  <textarea type='text' className='add-text-area' name='body'
                    placeholder='Message' required />
                </div>
                <button className='add-discussion'>Add</button>
              </div>
            </form>
          </container>)}
        </div>
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
    openPostDetail: (data) => dispatch(openPostDetail(data)),
    addComment: (data) => dispatch(addComment(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowDetail)
