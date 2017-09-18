import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { addPost, openPostEdit, updatePostInDb } from '../actions'
import {Link, Redirect} from "react-router-dom"
import serializeForm from "form-serialize"
import uuid from "uuid"


class AddPosts extends Component {
  state = { formDone: false }

  //hand over new post in format {id: {author: xxx, body: xxx, id: xxx}}
  handleSubmit = (event)=>{
    event.preventDefault()
    //const postToEdit = this.props.editPost
    //const postExists = postToEdit.hasOwnProperty('editPost')
    const postValues = this.props.editPost['editPost']
    const postExists = postValues.hasOwnProperty('id')

    if (postExists) {
      //let postValues = postToEdit['editPost']
      this.props.updatePostInDb(postValues[1].id, postValues[1].title,
        postValues[1].body, postValues)

    } else {
      const newPost = serializeForm(event.target, {hash: true})
      const id = uuid()
      Object.assign(newPost, {id: id})
      this.props.addPost(newPost)
    }
    this.setState({ formDone: true })
  }

  render() {
    console.log(this.props.editPost)
    //const postToEdit = this.props.editPost
    //const postExists = postToEdit.hasOwnProperty('editPost')
    //let postValues = postToEdit['editPost']
    const postValues = this.props.editPost['editPost']
    console.log(postValues)
    console.log(postValues.hasOwnProperty())
    let postExists = false
    try {
      postValues[1].hasOwnProperty('id')
      postExists = true
    } catch (e) {
      postExists = false
    }

    return (
      <div>
      { this.state.formDone && (<Redirect to='/' />)}

      <container className='Add-post'>
        <form onSubmit={this.handleSubmit} className="add-form">
          <div className="add-details">
            { postExists && (
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

            { !postExists && (
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
    updatePostInDb: (data) => dispatch(updatePostInDb(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPosts)
