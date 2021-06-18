import React from 'react';
import { HomeOutlined, UserOutlined, SettingOutlined, SolutionOutlined } from '@ant-design/icons';
import Homepage from './views/pages/HomePage/HomePage';
import UserList from './views/pages/AccountManagement/Users/List'
import TeacherList from './views/pages/AccountManagement/Teacher/List'
import BannerList from './views/pages/BannerManagement/List'
import CouponList from './views/pages/CouponManagement/List'

const userManagement = [
  {
    title: 'Quản lý người dùng',
    path: '/users',
    component: UserList,
  },
  {
    title: 'Quản lý giáo viên',
    path: '/teachers',
    component: TeacherList,
  },
];
const systemManagement = [
  {
    title: 'Quản lý banner',
    path: '/banners',
    component: BannerList,
  },
];

export const routeConfig = [
  {
    title: 'Trang chủ',
    path: '/home',
    component: Homepage,
  },
  {
    title: 'Quản lý phiếu giảm giá',
    path: '/coupons',
    component: CouponList,
  },
  ...userManagement,
  ...systemManagement,
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
    title: 'Quản lý phiếu giảm giá',
    path: '/coupons',
    single: true,
  },
  {
    icon: <UserOutlined />,
    title: 'Quản lý tài khoản',
    subItems: userManagement,
    single: false,
  },
  {
    icon: <SettingOutlined />,
    title: 'Quản lý hệ thống',
    subItems: systemManagement,
    single: false,
  },
];
