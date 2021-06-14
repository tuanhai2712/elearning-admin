import React from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import Homepage from './views/pages/HomePage/HomePage';
import UserList from './views/pages/Admin/Users/UserList';

const userManagement = [
  {
    title: 'Quản lý người dùng',
    routeKey: 'UserList',
    path: '/users',
    icon: <UserOutlined />,
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
];
