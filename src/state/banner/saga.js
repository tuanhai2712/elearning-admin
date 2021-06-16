import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { uploadBanner, uploadBannerFinish } from './reducer';
import { client } from 'utils/request';
import { Endpoint } from 'utils/endpoint'

function* watchUploadBanner({ payload }) {
  const formData = new FormData();
  for (const file of payload) {
    formData.append('images[]', file);
  }
  const res = yield call(client.post, Endpoint.BANNER, formData);
  // return yield put(signInFinish(res.data))
}


export function* rootSagas() {
  yield all([
    takeEvery(uploadBanner.type, watchUploadBanner),
  ]);
}
