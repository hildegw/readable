import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { addPost, deletePost, openPostEdit, selectCategory } from '../actions'
import {Link} from "react-router-dom"
import serializeForm from "form-serialize"


class AddPosts extends Component {

  getNewId = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c==='x' ? r :(r&0x3|0x8)).toString(16);
    })
    return uuid
  }

  //hand over new post in format {id: {author: xxx, body: xxx, id: xxx}}
  handleSubmit = (event)=>{
    event.preventDefault()
    const newPost = serializeForm(event.target, {hash: true})
    const id = this.getNewId()
    Object.assign(newPost, {id: id})
    newPost[id] = newPost
    console.log(newPost)
    this.props.addPost(newPost)
  }

  render() {
    console.log(this.getNewId())


    return (
      <div>
      <container className='Add-post'>
        <form onSubmit={this.handleSubmit} className="add-form">
          <div className="add-details">
            <input type="text" name="author" placeholder="Your name"/>
            <input type="text" name="title" placeholder="Subject"/>
            <textarea className="add-text-area" name="body" placeholder="Message"></textarea>
            <button className='add-discussion'>Add discussion</button>
          </div>
        </form>
        <Link to="/" className="close-add">Discard</Link>
      </container>
      </div>
    )
  }
}


const mapStateToProps = ({ posts, category }) => {
  //const postType = ['oPost', 'comment']  //TODO map correct type
  return {
    posts: posts,
    category: category,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (data) => dispatch(addPost(data)),
    deletePost: (data) => dispatch(deletePost(data)),
    openPostEdit: (data) => dispatch(openPostEdit(data)),
    selectCategory: (data) => dispatch(selectCategory(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPosts)
