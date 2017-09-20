import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchPosts, deletePost, openPostEdit } from '../actions'
import {Link} from "react-router-dom"


class ShowPosts extends Component {


  componentDidMount(){ this.props.fetchPosts() }

  postsToShow = (posts, category) => {
    console.log(category)
      if (category!==undefined && posts!==undefined) {
        return posts.filter((post) => post.category === category)
      } else {
        return posts
      }
  }

  render() {
    const { posts } = this.props.posts
    console.log(this.props.match)
    const category = this.props.match.params.name
    const showPosts = this.postsToShow(posts, category)

    return (
      <div>
        { posts!==undefined && (
        <div className="post">
          <ol className="post-list">
              {showPosts.map((post)=>
                <li key={post.id} className="post-list-item">
                  <div className="post-details">
                    <p className="post-author">{post.author}</p>
                    <p>{post.title}</p>
                    <p className="post-author">{post.category}</p>
                  </div>

                  <div className='post-tools'>
                    <Link onClick={()=>
                      { this.props.openPostEdit(post) }}
                      to={ {pathname: `/edit/${post.id}`} }
                      className='post-edit'>
                    </Link>

                    <button onClick={()=>
                      { this.props.deletePost(post) }}
                      className="post-remove">
                      Remove
                    </button>
                  </div>

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
    openPostEdit: (data) => dispatch(openPostEdit(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowPosts)
