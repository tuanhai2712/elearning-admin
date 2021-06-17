import { createSlice } from '@reduxjs/toolkit';
export const namespace = 'banner';

// Reducer with inital state
const INITAL_STATE = {
  error: null,
  loading: false,
  data: [],
  uploadResult: false
};

const slice = createSlice({
  name: namespace,
  initialState: INITAL_STATE,
  reducers: {
    getBanner: (state, action) => ({
      ...state,
      error: null,
      loading: true
    }),
    getBannerFinish: (state, action) => {
      const { error, data } = action.payload;
      if (error)
        return {
          ...state,
          error: 'Upload failure',
          loading: false,
        };
      return {
        ...state,
        data: data.data,
        loading: false,
        error: null,
      };
    },
    uploadBanner: (state, action) => ({
      ...state,
      error: null,
      loading: true
    }),
    uploadBannerFinish: (state, action) => {
      const { error, data } = action.payload;
      if (error)
        return {
          ...state,
          error: 'Upload failure',
          loading: false,
        };
      return {
        ...state,
        loading: false,
        error: null,
        uploadResult: data.data.success
      };
    },
  },
});

export const reducer = slice.reducer;

export const { getBanner, getBannerFinish, uploadBanner, uploadBannerFinish } = slice.actions;

export const bannerSelector = (state) => state[namespace];
