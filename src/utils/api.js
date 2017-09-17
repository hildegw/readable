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
   console.log(headersAdd.body)
   return fetch(`${api}/posts`, headersAdd,)
}
