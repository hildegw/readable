import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { connect } from 'react-redux'
import {Route, withRouter} from "react-router-dom"
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
          <Route exact path="/" render={()=>(
            <ShowPosts />)}/>

            <Route path="/add" render={({history})=>(
              <container className="Add-post">
                <div>
                <AddPost />
                {console.log("add-post")}
                </div>
              </container>
            )}/>
        </container>



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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App))
