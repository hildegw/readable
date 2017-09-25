const api = 'http://localhost:3001'

export const fetchPosts = () => {
  const headersGet = {
    headers: { 'Authorization': 'hildegwUdacityReadable' }
  }
  return fetch(`${api}/posts`, headersGet)
  .then(result => result.json())
}

//    GET /posts/:id/comments
export const fetchComments = (id) => {
  const headersGet = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'hildegwUdacityReadable'
    }
  }
  return fetch(`${api}/posts/${id}/comments`, headersGet)
  .then(result => result.json())
}

export const fetchCategories = () => {
  const headersGet = {
    headers: { 'Authorization': 'hildegwUdacityReadable' }
  }
  return fetch(`${api}/categories`, headersGet)
  .then(result => result.json())
  .then(data => data.categories)
}

export const deletePost = (id) => {
  const headersDelete = {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'hildegwUdacityReadable'
    }
  }
  return fetch(`${api}/posts/${id}`, headersDelete,)
}

export const deleteComment = (id) => {
  const headersDelete = {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'hildegwUdacityReadable'
    }
  }
  return fetch(`${api}/comments/${id}`, headersDelete,)
}

export const addPost = (post) => {
  const timeStamp = new Date().getTime()
  Object.assign(post, {timestamp: timeStamp})
  const headersAdd = {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'hildegwUdacityReadable'
    }
  }
  return fetch(`${api}/posts`, headersAdd,)
}

export const addComment = (comment) => {
  const timeStamp = new Date().getTime()
  Object.assign(comment, {timestamp: timeStamp})
  console.log('API addComment ', comment)
  const headersAdd = {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'hildegwUdacityReadable'
    }
  }
  return fetch(`${api}/comments`, headersAdd,)
}

// Update a post: `PUT /posts/:id` title and body
export const updatePost = (id, title, body) => {
  const data = {title, body}
  const headersUpdate = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'hildegwUdacityReadable'
    }
  }
  return fetch(`${api}/posts/${id}`, headersUpdate,)
}

export const updateComment = (id, body) => {
  const timeStamp = new Date().getTime()
  const data = {body: body, timestamp: timeStamp}
  const headersUpdate = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'hildegwUdacityReadable'
    }
  }
  return fetch(`${api}/comments/${id}`, headersUpdate,)
}

// GET /comments/:id
export const fetchOneComment = (id) => {
  const headersGet = {
    headers: { 'Authorization': 'hildegwUdacityReadable' }
  }
  return fetch(`${api}/comments/${id}`, headersGet)
  .then(result => result.json())
}

// vote for type = post or comment, option = upvote or downvote
export const vote = (type, id, option) => {
  const data = {id: id, option: option}
  const headersVote = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'hildegwUdacityReadable'
    }
  }
  return fetch(`${api}/${type}`, headersVote)
}
