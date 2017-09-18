import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { addPost, openPostEdit, updatePostInDb } from '../actions'
import {Link, Redirect} from "react-router-dom"
import serializeForm from "form-serialize"
import uuid from "uuid"


class AddPosts extends Component {
  state = {
    formDone: false,
    postExists: false,
   }

  componentDidMount(){ this.setPostExistState() }

  setPostExistState = () => {
    const postValues = this.props.editPost['editPost']
    try {
      postValues[1].hasOwnProperty('id')
      this.setState({ postExists: true })
    } catch (e) {
      this.setState({ postExists: false })
  }}

  //hand over post to store and DB
  handleSubmit = (event)=>{
    event.preventDefault()
    //edited post
    if (this.state.postExists) {
      const postValues = this.props.editPost['editPost']
      this.props.updatePostInDb(postValues[1].id, postValues[1].title,
        postValues[1].body, this.props.postEdit)
      this.setState({ postExists: false })
    //new post
    } else {
      const newPost = serializeForm(event.target, {hash: true})
      const id = uuid()
      Object.assign(newPost, {id: id})
      this.props.addPost(newPost)
    }
    this.setState({ formDone: true })
  }

  render() {
    const postValues = this.props.editPost['editPost']
    console.log(postValues)

    return (
      <div>
      { this.state.formDone && (<Redirect to='/' />)}

      <container className='Add-post'>
        <form onSubmit={this.handleSubmit} className="add-form">
          <div className="add-details">
            { this.state.postExists && (
              <div>
                <input type="text" name="author" placeholder="Your name" readOnly
                  value={ postValues[1].author }  />
                <input type="text" name="title" placeholder="Subject" required
                  defaultValue={ postValues[1].title }  />
                <textarea type='text' className="add-text-area" name="body"
                  placeholder="Message" required
                  defaultValue={ postValues[1].body } ></textarea>
              </div>
            )}

            { !this.state.postExists && (
              <div>
                <input type="text" name="author" placeholder="Your name" required />
                <input type="text" name="title" placeholder="Subject" required />
                <textarea type='text' className="add-text-area" name="body"
                  placeholder="Message" required ></textarea>
              </div>
            )}

            <button className='add-discussion'>Add discussion</button>
          </div>
        </form>
        <Link to="/" className="close-add">Discard</Link>
      </container>
      </div>
    )
  }
}

const mapStateToProps = ({ posts, category, editPost }) => {
  //const postType = ['oPost', 'comment']  //TODO map correct type
  return { posts, category, editPost }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (data) => dispatch(addPost(data)),
    openPostEdit: (data) => dispatch(openPostEdit(data)),
    updatePostInDb: (id, title, body, postEdit) => dispatch(updatePostInDb(id, title, body, postEdit)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPosts)
