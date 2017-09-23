import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { updatePostInDb, updateCommentInDb, fetchPosts, fetchComments,
  fetchOneComment, openPostEdit } from '../actions'
import serializeForm from 'form-serialize'


class EditPosts extends Component {

  componentDidMount(){
    const editPostId = this.props.match.params.id
    //Fetching posts and filter for id from url. If post does not exist, it's a comment
    this.props.fetchPosts() //TODO fetch just one post
      .then(() => {
        const { posts } = this.props.posts
        const post = posts.filter((post) => post.id===editPostId)
        if (post.length !== 0 ){
          this.props.openPostEdit(post.shift())
        } else {
          //It's a comment: Fetching comment with id from url, then restarting openPostEdit action.
          this.props.fetchOneComment(editPostId)
            .then(() => {
                const { comment } = this.props.comment
                this.props.openPostEdit(comment)
            })
        }
      })
  }

  //hand over edited post to store and DB
  handleSubmit = (event) => {
    event.preventDefault()
    const newPost = serializeForm(event.target, {hash: true})
    const { editPost } = this.props.editPost
    const id = editPost.id
    const title = newPost.title
    const body = newPost.body
    Object.assign(editPost, {title: title}, {body: body},)
    if (editPost.hasOwnProperty('parentId')) this.props.updateCommentInDb(id, body, editPost)
    else this.props.updatePostInDb(id, title, body, editPost)
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

                  { !editPost.hasOwnProperty('parentId') && (
                  <input type="text" name="title" placeholder="Subject" required
                    defaultValue={ editPost.title }  />)}

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

const mapStateToProps = ({ posts, editPost, comment }) => {
  return { posts, editPost, comment }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchComments: (parentId) => dispatch(fetchComments(parentId)),
    fetchOneComment: (id) => dispatch(fetchOneComment(id)),
    openPostEdit: (data) => dispatch(openPostEdit(data)),
    updatePostInDb: (id, title, body, postEdit) => dispatch(updatePostInDb(id, title, body, postEdit)),
    updateCommentInDb: (id, body, postEdit) => dispatch(updateCommentInDb(id, body, postEdit)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPosts)
