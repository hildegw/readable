import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchPosts, deletePost } from '../actions'
import OnePost from './OnePost'

//displays all posts or per category
class ShowPosts extends Component {

  componentDidMount(){ this.props.fetchPosts() }

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

const mapStateToProps = ({ posts }) => {
  return { posts }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    deletePost: (data) => dispatch(deletePost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowPosts)
