import { createSlice } from '@reduxjs/toolkit';
export const namespace = 'banner';

// Reducer with inital state
const INITAL_STATE = {
  error: null,
  loading: false,
  data: []
};

const slice = createSlice({
  name: namespace,
  initialState: INITAL_STATE,
  reducers: {
    uploadBanner: (state, action) => ({
      ...state,
      error: null,
      loading: true
    }),
    uploadBannerFinish: (state, action) => {
      const { error, user } = action.payload;
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
      };
    },
  },
});

export const reducer = slice.reducer;

export const { uploadBanner, uploadBannerFinish } = slice.actions;

export const bannerSelector = (state) => state[namespace];
