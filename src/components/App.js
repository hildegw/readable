import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { connect } from 'react-redux'
import { fetchPosts, addPost, removePost, openPostEdit, selectCategory } from '../actions'
import ShowPosts from './ShowPosts'

class App extends Component {
componentDidMount(){ this.props.fetchPosts().then((data) => {
    console.log(data)
  }) }

  render() {

    return (
      <div>
        <container className="App-header" >
          <img src={logo} className="App-logo" alt="Logo Home" />
          <h1>Discussion Board</h1>
        </container>

        <div>
          <ShowPosts />
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
    fetchPosts: () => dispatch(fetchPosts()),
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
