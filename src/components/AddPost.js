import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { addPost, addComment, openPostDetail, fetchPosts } from '../actions'
import serializeForm from "form-serialize"
import uuid from "uuid"
import OnePost from './OnePost'


//TODO adjust Add-Button visibility
//TODO preselect cat when coming from cat-view

class AddPosts extends Component {
  state = {
    category: 'none',
   }

   componentDidMount(){
     const parentId = this.props.match.params.id
     //Fetching posts, and filter for id from url. If post does not exist, it's a comment
     this.props.fetchPosts()
       .then(() => {
         const { posts } = this.props.posts
         const post = posts.filter((post) => post.id === parentId)
         if (post.length !== 0 ){
           this.props.openPostDetail(post.shift())
         }
       })
   }

  checkCategory = (event) => {
    this.setState({ category: event.target.value })
  }

  //hand over post to store and DB
  handleSubmit = (event) => {
    event.preventDefault()
    const newPost = serializeForm(event.target, {hash: true})
    const id = uuid()
    Object.assign(newPost, {id: id}, {category: this.state.category})
    this.props.addPost(newPost)
    this.props.history.push('/' + this.state.category) //TODO check link
    this.props.history.go(2)
    console.log(this.props.history)
  }

  justGoBack = (event) => { this.props.history.goBack() }

  render() {
    const {categories} = this.props.categories
    const openPost = this.props.openPost
    console.log("render AddPost - openPost ", openPost)
    const showBody = true

    return (
      <div>

              <OnePost
                post={openPost}
                showBody={showBody}
              />



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
                      <span className={ this.state.category===cat.name ? 'add-radio-checked' : '' }>{cat.name}</span>
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

const mapStateToProps = ({ categories, openPost, posts }) => {
  return { categories, openPost, posts }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (data) => dispatch(addPost(data)),
    fetchPosts: () => dispatch(fetchPosts()),
    openPostDetail: (data) => dispatch(openPostDetail(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPosts)
