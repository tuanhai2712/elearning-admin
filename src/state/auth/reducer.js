import { createSlice } from '@reduxjs/toolkit';
export const namespace = 'auth';

// Reducer with inital state
const INITAL_STATE = {
  error: null,
  isAuthenticated: false,
};

const slice = createSlice({
  name: namespace,
  initialState: INITAL_STATE,
  reducers: {
    signIn: (state, action) => ({
      ...state,
      error: null,
    }),
    signInFinish: (state, action) => {
      const { error } = action.payload;
      if (error)
        return {
          ...state,
          error: 'Sign in failure',
          isAuthenticated: false,
        };
      return {
        ...state,
        isAuthenticated: true,
        error: null,
      };
    },
    signOut: (state, action) => ({
      ...state,
      error: null,
    }),
    signOutFinish: (state, action) => {
      const { error, data } = action.payload;
      if (data)
        return {
          ...INITAL_STATE,
        };
    },
  },
});

export const reducer = slice.reducer;

export const { signIn, signInFinish, signOut, signOutFinish } = slice.actions;

export const authSelector = (state) => state[namespace];
