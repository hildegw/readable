import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { addPost } from '../actions'
import {Link, Redirect} from "react-router-dom"
import serializeForm from "form-serialize"
import uuid from "uuid"


class AddPosts extends Component {
  state = { formDone: false }

  //hand over new post in format {id: {author: xxx, body: xxx, id: xxx}}
  handleSubmit = (event)=>{
    event.preventDefault()
    const newPost = serializeForm(event.target, {hash: true})
    const id = uuid()
    Object.assign(newPost, {id: id})
    this.props.addPost(newPost)
    this.setState({ formDone: true })
  }

  render() {
    console.log(this.props.editPost)

    return (
      <div>
      <container className='Add-post'>
        <form onSubmit={this.handleSubmit} className="add-form">
          <div className="add-details">
            <input type="text" name="author" placeholder="Your name" required />
            <input type="text" name="title" placeholder="Subject" required />
            <textarea type='text' className="add-text-area" name="body" placeholder="Message" required></textarea>
            <button className='add-discussion'>Add discussion</button>
          </div>
        </form>
        <Link to="/" className="close-add">Discard</Link>
      </container>
      { this.state.formDone && (<Redirect to='/' />)}
      </div>
    )
  }
}

const mapStateToProps = ({ posts, category, editPost }) => {
  //const postType = ['oPost', 'comment']  //TODO map correct type
  return {
    posts: posts,
    category: category,
    editPost: editPost,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (data) => dispatch(addPost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPosts)
