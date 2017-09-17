import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { connect } from 'react-redux'
import {Route} from "react-router-dom"
import { fetchPosts, } from '../actions'
import ShowPosts from './ShowPosts'
import AddPost from './AddPost'
import SidebarMenu from './SidebarMenu'


class App extends Component {
componentDidMount(){ this.props.fetchPosts() }

  render() {

    return (
      <div>
        <container className="App-header" >
          <img src={logo} className="App-logo" alt="Logo Home" />
          <h1>Discussion Board</h1>
        </container>

        <container className="Sidebar-show-posts" >
          <SidebarMenu />
          <ShowPosts />
        </container>

        <Route path="/add" render={({history})=>(
          <container className="Add-post">
            <AddPost />
          </container>
        )}/>

      </div>
    )
  }
}

const mapStateToProps = ({ posts, category }) => {
  return {
    posts: posts,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
