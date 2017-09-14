import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { connect } from 'react-redux'
import { addPost, removePost, openPostEdit, selectCategory } from '../actions'


class App extends Component {


  render() {
    const idDemoComment = {
      "904tuq4ut84ut8v4t8wun89g": {
        id: '894tuq4ut84ut8v4t8wun89g',
        parentId: "8xf0y6ziyjabvozdd253nd",
        timestamp: 1468166872634,
        body: 'Hi there! I am a COMMENT.',
        author: 'thingtwo',
        voteScore: 6,
        deleted: false,
        parentDeleted: false
    }}
    const idKey = Object.keys(idDemoComment)[0]
    const catDemo = 'React'
    console.log(this.props.category)


    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={()=>{this.props.openPostEdit({editingPostId: idKey})}}>Open!</button>
        <button onClick={()=>{this.props.addPost({id: idDemoComment})}}>Add!</button>
        <button onClick={()=>{this.props.removePost({id: idDemoComment})}}>Remove!</button>
        <button onClick={()=>{this.props.selectCategory({categorySelected: catDemo})}}>category!</button>

      </div>
    )
  }
}


const mapStateToProps = ({ posts, category }) => {
  const postType = ['oPost', 'comment']  //TODO map correct type
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
)(App)
