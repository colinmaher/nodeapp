// types of action
const Types = {
  // SET_USER_DATA: "SET_USER_DATA",
  TWEET: "TWEET",
  DELETE_TWEET: "DELETE_TWEET",
  EDIT_TWEET: "EDIT_TWEET",
  ADD_LATEST_TWEETS: "ADD_LATEST_TWEETS",
  PAGE_LATEST_TWEETS: "PAGE_LATEST_TWEETS",
  USER_DATA_REQUEST: "USER_DATA_REQUEST",
  USER_DATA_SUCCESS: "USER_DATA_SUCCESS",
  USER_DATA_FAIL: "USER_DATA_FAIL",
};
// actions

// narrow down to reduce network load
// const setUserData = userData => ({
//   type: Types.SET_USER_DATA,
//   payload: userData
// });

const userDataRequest = (id, token) => ({
  type: Types.USER_DATA_REQUEST,
  payload: { id, token }
})

const userDataSuccess = (userData) => ({
  type: Types.USER_DATA_SUCCESS,
  payload: { userData }
})

const userDataFail = (e) => ({
  type: Types.USER_DATA_FAIL,
  payload: { e }
})

const tweet = tweet => ({
  type: Types.TWEET,
  payload: tweet
})

const deleteTweet = id => ({
  type: Types.DELETE_TWEET,
  payload: id
})

const editTweet = tweet => ({
  type: Types.EDIT_TWEET,
  payload: { tweet }
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
  userDataRequest,
  userDataSuccess,
  userDataFail,
  tweet,
  deleteTweet,
  editTweet,
  addLatestTweets,
  pageLatestTweets,
  Types
}