
export default function SortPosts (posts, sortCategory) {
  if (posts !== undefined) {
    switch (sortCategory) {
      case 'top score':
        { console.log('1. SortPosts sorted', posts)
          return posts.sort((a, b) => a.voteScore <= b.voteScore) }
      case 'most recent':
        { return posts.sort((a, b) => a.timestamp <= b.timestamp) }
      default:
        return posts
    }
  } else { return posts }
}
