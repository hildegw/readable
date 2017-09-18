const api = 'http://localhost:3001'


export const fetchPosts = () => {
  const headersGet = {
    headers: { 'Authorization': 'hildegwUdacityReadable' }
  }
  return fetch( `${api}/posts`,  headersGet )
  .then(result => result.json())
}

export const deletePost = (id) => {
  const headersDelete = {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'hildegwUdacityReadable',
    }
  }
  return fetch(`${api}/posts/${id}`,  headersDelete,)
}

export const addPost = (post) => {
   const timeStamp = new Date().getTime();
   Object.assign(post, {timestamp: timeStamp})
   const headersAdd = {
       method: 'POST',
       body: JSON.stringify(post),
       headers: {
         'Content-Type': 'application/json',
         'Authorization': 'hildegwUdacityReadable',
       }
   };
   return fetch(`${api}/posts`, headersAdd,)
}

//Update a post: `PUT /posts/:id` title and body
export const updatePost = (id, title, body) => {
   const headersUpdate = {
       method: 'POST',
       body: JSON.stringify(title, body),
       headers: {
         'Content-Type': 'application/json',
         'Authorization': 'hildegwUdacityReadable',
       }
   };
   return fetch(`${api}/posts/$(id)`, headersUpdate,)
}
