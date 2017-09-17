import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { addPost, selectCategory } from '../actions'
import {Link} from "react-router-dom"
import AddPost from "./AddPost"

class SidebarMenu extends Component {


  render() {
    const categories = ['React', 'Redux', 'Udacity']

    return (
      <div className='Sidebar-menu'>

        <div className="cat-list">
          {categories.map((cat)=>
            <div key={cat}>
              <ul>
              <Link
                to={'/' + cat}
                className='cat-item'
                onClick={()=> { this.props.selectCategory(cat) }}>
                {cat}
              </Link>
              </ul>
            </div>
          )}
        </div>

        <div>
          <Link
            to="/add"
            className='add-post'>
            New Discussion</Link>
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
    selectCategory: (data) => dispatch(selectCategory(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarMenu)
