// types of action
const Types = {
  // SET_USER_DATA: "SET_USER_DATA",
  TWEET: "TWEET",
  DELETE_TWEET: "DELETE_TWEET",
  EDIT_TWEET: "EDIT_TWEET",
  ADD_LATEST_TWEETS: "ADD_LATEST_TWEETS",
  PAGE_LATEST_TWEETS: "PAGE_LATEST_TWEETS",
  FETCH_USER_DATA_REQUEST: "FETCH_USER_DATA_REQUEST",
  FETCH_USER_DATA_SUCCESS: "FETCH_USER_DATA_SUCCESS",
  FETCH_USER_DATA_FAIL: "FETCH_USER_DATA_FAIL",
  CREATE_USER_REQUEST: "CREATE_USER_REQUEST",
  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  CREATE_USER_FAIL: "CREATE_USER_FAIL",
};
// actions

// narrow down to reduce network load
// const setUserData = userData => ({
//   type: Types.SET_USER_DATA,
//   payload: userData
// });
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

const tweet = tweet => ({
  type: Types.TWEET,
  payload: { tweet }
})

const deleteTweet = id => ({
  type: Types.DELETE_TWEET,
  payload: { id }
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
  createUserRequest,
  createUserSuccess,
  createUserFail,
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