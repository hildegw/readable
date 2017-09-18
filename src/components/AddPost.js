import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { addPost, openPostEdit, updatePostInDb, selectCategory } from '../actions'
import {Link, Redirect} from "react-router-dom"
import serializeForm from "form-serialize"
import uuid from "uuid"

//TODO investigate Link versus Redirect

class AddPosts extends Component {
  state = {
    formDone: false,
    postExists: false,
    category: 'none',
   }

  componentDidMount(){
    this.setPostExistState()
  }

  setPostExistState = () => {
    const postValues = this.props.editPost['editPost']
    try {
      postValues[1].hasOwnProperty('id')
      this.setState({ postExists: true })
    } catch (e) {
      this.setState({ postExists: false })
  }}

  checkCategory = (event) => {
    event.preventDefault()
    this.setState({ category: event.target.value})
  }

  //hand over post to store and DB
  handleSubmit = (event) => {
    event.preventDefault()
    //edited post
    if (this.state.postExists) {
      const newPost = serializeForm(event.target, {hash: true})
      const postValues = this.props.editPost['editPost']
      const editPost = postValues[1]
      const id = postValues[1].id
      const title = newPost.title
      const body = newPost.body
      Object.assign(editPost, {title: title}, {body: body},)
      this.props.updatePostInDb(id, title, body, editPost)
      this.setState({ postExists: false })
    //new post
    } else {
      const newPost = serializeForm(event.target, {hash: true})
      const id = uuid()
      Object.assign(newPost, {id: id})
      this.props.addPost(newPost)
      //this.props.selectCategory(newPost.category) TODO needed?
    }
    this.setState({ formDone: true })
  }

  render() {
    const categories = ['React', 'Redux', 'Udacity']  //TODO fetch from DB instead
    const postValues = this.props.editPost['editPost']
    console.log(this.state.category)
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

                <div className='add-radio' >
                {categories.map((cat) =>
                  <label key={cat}><input type="radio" name='category' value={cat}
                    onClick={this.checkCategory} required />
                    <span className={ this.state.category===cat ? 'add-radio-checked' : '' }>{cat}</span>
                  </label>
                )}
                </div>

              </div>
            )}


            <button className='add-discussion'>Add</button>
          </div>
        </form>
        <Link to="/" className="close-add">Discard</Link>
      </container>
      </div>
    )
  }
}

const mapStateToProps = ({ posts, category, editPost, }) => {
  //const postType = ['oPost', 'comment']  //TODO map correct type
  return { posts, category, editPost }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (data) => dispatch(addPost(data)),
    openPostEdit: (data) => dispatch(openPostEdit(data)),
    updatePostInDb: (id, title, body, postEdit) => dispatch(updatePostInDb(id, title, body, postEdit)),
    selectCategory: (data) => dispatch(selectCategory(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPosts)
