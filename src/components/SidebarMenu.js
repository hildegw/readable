import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchCategories, selectCategory, openPostEdit } from '../actions'
import {Link} from "react-router-dom"


class SidebarMenu extends Component {
  state = {
    cateName: 'none',
  }

  componentDidMount(){
    this.props.fetchCategories()
  }

  handleClick = (catName) => {
    this.props.selectCategory(catName)
    this.setState({catName: catName})
  }

  render() {
    const { categories } = this.props.categories

    return (
      <div className='Sidebar-menu'>

        { categories!==undefined && (
        <div className="cat-list">
          {categories.map((cat)=>
            <div key={cat.name}>
              <ul>
              <Link
                to={'/category/' + cat.name}
                onClick={()=> { this.handleClick(cat.name) }}
                className={ this.state.catName===cat.name ? 'cat-item-selected' : 'cat-item' }>
                {cat.name}
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
            new discussion
          </Link>
        </div>

      </div>

    )
  }
}


const mapStateToProps = ({ categories, }) => {
  return { categories, }
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
