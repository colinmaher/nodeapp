import ACTIONS from "../actions/actions"
import _ from "lodash"

const defaultState = {
  userData: {
    tweets: [],
  },
  latestTweets: {
    tweets: [],
    page: 0
  },
}

const reducer = (state = defaultState, action) => {
  console.log(action)
  // console.log(action.payload)
  switch (action.type) {
    case ACTIONS.Types.SET_USER_DATA: {
      const data = action.payload
      let newState = _.cloneDeep(state)
      newState.userData = data
      return newState
    }
    case ACTIONS.Types.TWEET: {
      const data = action.payload
      let newState = _.cloneDeep(state)
      newState.userData.tweets.unshift(data)
      newState.latestTweets.unshift(data)
      return newState
    }
    case ACTIONS.Types.DELETE_TWEET: {
      const id = action.payload
      let newState = _.cloneDeep(state)
      newState.userData.tweets =
        newState.userData.tweets.filter((tweet) => {
          return tweet._id !== id
        })
      newState.latestTweets = state.latestTweets.filter((tweet) => {
        return tweet._id !== id
      })
      return newState
    }
    case ACTIONS.Types.EDIT_TWEET: {
      const tweet = action.payload.tweet
      let newState = _.cloneDeep(state)
      newState.userData.tweets =
        newState.userData.tweets.map((t) => {
          if (t._id === tweet._id) {
            return tweet
          }
          return t
        })
      return newState
    }
    case ACTIONS.Types.ADD_LATEST_TWEETS: {
      const latestTweets = action.payload.latestTweets
      let newState = _.cloneDeep(state)
      newState.latestTweets.tweets = state.latestTweets.tweets.concat(latestTweets)
      return newState
    }
    case ACTIONS.Types.PAGE_LATEST_TWEETS: {
      const latestTweetsPage = action.payload.page
      let newState = _.cloneDeep(state)
      newState.latestTweets.page = latestTweetsPage
      return newState
    }
    default:
      return state
  }
}

export default reducer
