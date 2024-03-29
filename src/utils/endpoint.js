import { BASE_API_URL } from './constants';

export const Endpoint = {
  LOGIN: BASE_API_URL + '/admin/login',
  BANNER: BASE_API_URL + '/admin/banner',
  USER: BASE_API_URL + '/admin/user',
  COUPON: BASE_API_URL + '/admin/coupon',
  COUPON_REQUEST: BASE_API_URL + '/admin/coupon/claims',
  NOTIFICATION: BASE_API_URL + '/admin/notification',
  COURSE: BASE_API_URL + '/admin/products',
  CLASS: BASE_API_URL + '/admin/class',
  REVIEW: BASE_API_URL + '/admin/review',
  TEACHER: BASE_API_URL + '/admin/teacher',
  CONFIG: BASE_API_URL + '/admin/config',
  POSTS: BASE_API_URL + '/posts',
  HOMEWORK: BASE_API_URL + '/admin/homework',
  ADD_POINT: BASE_API_URL + '/admin/user/points',
};
