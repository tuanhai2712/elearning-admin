import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { getConfig, saveConfig, getConfigFinish } from './reducer';
import { client } from 'utils/request';
import { Endpoint } from 'utils/endpoint'

function* watchGetConfig() {
  const res = yield call(client.get, `${Endpoint.CONFIG}`);
  return yield put(getConfigFinish(res))
}
function* watchSaveConfig({ payload }) {
  const res = yield call(client.post, `${Endpoint.CONFIG}`, payload);
  return yield fork(() => watchGetConfig())
}


export function* rootSagas() {
  yield all([
    takeEvery(getConfig.type, watchGetConfig),
    takeEvery(saveConfig.type, watchSaveConfig),
  ]);
}
