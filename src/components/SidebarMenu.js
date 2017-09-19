import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchCategories, selectCategory, openPostEdit } from '../actions'
import {Link} from "react-router-dom"

class SidebarMenu extends Component {

  componentDidMount(){
    this.props.fetchCategories()
  }

  render() {
    const {categories} = this.props.categories

    return (
      <div className='Sidebar-menu'>

        { categories!==undefined && (
        <div className="cat-list">
          {categories.map((cat)=>
            <div key={cat['name']}>
              <ul>
              <Link
                to={'/' + cat['name']}
                className='cat-item'
                onClick={()=> { this.props.selectCategory(cat['name']) }}>
                {cat['name']}
              </Link>
              </ul>
            </div>
          )}
        </div>)}

        <div>
          <Link
            to="/add"
            className='add-post-link'
            onClick={()=> { this.props.openPostEdit({}) }}>
            New Discussion
          </Link>
        </div>

      </div>

    )
  }
}


const mapStateToProps = ({ categories, editPost }) => {
  //const postType = ['oPost', 'comment']  //TODO map correct type
  return { categories, editPost }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectCategory: (data) => dispatch(selectCategory(data)),
    openPostEdit: (data) => dispatch(openPostEdit(data)),
    fetchCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarMenu)
