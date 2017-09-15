const api = 'http://localhost:3001'
const headers = {
  headers: { 'Authorization': 'hildegwUdacityReadable' }
}
export const fetchPosts = () =>
  fetch( `${api}/posts`,  headers )
  .then(result => result.json())
