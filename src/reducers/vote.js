import { VOTE } from '../actions/types'

// voting
const vote = (state = {}, action) => {
  const { id, option, startScore } = action
  let count = startScore
  count = (option === 'upVote') ? count + 1 : count - 1
  switch (action.type) {
    case VOTE:
      return {
        ...state,
        [id]: count
      }
    default:
      return state
  }
}

export default vote
