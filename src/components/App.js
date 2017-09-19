import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { connect } from 'react-redux'
import {Route, withRouter} from "react-router-dom"
import ShowPosts from './ShowPosts'
import AddPost from './AddPost'
import SidebarMenu from './SidebarMenu'
import EditPost from './EditPost'
import ShowCategoryPosts from './ShowCategoryPosts'

//TODO home button
class App extends Component {

  render() {

    return (
      <div>
        <container className="App-header" >
          <img src={logo} className="App-logo" alt="Logo Home" />
          <h2>Discussion Board</h2>
        </container>

        <container className="Sidebar-show-posts" >

          <SidebarMenu />

          <Route exact path="/" render={()=>(
            <ShowPosts />)}/>

          <Route path="/add" render={({history})=>(
              <AddPost />
          )}/>

          <Route path="/edit/:id" component={EditPost} />

          <Route path="/category/:name" component={ShowCategoryPosts}/>

        </container>
      </div>
    )
  }
}

/*const mapStateToProps = ({ posts, }) => {
  return {
    posts: posts,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
  }
}*/

export default withRouter(connect(
)(App))
