import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost, deleteComment, openPostDetail, countComments, setVote } from '../actions'
import CommentsCounter from './CommentsCounter'


class OnePost extends Component {

  vote = (id, option, type, startScore) => {
    const { posts } = this.props.posts
    this.props.setVote(id, option, type, startScore, posts) 
  }

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
      const { post, showBody, vote } = this.props
      let type = 'posts' 
      if (post.hasOwnProperty('parentId')) type = 'comments'
      let voteScore = (vote[post.id] === undefined) ?  post.voteScore : vote[post.id]

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
              onClick={() => { this.vote(post.id, 'upVote', type, voteScore)}}
              className='post-voteup-link'>
            </button>
            {voteScore} 
            <button 
              onClick={() => { this.vote(post.id, 'downVote', type, voteScore) }}
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

const mapStateToProps = ({ posts, comments, vote, sortCategory }) => {
  return { posts, comments, vote, sortCategory }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (data) => dispatch(deletePost(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    openPostDetail: (data) => dispatch(openPostDetail(data)),
    countComments: (count, parentId) => dispatch(countComments(count, parentId)),
    setVote: (id, option, type, startScore) => dispatch(setVote(id, option, type, startScore)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnePost)
