import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchPosts, selectCategory } from '../actions'
import OnePost from './OnePost'

//displays all posts or per category
class ShowPosts extends Component {

  componentDidMount(){
    this.props.fetchPosts()
    const category = this.props.match.params.category
    this.props.selectCategory(category)
  }

  postsToShow = (posts, category) => {
      if (category!==undefined && posts!==undefined) {
        return posts.filter((post) => post.category === category)
      } else {
        return posts
      }
  }

  render() {
    const { posts } = this.props.posts
    const category = this.props.match.params.category
    const showPosts = this.postsToShow(posts, category)
    const showBody = false

    return (
      <div>
        { posts!==undefined && (
        <div className="post">
          <ol className="post-list">
              {showPosts.map((post)=>
                <li key={post.id} >
                  <OnePost
                    post={post}
                    showBody={showBody}
                  />
                </li>
            )}
          </ol>
        </div>)}
      </div>
    )
  }
}

const mapStateToProps = ({ posts, selectCategory }) => {
  return { posts, selectCategory }
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
