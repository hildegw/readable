import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { Link, Route, withRouter } from "react-router-dom"
import ShowPosts from './ShowPosts'
import AddPost from './AddPost'
import SidebarMenu from './SidebarMenu'
import EditPost from './EditPost'


class App extends Component {

  render() {

    return (
      <div>
        <container className="App-header" >
          <Link to='/' className='home-link'/>
          <h2>Discussion Board</h2>
        </container>

        <container className="Sidebar-show-posts" >

          <SidebarMenu />

          <Route exact path="/" component={ShowPosts} />

          <Route path="/add" component={AddPost} />

          <Route path="/edit/:id" component={EditPost} />

          <Route path="/category/:name" component={ShowPosts}/>

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
