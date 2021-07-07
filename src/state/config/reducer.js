import { createSlice } from '@reduxjs/toolkit';
export const namespace = 'config';

// Reducer with inital state
const INITAL_STATE = {
  loading: false,
  data: {},
};

const slice = createSlice({
  name: namespace,
  initialState: INITAL_STATE,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        loading: false,
        data: {},
      }
    },
    getConfig: (state) => ({
      ...state,
      loading: true,
    }),
    getConfigFinish: (state, action) => {
      const { data } = action.payload;
      if (!data)
        return {
          ...state,
          loading: false,

        };
      return {
        ...state,
        data,
        loading: false,
      };
    },
    saveConfig: (state) => ({
      ...state,
    }),
  },
});

export const reducer = slice.reducer;

export const {
  reset,
  getConfig,
  getConfigFinish,
  saveConfig
} = slice.actions;

export const configSelector = (state) => state[namespace];
