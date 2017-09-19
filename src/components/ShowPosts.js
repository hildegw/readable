import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchPosts, deletePost, openPostEdit } from '../actions'
import {Link} from "react-router-dom"


class ShowPosts extends Component {

  componentDidMount(){ this.props.fetchPosts() }

  render() {
    const posts = Object.entries(this.props.posts)

    return (
      <div>
        <div className="post">
          <ol className="post-list">
            {posts.map((post)=>
              <li key={post[1].id} className="post-list-item">
                <div className="post-details">
                  <p className="post-author">{post[1].author}</p>
                  <p>{post[1].title}</p>
                  <p className="post-author">{post[1].category}</p>
                </div>

                <Link onClick={()=>
                  { this.props.openPostEdit(post) }}
                  to={ {pathname: `/edit/${post[1].id}`} }
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
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ posts, categories, editPost }) => {
  //const postType = ['oPost', 'comment']  //TODO map correct type
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
)(ShowPosts)
