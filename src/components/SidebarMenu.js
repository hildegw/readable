import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { addPost, selectCategory, openPostEdit } from '../actions'
import {Link} from "react-router-dom"

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
            to="/edit"
            className='add-post'
            onClick={()=> { this.props.openPostEdit({}) }}>
            New Discussion
          </Link>
        </div>

      </div>

    )
  }
}


const mapStateToProps = ({ posts, category, editPost }) => {
  //const postType = ['oPost', 'comment']  //TODO map correct type
  return { posts, category, editPost }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (data) => dispatch(addPost(data)),
    selectCategory: (data) => dispatch(selectCategory(data)),
    openPostEdit: (data) => dispatch(openPostEdit(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarMenu)
