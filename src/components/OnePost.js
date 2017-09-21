import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchPosts, deletePost, openPostEdit, openPostDetail } from '../actions'
import { Link } from "react-router-dom"


class OnePost extends Component {

  render() {
      const post = {}

    return (
                <li key={post.id} className="post-list-item">
                  <div className="post-details">
                    <p className="post-author">{post.author}</p>
                    <p>{post.title}</p>
                    <p className="post-author">{post.category}</p>
                  </div>

                  <div className='post-tools'>
                    <Link onClick={()=>
                      { this.props.openPostDetail(post) }}
                      to={ {pathname: `/${post.category}/${post.id}`} }
                      className='post-comment'>377
                    </Link>

                    <Link onClick={()=>
                      { this.props.openPostEdit(post) }}
                      to={ {pathname: `/edit/${post.id}`} }
                      className='post-vote'>-566
                    </Link>

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
    openPostDetail: (data) => dispatch(openPostDetail(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnePost)
