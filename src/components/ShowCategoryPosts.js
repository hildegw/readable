import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchPosts, deletePost, openPostEdit } from '../actions'
import {Link} from "react-router-dom"


class ShowCategoryPosts extends Component {

  componentDidMount(){
    if (this.props===undefined || !this.props.posts.hasOwnProperty('posts')) {
      this.props.fetchPosts()}
  }

  render() {
    const { posts } = this.props.posts
    const category = this.props.match.params.name

    return (
      <div>
        { posts!==undefined && (
        <div className="post">
          <ol className="post-list">
            {posts.filter((post) => post.category === category)
              .map((post)=>
              <li key={post.id} className="post-list-item">
                <div className="post-details">
                  <p className="post-author">{post.author}</p>
                  <p>{post.title}</p>
                  <p className="post-author">{post.category}</p>
                </div>

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

              </li>
            )}
          </ol>
        </div>)}

      </div>
    )
  }
}

const mapStateToProps = ({ posts, categories, editPost }) => {
  return { posts, categories, editPost }
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
)(ShowCategoryPosts)
