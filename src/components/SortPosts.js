
export default function SortPosts (posts, sortCategory) {
  if (posts !== undefined) {
    switch (sortCategory) {
      case 'top score':
        { return posts.sort((a, b) => a.voteScore < b.voteScore) }
      case 'most recent':
        { return posts.sort((a, b) => a.timestamp < b.timestamp) }
      default:
        return posts
    }
  } else { return posts }
}
