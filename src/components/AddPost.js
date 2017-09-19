import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { addPost, } from '../actions'
import {Link, Redirect} from "react-router-dom"
import serializeForm from "form-serialize"
import uuid from "uuid"

//TODO investigate Link versus Redirect, adjust Add-Button visibility: formDone state

class AddPosts extends Component {
  state = {
    formDone: false,
    category: 'none',
   }

  checkCategory = (event) => {
    event.preventDefault()
    this.setState({ category: event.target.value })
  }

  //hand over post to store and DB
  handleSubmit = (event) => {
    event.preventDefault()
    const newPost = serializeForm(event.target, {hash: true})
    console.log(newPost)
    const id = uuid()
    Object.assign(newPost, {id: id}, {category: this.state.category})
    this.props.addPost(newPost)
    this.setState({ formDone: true })
  }

  render() {
    const categories = ['React', 'Redux', 'Udacity']  //TODO fetch from DB instead
    console.log(this.state.category)
    return (
      <div>
      { this.state.formDone && (<Redirect to='/' />)}
      <container className='Add-post'>
        <form onSubmit={this.handleSubmit} className="add-form">
          <div className="add-details">

              <div>
                <input type="text" name="author" placeholder="Your name" required />
                <input type="text" name="title" placeholder="Subject" required />
                <textarea type='text' className="add-text-area" name="body"
                  placeholder="Message" required ></textarea>

                <div className='add-radio' >
                {categories.map((cat) =>
                  <label key={cat}><input type="radio" name='category' value={cat}
                    onClick={this.checkCategory} />
                    <span className={ this.state.category===cat ? 'add-radio-checked' : '' }>{cat}</span>
                  </label>
                )}
                </div>

              </div>

            { this.state.category!=='none' &&
              <button className='add-discussion'>Add</button> }
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPosts)
