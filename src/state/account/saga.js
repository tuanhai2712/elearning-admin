import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import {
  getAccountUser,
  getAccountUserFinish,
  getAccountTeacher,
  getAccountTeacherFinish,
  createAccountTeacher,
  createAccountTeacherFinish
} from './reducer';
import { client } from 'utils/request';
import { Endpoint } from 'utils/endpoint'
import { build } from 'utils/query-string'

function* watchGetAccountUser({ payload }) {
  const res = yield call(client.get, `${Endpoint.USER}?${build(payload)}`);
  return yield put(getAccountUserFinish(res))
}
function* watchGetAccountTeacher({ payload }) {
  const res = yield call(client.get, `${Endpoint.TEACHER}?${build(payload)}`);
  return yield put(getAccountTeacherFinish(res))
}
function* watchCreateAccountTeacher({ payload }) {
  const res = yield call(client.post, `${Endpoint.TEACHER}`, payload);
  return yield put(createAccountTeacherFinish(res.data))
}


export function* rootSagas() {
  yield all([
    takeEvery(getAccountUser.type, watchGetAccountUser),
    takeEvery(getAccountTeacher.type, watchGetAccountTeacher),
    takeEvery(createAccountTeacher.type, watchCreateAccountTeacher),
  ]);
}
