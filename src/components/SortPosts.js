import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchCategories, selectCategory, setSortCategory } from '../actions'


class SortPosts extends Component {

 componentDidMount(){
   this.props.setSortCategory(this.getSortCategory('MOST_RECENT'))
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
    this.props.setSortCategory(event.target.value)
  }

  render() {
    const sortCategories = [this.getSortCategory('MOST_RECENT'), this.getSortCategory('TOP_SCORE')]
    const { sortCategory } = this.props.sortCategory
    console.log('render sort', sortCategory)
    
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


const mapStateToProps = ({ categories, categorySelected, sortCategory }) => {
  return { categories, categorySelected, sortCategory }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectCategory: (data) => dispatch(selectCategory(data)),
    fetchCategories: () => dispatch(fetchCategories()),
    setSortCategory: (data) => dispatch(setSortCategory(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SortPosts)
