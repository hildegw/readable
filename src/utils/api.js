const api = 'http://localhost:3001'
const headersGet = {
  headers: { 'Authorization': 'hildegwUdacityReadable' }
}
const headersDelete = {
  method: 'delete',
  headers: {
    'Authorization': 'hildegwUdacityReadable',
  }
}



export const fetchPosts = () =>
  fetch( `${api}/posts`,  headersGet )
  .then(result => result.json())

export const deletePost = (id) => {
  console.log(id)
  fetch( `${api}/posts/${id}`,  headersDelete, )
  .then(result => result.json())
}
