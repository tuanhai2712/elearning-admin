import { createSlice } from '@reduxjs/toolkit';
export const namespace = 'account';

// Reducer with inital state
const INITAL_STATE = {
  users: {
    loading: false,
    data: [],
    total: null
  },
  teachers: {
    loading: false,
    data: [],
    total: null
  },
  create: {
    loading: false,
    result: false,
  },
};

const slice = createSlice({
  name: namespace,
  initialState: INITAL_STATE,
  reducers: {
    reset: (state) => {
      return {
        ...INITAL_STATE,
      }
    },
    getAccountUser: (state) => ({
      ...state,
      users: {
        loading: true,
      },
    }),
    getAccountUserFinish: (state, action) => {
      const { data } = action.payload;
      if (!data)
        return {
          ...state,
          users: {
            loading: false,
          },
        };
      return {
        ...state,
        users: {
          data: data.data,
          total: data.total,
          loading: false,
        },
      };
    },
    getAccountTeacher: (state) => ({
      ...state,
      teachers: {
        loading: true,
      },
    }),
    getAccountTeacherFinish: (state, action) => {
      const { data } = action.payload;
      if (!data)
        return {
          ...state,
          teachers: {
            loading: false,
          },
        };
      return {
        ...state,
        teachers: {
          data: data.data,
          total: data.total,
          loading: false,
        },
      };
    },
    createAccountTeacher: (state) => ({
      ...state,
      create: {
        result: false,
        loading: true
      }
    }),
    createAccountTeacherFinish: (state, action) => {
      const { data } = action.payload;
      if (!data)
        return {
          ...state,
          create: {
            result: false,
            loading: false
          }
        };
      return {
        ...state,
        create: {
          result: true,
          loading: false
        }
      };
    },

  },
});

export const reducer = slice.reducer;

export const {
  reset,
  getAccountUser,
  getAccountUserFinish,
  getAccountTeacher,
  getAccountTeacherFinish,
  createAccountTeacher,
  createAccountTeacherFinish
} = slice.actions;

export const accountSelector = (state) => state[namespace];
