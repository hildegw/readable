import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchComments, countComments } from '../actions'

//TODO learn how to count

class CommentsCounter extends Component {
  state = {
    count: 0,
  }

  componentDidMount () {
    const parentId = this.props.post.id
    this.props.fetchComments(parentId).then(() => {
      const { comments } = this.props.comments
      this.getLength(comments, parentId)
    })
  }

  getLength = (comments, parentId) => {
    if (Array.isArray(comments)) {
      const count = comments.length
      return this.props.countComments(count, parentId)
    }
  }

  render () {
    const {count} = this.props.commentCounter

    return (
      <div className='counter'>
        <span>{count}</span>
      </div>

    )
  }
}

const mapStateToProps = ({ comments, commentCounter }) => {
  return { comments, commentCounter }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: (data) => dispatch(fetchComments(data)),
    countComments: (count, parentId) => dispatch(countComments(count, parentId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsCounter)
