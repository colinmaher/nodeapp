// types of action
const Types = {
  // SET_USER_DATA: "SET_USER_DATA",
  POST_TWEET_REQUEST: "POST_TWEET_REQUEST",
  POST_TWEET_SUCCESS: "POST_TWEET_SUCCESS",
  POST_TWEET_FAILURE: "POST_TWEET_FAIL",
  DELETE_TWEET_REQUEST: "DELETE_TWEET_REQUEST",
  DELETE_TWEET_SUCCESS: "DELETE_TWEET_SUCCESS",
  DELETE_TWEET_FAILURE: "DELETE_TWEET_FAIL",
  EDIT_TWEET_REQUEST: "EDIT_TWEET_REQUEST",
  EDIT_TWEET_SUCCESS: "EDIT_TWEET_SUCCESS",
  EDIT_TWEET_FAILURE: "EDIT_TWEET_FAIL",
  ADD_LATEST_TWEETS: "ADD_LATEST_TWEETS",
  PAGE_LATEST_TWEETS: "PAGE_LATEST_TWEETS",
  FETCH_USER_DATA_REQUEST: "FETCH_USER_DATA_REQUEST",
  FETCH_USER_DATA_SUCCESS: "FETCH_USER_DATA_SUCCESS",
  FETCH_USER_DATA_FAIL: "FETCH_USER_DATA_FAIL",
  FETCH_TWEETS_REQUEST: "FETCH_TWEETS_REQUEST",
  FETCH_TWEETS_SUCCESS: "FETCH_TWEETS_SUCCESS",
  FETCH_TWEETS_FAIL: "FETCH_TWEETS_FAIL",
  CREATE_USER_REQUEST: "CREATE_USER_REQUEST",
  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  CREATE_USER_FAIL: "CREATE_USER_FAIL",
};
// actions

const createUserRequest = (payload) => ({
  type: Types.CREATE_USER_REQUEST,
  payload: { ...payload },
})

const createUserFail = (error) => ({
  type: Types.CREATE_USER_FAIL,
  payload: { error },
})

const createUserSuccess = () => ({
  type: Types.CREATE_USER_SUCCESS,
})

const userDataRequest = (id, token) => ({
  type: Types.FETCH_USER_DATA_REQUEST,
  payload: { id, token }
})

const userDataSuccess = (userData) => ({
  type: Types.FETCH_USER_DATA_SUCCESS,
  payload: { userData }
})

const userDataFail = (e) => ({
  type: Types.FETCH_USER_DATA_FAIL,
  payload: { e }
})

const fetchTweetsRequest = (id) => ({
  type: Types.FETCH_TWEETS_REQUEST,
  payload: { id }
})

const fetchTweetsSuccess = (tweets) => ({
  type: Types.FETCH_TWEETS_SUCCESS,
  payload: { tweets }
})

const fetchTweetsFail = (e) => ({
  type: Types.FETCH_TWEETS_FAIL,
  payload: { e }
})

const postTweetRequest = (uid, tweetText, token) => ({
  type: Types.POST_TWEET_REQUEST,
  payload: { uid, tweetText, token }
})

const postTweetSuccess = () => ({
  type: Types.POST_TWEET_SUCCESS,
})

const postTweetFail = e => ({
  type: Types.POST_TWEET_FAIL,
  payload: { e }
})

const deleteTweetRequest = (uid, tweetId, token) => ({
  type: Types.DELETE_TWEET_REQUEST,
  payload: { uid, tweetId, token }
})

const deleteTweetSuccess = () => ({
  type: Types.DELETE_TWEET_SUCCESS,
})

const deleteTweetFail = e => ({
  type: Types.DELETE_TWEET_FAIL,
  payload: { e }
})

const editTweetRequest = (uid, tweetText, tweetId, token) => ({
  type: Types.EDIT_TWEET_REQUEST,
  payload: { uid, tweetText, tweetId, token }
})

const editTweetSuccess = (uid, tweet, tweetId) => ({
  type: Types.EDIT_TWEET_SUCCESS,
  payload: { uid, tweet, tweetId }
})

const editTweetFail = e => ({
  type: Types.EDIT_TWEET_FAIL,
  payload: { e }
})

const addLatestTweets = latestTweets => ({
  type: Types.ADD_LATEST_TWEETS,
  payload: { latestTweets }
})

const pageLatestTweets = (page) => ({
  type: Types.PAGE_LATEST_TWEETS,
  payload: { page }
})

export default {
  // setUserData,
  createUserRequest,
  createUserSuccess,
  createUserFail,
  userDataRequest,
  userDataSuccess,
  userDataFail,
  fetchTweetsRequest,
  fetchTweetsSuccess,
  fetchTweetsFail,
  postTweetSuccess,
  postTweetFail,
  postTweetRequest,
  deleteTweetRequest,
  deleteTweetSuccess,
  deleteTweetFail,
  editTweetRequest,
  editTweetFail,
  editTweetSuccess,
  addLatestTweets,
  pageLatestTweets,
  Types
}