import ACTIONS from "../actions/actions"
import _ from "lodash"

const defaultState = {
  userData: {
    error: null,
    data: {

    },
  },
  latestTweets: {
    error: null,
    tweets: [],
    page: 0
  },
  otherTweets: {

  },
  postTweetError: null,
  deleteTweetError: null,
  editTweetError: null,
  signUpError: null,
  fetchTweetsError: null,
  createUserSuccess: null,
}

const reducer = (state = defaultState, action) => {
  // console.log(action.payload)
  switch (action.type) {
    case ACTIONS.Types.CREATE_USER_REQUEST: {
      return state
    }

    case ACTIONS.Types.CREATE_USER_SUCCESS: {
      const newState = _.cloneDeep(state)
      newState.createUserSuccess = true
      return newState
    }

    case ACTIONS.Types.CREATE_USER_FAIL: {
      let newState = _.cloneDeep(state)
      newState.signInError = action.payload.error
      newState.createUserSuccess = false
      return newState
    }

    case ACTIONS.Types.FETCH_USER_DATA_SUCCESS: {
      const data = action.payload
      let newState = _.cloneDeep(state)
      newState.userData.data = data
      newState.userData.data.tweets = newState.userData.data.tweets.reverse()
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

    case ACTIONS.Types.FETCH_TWEETS_REQUEST: {
      return state
    }

    case ACTIONS.Types.FETCH_TWEETS_SUCCESS: {

      const id = action.payload.id
      const tweets = action.payload.tweets.reverse()
      const newState = _.cloneDeep(state)
      if (newState.userData.data.oktaId === id) {
        newState.userData.data.tweets = tweets
      }
      else {
        !(id in newState.otherTweets) && (newState.otherTweets[id] = [])
        newState.otherTweets[id] = tweets
      }
      return newState
    }

    case ACTIONS.Types.FETCH_TWEETS_FAIL: {
      const error = action.payload.e
      const newState = _.cloneDeep(state)
      newState.fetchTweetsError = error
      return newState
    }

    case ACTIONS.Types.POST_TWEET_REQUEST: {
      return state
    }

    case ACTIONS.Types.POST_TWEET_SUCCESS: {
      const data = action.payload.tweet
      let newState = _.cloneDeep(state)
      newState.userData.data.tweets.unshift(data)
      newState.latestTweets.tweets.unshift(data)
      return newState
    }
    case ACTIONS.Types.POST_TWEET_FAIL: {
      const e = action.payload.e
      let newState = _.cloneDeep(state)
      newState.postTweetError = e
      return newState
    }

    case ACTIONS.Types.DELETE_TWEET_REQUEST: {
      return state
    }

    case ACTIONS.Types.DELETE_TWEET_SUCCESS: {
      const id = action.payload.tweetId
      let newState = _.cloneDeep(state)
      newState.userData.data.tweets =
        newState.userData.data.tweets.filter((tweet) => {
          return tweet._id !== id
        })
      newState.latestTweets.tweets = state.latestTweets.tweets.filter((tweet) => {
        return tweet._id !== id
      })
      return newState
    }

    case ACTIONS.Types.DELETE_TWEET_FAIL: {
      const e = action.payload.e
      let newState = _.cloneDeep(state)
      newState.deleteTweetError = e
      return newState
    }

    case ACTIONS.Types.EDIT_TWEET_REQUEST: {
      return state
    }

    case ACTIONS.Types.EDIT_TWEET_SUCCESS: {
      const tweet = action.payload.tweet
      let newState = _.cloneDeep(state)
      console.log(tweet)
      newState.userData.data.tweets =
        newState.userData.data.tweets.map((t) => {
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

    case ACTIONS.Types.EDIT_TWEET_FAIL: {
      const e = action.payload.e
      let newState = _.cloneDeep(state)
      newState.editTweetError = e
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
