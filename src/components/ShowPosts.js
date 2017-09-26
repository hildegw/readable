import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchPosts, selectCategory, setSortCategory } from '../actions'
import OnePost from './OnePost'
import SortSelector from './SortSelector'

class ShowPosts extends Component {

  componentDidMount(){
    this.props.fetchPosts()
    const category = this.props.match.params.category
    this.props.selectCategory(category)
  }

  postsToShow = (posts, category) => {
    const { sortCategory } = this.props.sortCategory
    console.log('ShowPosts postsToShow()', sortCategory)
    if (category!==undefined && posts!==undefined) {
      let sortedPosts = posts
      if (sortCategory === 'top score') { sortedPosts = posts.sort((a, b) =>  a.voteScore < b.voteScore) }
      else { sortedPosts = posts.sort((a, b) =>  a.timestamp < b.timestamp) }
      console.log('postsToShow sorted', sortedPosts)
      return sortedPosts.filter((post) => post.category === category)
    } else {
      return posts
    }
  }

  render() {
    const { posts } = this.props.posts
    const category = this.props.match.params.category
    const { sortCategory } = this.props.sortCategory
    const showPosts = this.postsToShow(posts, category)
    const showBody = false

    return (
      <div>

        <SortSelector />
      
        { posts!==undefined && (
        <div className="post">
          <div className="post-list">
              {showPosts.map((post)=>
                <div key={post.id} >
                  <OnePost
                    post={post}
                    showBody={showBody}
                  />
                </div>
            )}
          </div>
        </div>)}
      </div>
    )
  }
}

const mapStateToProps = ({ posts, selectCategory, sortCategory }) => {
  return { posts, selectCategory, sortCategory }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    selectCategory: (data) => dispatch(selectCategory(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowPosts)
