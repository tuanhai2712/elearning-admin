import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import {
  createCoupon,
  createCouponFinish,
  getCoupon,
  getCouponFinish,
  deleteCoupon,
  updateCoupon,
  updateCouponFinish,
  getRequestCoupon,
  getRequestCouponFinish,
  confirmRequest,
  deleteRequest,
} from './reducer';
import { client } from 'utils/request';
import { Endpoint } from 'utils/endpoint';
import { build } from 'utils/query-string';
import moment from 'moment';

const filterConditions = {
  page: 1,
  pageSize: 10,
};
function* watchGetCoupon({ payload }) {
  const res = yield call(client.get, `${Endpoint.COUPON}?${build(payload)}`);
  return yield put(getCouponFinish(res.data));
}
function* watchGetRequestCoupon({ payload }) {
  const res = yield call(
    client.get,
    `${Endpoint.COUPON_REQUEST}?${build(payload)}`
  );
  return yield put(getRequestCouponFinish(res.data));
}
function* watchCreateCoupon({ payload }) {
  const { formData, filterConditions } = payload;
  const res = yield call(client.post, Endpoint.COUPON, formData);
  yield put(createCouponFinish(res));
  return yield fork(() => watchGetCoupon({ payload: filterConditions }));
}

function* watchUpdateCoupon({ payload }) {
  const { couponId, description, filterConditions, point, title } = payload;
  const params = {
    active_to: moment(payload.active_to).format('DD-MM-YYYY'),
    description,
    point,
    title,
  };
  const res = yield call(client.put, `${Endpoint.COUPON}/${couponId}`, params);
  yield put(updateCouponFinish(res));
  return yield fork(() => watchGetCoupon({ payload: filterConditions }));
}
function* watchDeleteCoupon({ payload }) {
  const res = yield call(
    client.delete,
    `${Endpoint.COUPON}/${payload.couponId}`
  );
  yield put(updateCouponFinish(res));
  return yield fork(() =>
    watchGetCoupon({ payload: payload.filterConditions })
  );
}
function* watchConfirmRequestCoupon({ payload }) {
  yield call(client.put, `${Endpoint.COUPON_REQUEST}/${payload.requestId}`, {
    status: payload.status,
  });
  return yield fork(() => watchGetRequestCoupon({ payload: filterConditions }));
}
function* watchDeleteRequestCoupon({ payload }) {
  yield call(client.delete, `${Endpoint.COUPON_REQUEST}/${payload.requestId}`);
  return yield fork(() => watchGetRequestCoupon({ payload: filterConditions }));
}

export function* rootSagas() {
  yield all([
    takeEvery(getCoupon.type, watchGetCoupon),
    takeEvery(createCoupon.type, watchCreateCoupon),
    takeEvery(deleteCoupon.type, watchDeleteCoupon),
    takeEvery(updateCoupon.type, watchUpdateCoupon),
    takeEvery(getRequestCoupon.type, watchGetRequestCoupon),
    takeEvery(confirmRequest.type, watchConfirmRequestCoupon),
    takeEvery(deleteRequest.type, watchDeleteRequestCoupon),
  ]);
}
