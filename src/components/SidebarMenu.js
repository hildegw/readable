import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import * as selectorsAction from '../actions/selectorsAction'
import { Link } from "react-router-dom"


class SidebarMenu extends Component {

  componentDidMount(){
    this.props.fetchCategories()
  }

  catToShow = () => {
    let {categories, categorySelected} = this.props.categories
    if (categories !== undefined) {
      const checkLink = this.props.match.params.category
      const checkCat = categories.filter((cat) => cat.name === checkLink)
      if (checkCat.length !== 0) categorySelected = checkCat.shift().name
      return categorySelected
    } else {
      const { categorySelected } = this.props.categories
      return categorySelected
    }
  }

  handleClickCat = (category) => {
    this.props.selectCategory(category)
  }

  render() {
    const categorySelected = this.catToShow()
    const { categories } = this.props.categories
    
    return (
      <div className='Sidebar-menu'>

        { categories !== undefined && (
        <div className="cat-list">
          {categories.map((cat)=>
            <div key={cat.name}>
              <ul>
              <Link
                to={'/' + cat.name}
                onClick={()=> { this.handleClickCat(cat.name) }}
                className={ categorySelected === cat.name ? 'cat-item-selected' : 'cat-item' }>
                {cat.name}
              </Link>
              </ul>
            </div>
          )}
        </div>)}

        <div className='sidebar-add'>
          <Link
            to="/add"
            className='sidebar-add-post-link' >
            new discussion
          </Link>
        </div>

      </div>

    )
  }
}


const mapStateToProps = ({ categories, categorySelected }) => {
  return { categories, categorySelected }
}

export default connect(
  mapStateToProps,
  selectorsAction
)(SidebarMenu)
