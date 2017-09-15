import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { addPost, removePost, openPostEdit, selectCategory } from '../actions'


class ShowPosts extends Component {

  render() {
    const idDemoComment = {
      "8888y6ziyjabvozdd253nd": {
        id: '8888y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'ABCD is the best place to learn React',
        body: 'Everyone says so after all.',
        author: '123',
        category: 'react',
        voteScore: 6,
        deleted: false
    }}

    const idKey = Object.keys(idDemoComment)[0]
    const catDemo = 'React'
    const posts = Object.entries(this.props.posts)
    console.log(this.props.posts)

    return (
      <div>
      <div className="post">
        <ol className="post-list">
          {posts.map((post)=>
            <li key={post[1].id} className="post-list-item">
              <div className="post-details">
                <p className="post-author">{post[1].author}</p>
                <p>{post[1].title}</p>
              </div>
              <button onClick={()=>
                { this.props.removePost({id: post}) }}
                className="post-remove">
                Remove
              </button>
            </li>
          )}
        </ol>
      </div>

      <div>
        <button onClick={()=>{this.props.openPostEdit({editingPostId: idKey})}}>Open!</button>
        <button onClick={()=>{this.props.addPost({id: idDemoComment})}}>Add!</button>
        <button onClick={()=>{this.props.removePost({id: idDemoComment})}}>Remove!</button>
        <button onClick={()=>{this.props.selectCategory({categorySelected: catDemo})}}>category!</button>
      </div>
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
    removePost: (data) => dispatch(removePost(data)),
    openPostEdit: (data) => dispatch(openPostEdit(data)),
    selectCategory: (data) => dispatch(selectCategory(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowPosts)
