import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { updatePostInDb, fetchPosts, openPostEdit } from '../actions'
import serializeForm from "form-serialize"


class EditPosts extends Component {

  componentDidMount(){
    const editPostId = this.props.match.params.id
    if (this.props===undefined || !this.props.editPost.hasOwnProperty('editPost')) {
      this.props.fetchPosts()
        .then(() => {
          const { posts } = this.props.posts
          const post = posts.filter((post) => post.id===editPostId)
          this.props.openPostEdit(post[0])
    })}}

  //hand over post to store and DB
  handleSubmit = (event) => {
    event.preventDefault()
    const newPost = serializeForm(event.target, {hash: true})
    const { editPost } = this.props.editPost
    const id = editPost.id
    const title = newPost.title
    const body = newPost.body
    Object.assign(editPost, {title: title}, {body: body},)
    this.props.updatePostInDb(id, title, body, editPost)
    this.props.history.goBack()
  }

  justGoBack = (event) => { this.props.history.goBack() }

  render() {
    const { editPost } = this.props.editPost

    return (
      <div>
      { editPost!==undefined && (
      <container className='Add-post'>
        <form onSubmit={this.handleSubmit} className="add-form">
          <div className="add-details">
              <div>
                <input type="text" name="author" placeholder="Your name" readOnly
                  value={ editPost.author }  />
                <input type="text" name="title" placeholder="Subject" required
                  defaultValue={ editPost.title }  />
                <textarea type='text' className="add-text-area" name="body"
                  placeholder="Message" required
                  defaultValue={ editPost.body } ></textarea>
              </div>
            <button className='add-discussion'>Add</button>
          </div>
        </form>
        <button className="close-add" onClick={this.justGoBack}>Discard</button>
      </container>)}
      </div>
    )
  }
}

const mapStateToProps = ({ posts, editPost, }) => {
  return { posts, editPost }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    openPostEdit: (data) => dispatch(openPostEdit(data)),
    updatePostInDb: (id, title, body, postEdit) => dispatch(updatePostInDb(id, title, body, postEdit)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPosts)
