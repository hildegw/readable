import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchCategories, selectCategory } from '../actions'
import {Link} from "react-router-dom"


class SortPosts extends Component {

  state = {
    sortCategory: 'most recent',
   }

  getSortCategory = (type) => {
    switch (type) {
      case 'MOST_RECENT':
        return 'most recent'
      case 'TOP_SCORE':
        return 'top score'
      default:
        return 'most recent'
    }
  }

  handleClick = (event) => {
    this.setState({ sortCategory: event.target.value })
  }

  render() {
    const sortCategory = this.state.sortCategory
    const sortCategories = [this.getSortCategory('MOST_RECENT'), this.getSortCategory('TOP_SCORE')]
    
    return (
      <div>
        <div className='add-radio' >
          {sortCategories.map((cat) =>
            <label key={cat}>
            <input type="radio" 
              name='category' 
              value={cat}
              onClick={this.handleClick} />
              <span 
                className={ sortCategory === cat 
                  ? 'add-radio-checked' 
                  : '' }>
                {cat}
              </span>
            </label>
          )}
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
)(SortPosts)
