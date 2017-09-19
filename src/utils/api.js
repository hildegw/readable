const api = 'http://localhost:3001'


export const fetchPosts = () => {
  const headersGet = {
    headers: { 'Authorization': 'hildegwUdacityReadable' }
  }
  return fetch( `${api}/posts`,  headersGet )
  .then(result => result.json())
}

export const fetchCategories = () => {
  const headersGet = {
    headers: { 'Authorization': 'hildegwUdacityReadable' }
  }
  return fetch( `${api}/categories`,  headersGet )
  .then(result => result.json())
  .then(data => data.categories)     
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
  const data = {title, body}
  console.log(JSON.stringify(data))
  console.log(`${api}/posts/${id}`)
   const headersUpdate = {
       method: 'PUT',
       body: JSON.stringify(data),
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'hildegwUdacityReadable',
       }
   };
   return fetch(`${api}/posts/${id}`, headersUpdate,)
}
