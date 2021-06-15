import React from 'react';
import { HomeOutlined, UserOutlined, SettingOutlined, SolutionOutlined } from '@ant-design/icons';
import Homepage from './views/pages/HomePage/HomePage';
// import UserList from './views/pages/Admin/Users/UserList';
import UserList from './views/pages/AccountManagement/Users/List'
import TeacherList from './views/pages/AccountManagement/Teacher/List'

const userManagement = [
  {
    title: 'Quản lý người dùng',
    routeKey: 'UserList',
    path: '/users',
    component: UserList,
  },
  {
    title: 'Quản lý giáo viên',
    routeKey: 'UserList',
    path: '/teachers',
    component: TeacherList,
  },
];
const systemManagement = [
  {
    title: 'Quản lý voucher',
    routeKey: 'UserList',
    path: '/users',
    component: UserList,
  },
  {
    title: 'Quản lý banner',
    routeKey: 'UserList',
    path: '/users',
    component: UserList,
  },
];

export const routeConfig = [
  {
    title: 'Trang chủ',
    routeKey: 'Homepage',
    path: '/home',
    component: Homepage,
  },
  ...userManagement,
  // ...systemManagement,
];

export const parentMenu = [
  {
    icon: <HomeOutlined />,
    title: 'Trang chủ',
    path: '/home',
    single: true,
  },
  {
    icon: <UserOutlined />,
    title: 'Quản lý tài khoản',
    subItems: userManagement,
    single: false,
  },
  // {
  //   icon: <SettingOutlined />,
  //   title: 'Quản lý hệ thống',
  //   subItems: systemManagement,
  //   single: false,
  // },
];
