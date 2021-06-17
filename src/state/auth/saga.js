import { all, takeEvery, put, call, select, fork } from 'redux-saga/effects';
import { signIn, signInFinish, signOut, signOutFinish } from './reducer';
import { client } from 'utils/request';
import { Endpoint } from 'utils/endpoint'
import { TOKEN } from 'utils/constants'
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
function* checkAuthenticated() {
  const token = localStorage.getItem(TOKEN);
  if (token) return yield put(signInFinish({}))
}
function* watchSignIn({ payload }) {
  const res = yield call(client.authPost, Endpoint.LOGIN, payload);
  if (res.data.access_token) {
    localStorage.setItem(TOKEN, res.data.access_token)
    history.push('/home')
    window.location.reload();
  }
  return yield put(signInFinish(res.data))
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
