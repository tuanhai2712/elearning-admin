import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import {
  createHomework,
  createHomeworkFinish,
  getHomework,
  getHomeworkFinish,
  getCourse,
  getCourseFinish,
  getClass,
  getClassFinish,
  deleteHomework,
  downloadHomework,
} from './reducer';
import { client } from 'utils/request';
import { Endpoint } from 'utils/endpoint';
import { build } from 'utils/query-string';

function* watchGetHomework({ payload }) {
  const res = yield call(client.get, `${Endpoint.HOMEWORK}?${build(payload)}`);
  return yield put(getHomeworkFinish(res));
}
function* watchGetCourse({ payload }) {
  const res = yield call(client.get, `${Endpoint.COURSE}?${build(payload)}`);
  return yield put(getCourseFinish(res));
}
function* watchGetClass({ payload }) {
  const res = yield call(client.get, `${Endpoint.CLASS}?${build(payload)}`);
  return yield put(getClassFinish(res));
}
function* watchCreateHomework({ payload }) {
  const res = yield call(client.post, Endpoint.HOMEWORK, payload);
  return yield put(createHomeworkFinish(res));
}
function* watchDeleteHomework({ payload }) {
  yield call(client.delete, `${Endpoint.HOMEWORK}/${payload.id}`);
  return yield fork(() =>
    watchGetHomework({ payload: payload.filterConditions })
  );
}
function* watchDownloadHomework({ payload }) {
  const res = yield call(
    client.get,
    `${Endpoint.HOMEWORK}/download/${payload.id}`
  );
  if (res.data.data) {
    window.open(res.data.data.download_url);
  }
  return yield fork(() =>
    watchGetHomework({ payload: payload.filterConditions })
  );
}

export function* rootSagas() {
  yield all([
    takeEvery(getHomework.type, watchGetHomework),
    takeEvery(getCourse.type, watchGetCourse),
    takeEvery(getClass.type, watchGetClass),
    takeEvery(createHomework.type, watchCreateHomework),
    takeEvery(deleteHomework.type, watchDeleteHomework),
    takeEvery(downloadHomework.type, watchDownloadHomework),
  ]);
}
