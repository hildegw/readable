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

  sortPosts = (posts) => {
    const { sortCategory } = this.props.sortCategory
    console.log(posts)
    if (posts !== undefined) {
    switch (sortCategory) {
      case 'top score':
        { return posts.sort((a, b) =>  a.voteScore < b.voteScore) }
      case 'most recent':
        { return posts.sort((a, b) =>  a.timestamp < b.timestamp) }
      default:
        return posts
    }} else { return posts }
  }

  postsToShow = (posts, category) => {
    const sortedPosts = this.sortPosts(posts)
    if (category !== undefined && posts !== undefined) {
      return sortedPosts.filter((post) => post.category === category)
    } else {
      return posts
    }
  }

  voting = () => { 
    const { posts } = this.props.posts
    this.sortPosts(posts)
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
                    onVoting={() => {this.voting()}}
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
