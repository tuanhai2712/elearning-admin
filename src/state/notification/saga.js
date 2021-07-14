import { all, takeEvery, put, call } from 'redux-saga/effects';
import {
  createNotification,
  createNotificationFinish,
  getNotification,
  getNotificationFinish,
  getCourse,
  getCourseFinish,
  getClass,
  getClassFinish,
  getPost,
  getPostFinish,
} from './reducer';
import { client } from 'utils/request';
import { Endpoint } from 'utils/endpoint';
import { build } from 'utils/query-string';

function* watchGetNotification({ payload }) {
  const res = yield call(
    client.get,
    `${Endpoint.NOTIFICATION}?${build(payload)}`
  );
  return yield put(getNotificationFinish(res));
}
function* watchGetCourse({ payload }) {
  const res = yield call(client.get, `${Endpoint.COURSE}?${build(payload)}`);
  return yield put(getCourseFinish(res));
}
function* watchGetClass({ payload }) {
  const res = yield call(client.get, `${Endpoint.CLASS}?${build(payload)}`);
  return yield put(getClassFinish(res));
}
function* watchCreateNotification({ payload }) {
  const res = yield call(client.post, Endpoint.NOTIFICATION, payload);
  return yield put(createNotificationFinish(res));
}
function* watchGetPost() {
  const res = yield call(client.get, Endpoint.POSTS);
  return yield put(getPostFinish(res));
}

export function* rootSagas() {
  yield all([
    takeEvery(getNotification.type, watchGetNotification),
    takeEvery(getCourse.type, watchGetCourse),
    takeEvery(getClass.type, watchGetClass),
    takeEvery(createNotification.type, watchCreateNotification),
    takeEvery(getPost.type, watchGetPost),
  ]);
}
