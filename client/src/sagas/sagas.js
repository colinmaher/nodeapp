import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from '../api/api'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
  try {
    const userData = yield call(Api.getUserData, action.payload.id, action.payload.token);
    yield put({ type: "USER_DATA_SUCCESS", payload: userData });
  } catch (e) {
    yield put({ type: "USER_DATA_FAIL", payload: e });
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
// function* mySaga() {
//   yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
// }

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
  yield takeLatest("USER_DATA_REQUEST", fetchUser);
}

export default mySaga