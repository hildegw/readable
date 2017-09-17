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
  fetch( `${api}/posts/${id}`,  headersDelete, )
  .then(result => result.json())
}

export const addPost = (post) => {
     const timeStamp = new Date().getTime();
     const category = 'React'   //TODO implement
     Object.assign(post, {timestamp: timeStamp}, {category: category})

     const headersAdd = {
         method: 'POST',
         body: JSON.stringify(post),
         headers: {
           'Content-Type': 'application/json',
           'Authorization': 'hildegwUdacityReadable',
         }
     };
     console.log(headersAdd.body)
     return fetch(`${api}/posts`, headersAdd)
         .then(res => console.log(res.json()));
}
