import { createSlice } from '@reduxjs/toolkit';
export const namespace = 'coupon';

const defaultState = {
  loading: false,
  data: [],
  total: null,
  uploadResult: false,
  couponUpdate: {
    loading: false,
    id: null,
    result: false,
  },
  requestCoupon: {
    data: [],
    loading: false,
  },
}
// Reducer with inital state
const INITAL_STATE = {
  ...defaultState
};

const slice = createSlice({
  name: namespace,
  initialState: INITAL_STATE,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        couponUpdate: {
          loading: false,
          id: null,
          result: false
        }
      }
    },
    getRequestCoupon: (state) => ({
      ...state,
      requestCoupon: {
        loading: true
      }
    }),
    getRequestCouponFinish: (state, action) => {
      const { error, data } = action.payload;
      console.log(action.payload)
      if (error)
        return {
          ...state,
          requestCoupon: {
            loading: false
          }
        };
      return {
        ...state,
        requestCoupon: {
          data: data,
          total: data.total ? data.total : 0,
          loading: false,
        }
      };
    },
    getCoupon: (state) => ({
      ...state,
      loading: true
    }),
    getCouponFinish: (state, action) => {
      const { error, data } = action.payload;
      if (error)
        return {
          ...state,
          loading: false,
        };
      return {
        ...state,
        data: data,
        total: data.total ? data.total : 0,
        loading: false,
      };
    },
    createCoupon: (state) => ({
      ...state,
      loading: true
    }),
    createCouponFinish: (state, action) => {
      const { error } = action.payload;
      if (error)
        return {
          ...state,
          loading: false,
        };
      return {
        ...state,
        loading: false,
        uploadResult: true
      };
    },
    updateCoupon: (state, action) => {
      return {
        ...state,
        couponUpdate: {
          loading: true,
          id: action.payload.couponId,
        }
      }
    },
    updateCouponFinish: (state, action) => {
      const { error } = action.payload;
      if (error)
        return {
          ...state,
          couponUpdate: {
            loading: false,
            id: null,
          }
        };
      return {
        ...state,
        loading: false,
        couponUpdate: {
          loading: false,
          id: null,
          result: true,
        }
      };
    },
    deleteCoupon: (state, action) => {
      return {
        ...state,
        couponUpdate: {
          loading: true,
          id: action.payload.couponId,
        }
      }
    },
    confirmRequest: (state, action) => {
      return {
        ...state,
      }
    },
    deleteRequest: (state, action) => {
      return {
        ...state,
      }
    },
  },
});

export const reducer = slice.reducer;

export const {
  reset,
  getCoupon,
  getCouponFinish,
  createCoupon,
  createCouponFinish,
  deleteCoupon,
  updateCoupon,
  updateCouponFinish,
  getRequestCoupon,
  getRequestCouponFinish,
  confirmRequest,
  deleteRequest,
} = slice.actions;

export const couponSelector = (state) => state[namespace];
