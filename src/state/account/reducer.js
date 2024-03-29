import { createSlice } from '@reduxjs/toolkit';
export const namespace = 'account';

// Reducer with inital state
const INITAL_STATE = {
  users: {
    loading: false,
    data: [],
    total: null,
  },
  teachers: {
    loading: false,
    data: [],
    total: null,
  },
  create: {
    loading: false,
    result: false,
  },
  addPoint: {
    loading: false,
    result: false,
  },
};

const slice = createSlice({
  name: namespace,
  initialState: INITAL_STATE,
  reducers: {
    reset: () => {
      return {
        ...INITAL_STATE,
      };
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
          total: data.paging.total,
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
          total: data.paging.total,
          loading: false,
        },
      };
    },
    createAccountTeacher: (state) => ({
      ...state,
      create: {
        result: false,
        loading: true,
      },
    }),
    createAccountTeacherFinish: (state, action) => {
      const { data } = action.payload;
      if (!data)
        return {
          ...state,
          create: {
            result: false,
            loading: false,
          },
        };
      return {
        ...state,
        create: {
          result: true,
          loading: false,
        },
      };
    },
    addPointForUsers: (state) => ({
      ...state,
      addPoint: {
        result: false,
        loading: true,
      },
    }),
    addPointForUsersFinish: (state, action) => {
      const { data } = action.payload;
      console.log(action);
      if (!data)
        return {
          ...state,
          addPoint: {
            result: false,
            loading: false,
          },
        };
      return {
        ...state,
        addPoint: {
          result: true,
          loading: false,
        },
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
  createAccountTeacherFinish,
  addPointForUsers,
  addPointForUsersFinish,
} = slice.actions;

export const accountSelector = (state) => state[namespace];
