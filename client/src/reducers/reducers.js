import ACTIONS from "../actions/actions"
import _ from "lodash"

const defaultState = {
  userData: {
    error: null,
    data: {},
  },
  latestTweets: {
    error: null,
    tweets: [],
    page: 0
  },
  signUpError: null,
}

const reducer = (state = defaultState, action) => {
  // console.log(action.payload)
  switch (action.type) {
    case ACTIONS.Types.CREATE_USER_REQUEST: {
      return state
    }
    case ACTIONS.Types.CREATE_USER_SUCCESS: {
      return state
    }
    case ACTIONS.Types.CREATE_USER_FAIL: {
      let newState = _.cloneDeep(state)
      newState.signInError = action.payload.error
      return newState
    }
    case ACTIONS.Types.FETCH_USER_DATA_SUCCESS: {
      const data = action.payload
      let newState = _.cloneDeep(state)
      newState.userData.data = data
      return newState
    }
    case ACTIONS.Types.FETCH_USER_DATA_FAIL: {
      const error = action.payload
      let newState = _.cloneDeep(state)
      newState.userData.error = error
      return newState
    }
    case ACTIONS.Types.FETCH_USER_DATA_REQUEST: {
      return state
    }
    case ACTIONS.Types.TWEET: {
      const data = action.payload.tweet
      let newState = _.cloneDeep(state)
      newState.userData.tweets.unshift(data)
      newState.latestTweets.tweets.unshift(data)
      return newState
    }
    case ACTIONS.Types.DELETE_TWEET: {
      const id = action.payload.id
      let newState = _.cloneDeep(state)
      newState.userData.tweets =
        newState.userData.tweets.filter((tweet) => {
          return tweet._id !== id
        })
      newState.latestTweets.tweets = state.latestTweets.tweets.filter((tweet) => {
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
      newState.latestTweets.tweets =
        newState.latestTweets.tweets.map((t) => {
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
