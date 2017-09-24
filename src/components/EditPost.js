import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { updatePostInDb, updateCommentInDb, fetchPosts, fetchComments,
  fetchOneComment, openPostDetail } from '../actions'
import serializeForm from 'form-serialize'


class EditPosts extends Component {

  componentDidMount(){
    const editPostId = this.props.match.params.id
    //Fetching posts and filter for id from url. If post does not exist, it's a comment
    this.props.fetchPosts()
      .then(() => {
        const { posts } = this.props.posts
        const post = posts.filter((post) => post.id===editPostId)
        if (post.length !== 0 ){
          this.props.openPostDetail(post.shift())
        } else {
          //It's a comment: Fetching comment with id from url, then restarting openPostEdit action.
          this.props.fetchOneComment(editPostId)
            .then(() => {
                const { comment } = this.props.comment
                this.props.openPostDetail(comment)
            })
        }
      })
  }

  //hand over edited post to store and DB
  handleSubmit = (event) => {
    const newPost = serializeForm(event.target, {hash: true})
    const { openPost } = this.props.openPost
    const id = openPost.id
    const title = newPost.title
    const body = newPost.body
    Object.assign(openPost, {title: title}, {body: body},)
    if (openPost.hasOwnProperty('parentId')) {
      this.props.updateCommentInDb(id, body, openPost)
    } else {
      this.props.updatePostInDb(id, title, body, openPost)
    }
    this.props.history.goBack()
  }

  justGoBack = (event) => { this.props.history.goBack() }

  render() {
    const { openPost } = this.props.openPost

    return (
      <div>
      { openPost!==undefined && (
        <container className='Add-post'>
          <form onSubmit={this.handleSubmit} className="add-form">
            <div className="add-details">
                <div>
                  <input type="text" name="author" placeholder="Your name" readOnly
                    value={ openPost.author }  />

                  { !openPost.hasOwnProperty('parentId') && (
                  <input type="text" name="title" placeholder="Subject" required
                    defaultValue={ openPost.title }  />)}

                  <textarea type='text' className="add-text-area" name="body"
                    placeholder="Message" required
                    defaultValue={ openPost.body } ></textarea>

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

const mapStateToProps = ({ posts, openPost, comment }) => {
  return { posts, openPost, comment }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchComments: (parentId) => dispatch(fetchComments(parentId)),
    fetchOneComment: (id) => dispatch(fetchOneComment(id)),
    openPostDetail: (data) => dispatch(openPostDetail(data)),
    updatePostInDb: (id, title, body, postEdit) => dispatch(updatePostInDb(id, title, body, postEdit)),
    updateCommentInDb: (id, body, postEdit) => dispatch(updateCommentInDb(id, body, postEdit)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPosts)
