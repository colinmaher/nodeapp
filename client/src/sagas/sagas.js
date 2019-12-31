import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import Api from '../api/api'

function* fetchUser(action) {
  try {
    const userData = yield call(Api.getUserData, action.payload.id, action.payload.token);
    yield put({ type: "FETCH_USER_DATA_SUCCESS", payload: userData });
  } catch (e) {
    yield put({ type: "FETCH_USER_DATA_FAIL", payload: e });
  }
}

function* createUser(action) {
  console.log(action.payload)
  try {
    yield call(Api.createUser, action.payload)
    yield put({ type: "CREATE_USER_SUCCESS" })
  } catch (e) {
    yield put({ type: "CREATE_USER_FAIL", payload: e })
  }
}

function* createUserSaga() {
  yield takeLatest("CREATE_USER_REQUEST", createUser)
}

function* fetchUserSaga() {
  yield takeLatest("FETCH_USER_DATA_REQUEST", fetchUser)
}

export default function* rootSaga() {
  yield all([createUserSaga(), fetchUserSaga()])
}

