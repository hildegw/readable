import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchCategories, selectCategory } from '../actions'
import {Link} from "react-router-dom"

//TODO: correct category when going back in history
//'add comment' menu item if showDetail is open
//reset openPost state when done with showDetail or Edit

class SidebarMenu extends Component {

  componentDidMount(){
    this.props.fetchCategories()
  }

  handleClickCat = (category) => {
    this.props.selectCategory(category)
  }

  render() {
    const { categories, categorySelected } = this.props.categories

    return (
      <div className='Sidebar-menu'>

        { categories!==undefined && (
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

const mapDispatchToProps = (dispatch) => {
  return {
    selectCategory: (data) => dispatch(selectCategory(data)),
    fetchCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarMenu)
