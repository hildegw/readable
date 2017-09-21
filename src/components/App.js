import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { Link, Route, withRouter, Switch } from "react-router-dom"
import ShowPosts from './ShowPosts'
import AddPost from './AddPost'
import SidebarMenu from './SidebarMenu'
import EditPost from './EditPost'
import ShowDetail from './ShowDetail'


class App extends Component {

  render() {
    //TODO routing to :category and :id

    return (
      <div>
        <container className="App-header" >
          <Link to='/' className='home-link' alt="Logo Home" />
          <h2>Discussion Board</h2>
        </container>

        <container className="Sidebar-show-posts" >
          <SidebarMenu />
          <Switch>
            <Route exact path="/" component={ShowPosts} />
            <Route exact path="/add" component={AddPost} />
            <Route exact path="/edit/:id" component={EditPost} />
            <Route exact path="/:category" component={ShowPosts} />
            <Route exact path="/:category/:id" component={ShowDetail} />
          </Switch>
        </container>
      </div>
    )
  }
}

export default withRouter(connect()(App))
