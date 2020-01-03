import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import Api from '../api/api'

function* fetchUser(action) {
  try {
    const userData = yield call(Api.getUserData, action.payload.id, action.payload.token);
    yield put({ type: "FETCH_USER_DATA_SUCCESS", payload: userData });
  } catch (e) {
    yield put({ type: "FETCH_USER_DATA_FAIL", payload: { e } });
  }
}

function* createUser(action) {
  console.log(action.payload)
  try {
    yield call(Api.createUser, action.payload)
    yield put({ type: "CREATE_USER_SUCCESS" })
  } catch (e) {
    yield put({ type: "CREATE_USER_FAIL", payload: { e } })
  }
}

function* postTweet(action) {
  try {
    const tweet = yield call(Api.postTweet, action.payload.uid, action.payload.tweetText, action.payload.token)
    yield put({ type: "POST_TWEET_SUCCESS", payload: { tweet } })
  } catch (e) {
    yield put({ type: "POST_TWEET_FAIL", payload: { e } })
  }
}

function* deleteTweet(action) {
  try {
    const uid = action.payload.uid
    const tweetId = action.payload.tweetId
    const token = action.payload.token
    yield call(Api.deleteTweet, uid, tweetId, token)
    yield put({ type: "DELETE_TWEET_SUCCESS", payload: { tweetId } })
  }
  catch (e) {
    yield put({ type: "DELETE_TWEET_FAIL", payload: { e } })
  }
}

function* editTweet(action) {
  try {
    const uid = action.payload.uid
    const tweetText = action.payload.tweetText
    const tweetId = action.payload.tweetId
    const token = action.payload.token
    const tweet = yield call(Api.editTweet, uid, tweetText, tweetId, token)
    yield put({ type: "EDIT_TWEET_SUCCESS", payload: { uid, tweet, tweetId } })
  }
  catch (e) {
    yield put({ type: "EDIT_TWEET_FAIL", payload: { e } })
  }
}

function* fetchTweets(action) {
  try {
    const id = action.payload.id
    const tweets = yield call(Api.fetchTweets, id)
    yield put({ type: "FETCH_TWEETS_SUCCESS", payload: { tweets, id } })
  }
  catch (e) {
    yield put({ type: "FETCH_TWEETS_FAIL", payload: { e } })
  }
}

function* deleteTweetSaga() {
  yield takeLatest("DELETE_TWEET_REQUEST", deleteTweet)
}

function* editTweetSaga() {
  yield takeLatest("EDIT_TWEET_REQUEST", editTweet)
}

function* postTweetSaga() {
  yield takeLatest("POST_TWEET_REQUEST", postTweet)
}

function* createUserSaga() {
  yield takeLatest("CREATE_USER_REQUEST", createUser)
}

function* fetchUserSaga() {
  yield takeLatest("FETCH_USER_DATA_REQUEST", fetchUser)
}

function* fetchTweetsSaga() {
  yield takeLatest("FETCH_TWEETS_REQUEST", fetchTweets)
}
export default function* rootSaga() {
  yield all([createUserSaga(), fetchUserSaga(), postTweetSaga(), deleteTweetSaga(), editTweetSaga(), fetchTweetsSaga()])
}

