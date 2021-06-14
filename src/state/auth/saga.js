import { all, takeEvery, put, call, select, fork } from 'redux-saga/effects';
import { signIn, signInFinish, signOut, signOutFinish } from './reducer';
import { getLocalState, setLocalState } from 'utils/localStorage';
import { get, signInApi, signUpApi } from 'utils/api/callApi';

function* checkAuthenticated() {
  // const token = getLocalState('cabramarket-token');
  // if (token) return yield put(signInFinish({}))
}
function* watchSignIn({ payload }) {
  // const res = yield call(signInApi, '/auth/login', payload);
  // setLocalState('cabramarket-token', res.data.data.token)
  // return yield put(signInFinish(res.data))
}

function* watchSignOut({ payload }) {
  // localStorage.removeItem('cabramarket-token')
  // yield put(signOutFinish({ data: {} }))
}

export function* rootSagas() {
  yield all([
    fork(() => checkAuthenticated()),
    takeEvery(signIn.type, watchSignIn),
    takeEvery(signOut.type, watchSignOut),
  ]);
}
