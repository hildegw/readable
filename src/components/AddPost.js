import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { addPost } from '../actions'
import serializeForm from "form-serialize"
import uuid from "uuid"


class AddPosts extends Component {
  state = {
    category: 'none',
   }

  checkCategory = (event) => {
    this.setState({ category: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const newPost = serializeForm(event.target, {hash: true})
    const id = uuid()
    Object.assign(newPost, {id: id}, {category: this.state.category})
    this.props.addPost(newPost)
    this.props.history.push('/' + this.state.category) 
    this.props.history.go(2) //go to category list after submitting new post
  }

  justGoBack = (event) => { this.props.history.goBack() }

  render() {
    const {categories} = this.props.categories

    return (
      <div>
        <container className='Add-post'>
          <form onSubmit={this.handleSubmit} className="add-form">
            <div className="add-details">
              <div>
                <input type="text" name="author" placeholder="Your name" required />
                <input type="text" name="title" placeholder="Subject" required />
                <textarea type='text' className="add-text-area" name="body"
                  placeholder="Message" required ></textarea>
                { categories!==undefined && (
                <div className='add-radio' >
                  {categories.map((cat) =>
                    <label key={cat.name}><input type="radio" name='category' value={cat.name}
                      onClick={this.checkCategory} />
                      <span className={ this.state.category === cat.name ? 'add-radio-checked' : '' }>{cat.name}</span>
                    </label>
                  )}
                </div>)}
              </div>
              {this.state.category!=='none' &&
                <button className='add-discussion'>Add</button> }
            </div>
          </form>
          <button className="close-add" onClick={this.justGoBack}>Discard</button>
        </container>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => {
  return { categories }
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
