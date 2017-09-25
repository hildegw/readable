import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchPosts, deletePost, deleteComment, 
  openPostDetail, countComments, setVote } from '../actions'
import { Link } from 'react-router-dom'
import CommentsCounter from './CommentsCounter'

//TODO resolve routing issue on delete when history contains showDetail more than once
//TODO add warning for delete, deletes comments as well: different for post vs comment
//TODO use this.props.history.push('/') + goBack() in "repeated" case
// how to identify "repeated" case?

//displays one post
class OnePost extends Component {

  handleDelete = (event) => {
    const post = this.props.post
    const { comments } = this.props.comments
    if (post.hasOwnProperty('parentId')) {
      const count = comments.length - 1
      const parentId = post.parentId
      this.props.deleteComment(post)
      this.props.countComments(count, parentId) //counting comments
    } else {
      this.props.deletePost(post)
    }
    if (this.props.history) this.props.history.goBack()
  }

  render() {
      const { post, showBody } = this.props
      let type = 'posts' 
      if (post.hasOwnProperty('parentId')) type = 'comments'

    return (
      <div className="post-list-item">
        <div className="post-details">
          <p className="post-author">{post.author}</p>
          <p>{post.title}</p>
          { showBody && (<p>{post.body}</p>)}
          <p className="post-author">{post.category}</p>
        </div>

        <div className='post-tools'>

          { !post.hasOwnProperty('parentId') && (
          <div className='post-comment'> 
            <Link 
              onClick={() => { this.props.openPostDetail(post) }}
              to={ {pathname: `/${post.category}/${post.id}`} }
              className='post-comment-link'>
            </Link>
            <CommentsCounter post={post}/>
          </div>)}

          <div className='post-vote'>
            <button 
              onClick={() => { this.props.setVote(post.id, 'upVote', type) }}
              className='post-voteup-link'>
            </button>
            {post.voteScore} 
            <button 
              onClick={() => { this.props.setVote(post.id, 'downVote', type) }}
              className='post-votedown-link'>
            </button>
          </div>
          
          <Link 
            onClick={() => { this.props.openPostDetail(post) }}
            to={ {pathname: `/edit/${post.id}`} }
            className='post-edit'>
          </Link>

          <button
            onClick={() => { this.handleDelete() }}
            className="post-remove">
            Remove
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ posts, comments, vote }) => {
  return { posts, comments, vote }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    deletePost: (data) => dispatch(deletePost(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    openPostDetail: (data) => dispatch(openPostDetail(data)),
    countComments: (count, parentId) => dispatch(countComments(count, parentId)),
    setVote: (id, option, type) => dispatch(setVote(id, option, type)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnePost)
