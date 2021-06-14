import Axios from 'axios';
import FileSaver from 'file-saver';
import { clearAllStorage } from './consistentStorage';
import {
  BASE_API_URL,
  STATUS_MESSAGE,
  responseStatus,
} from './constants';
import { alertMessage, catchErrorApiCaller, timezone } from './function';
import history from './history';

// declare a response interceptor
Axios.interceptors.response.use(
  (response) => {
    // do something with the response data
    return response;
  },
  (error) => {
    // do something with the error
    if (
      error.response &&
      error.response.status &&
      error.response.data.statusCode === responseStatus.PASSWORD_EXPIRED
    ) {
      return error.response;
    }
    if (error.response && error.response.status) {
      // eslint-disable-next-line default-case
      switch (error.response.status) {
        case responseStatus.FOUR00: {
          if (error.response.data.errors) {
            const messages = [];
            Object.entries(error.response.data.errors).forEach(([, value]) => {
              messages.push(value[0]);
            });
            alertMessage({
              status: STATUS_MESSAGE.ERROR,
              title: 'Lỗi hệ thống',
              content: messages.join(' '),
            });
          } else {
            alertMessage({
              status: STATUS_MESSAGE.ERROR,
              title: 'Lỗi hệ thống',
              content: error.response.data.message,
            });
          }

          break;
        }
        case responseStatus.FOUR03:
          alertMessage({
            status: STATUS_MESSAGE.ERROR,
            title: 'Lỗi hệ thống',
            content: 'Lỗi hệ thống'
          });
          break;
        case responseStatus.FOUR01:
          clearAllStorage();
          history.push('/login');
          window.location.reload();
          break;
        case responseStatus.FIVE00:
        case responseStatus.FIVE03:
          alertMessage({
            status: STATUS_MESSAGE.ERROR,
            title: 'Lỗi hệ thống',
            content: error.response.data.message,
          });
          break;
      }
    }
  }
);

export async function defaultGet(endpoint) {
  return await Axios({
    method: 'GET',
    url: `${BASE_API_URL}/${endpoint}`,
  });
}

export async function authGet(token, endpoint) {
  return await Axios({
    headers: {
      Authorization: `Bearer ${token}`,
      timezone,
    },
    method: 'GET',
    url: `${BASE_API_URL}/${endpoint}`,
  });
}

export async function defaultPost(endpoint, method, body) {
  return await Axios({
    headers: {
      timezone,
    },
    method: method,
    url: `${BASE_API_URL}/${endpoint}`,
    data: body,
  });
}

export async function authPost(token, endpoint, method, body) {
  return await Axios({
    headers: {
      Authorization: `Bearer ${token}`,
      timezone,
    },
    method: method,
    url: `${BASE_API_URL}/${endpoint}`,
    data: body,
  });
}

function getFileName(response) {
  let filename = '';
  const disposition = response.headers['content-disposition'];
  if (disposition && disposition.indexOf('filename') !== -1) {
    const filenameRegex = /UTF-8(.*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      filename = decodeURIComponent(matches[1].replace(/['"]/g, ''));
    }
  }
  return filename;
}

export async function downloadFile({ endpoint, setLoading, token }) {
  setLoading(true);
  try {
    const res = await Axios({
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
      method: 'GET',
      url: `${BASE_API_URL}/${endpoint}`,
    });
    const fileName = getFileName(res);
    if (res && res.data && res.status === 200) {
      FileSaver.saveAs(new Blob([res.data]), fileName);
    }
  } catch (err) {
    catchErrorApiCaller(err);
  } finally {
    setLoading(false);
  }
}
