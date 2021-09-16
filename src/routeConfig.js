import React from 'react';
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  SoundOutlined,
  GiftOutlined,
  FileDoneOutlined,
  BookOutlined,
} from '@ant-design/icons';
import Homepage from './views/pages/HomePage/HomePage';
import UserList from './views/pages/AccountManagement/Users/List';
import TeacherList from './views/pages/AccountManagement/Teacher/List';
import BannerList from './views/pages/BannerManagement/List';
import VoucherList from './views/pages/VoucherManagement/List';
import RequestList from './views/pages/VoucherManagement/RequestList';
import NotificationList from './views/pages/NotificationManagement/List';
import ReviewList from './views/pages/ReviewManagement/List';
import PointList from './views/pages/PointManagement/List';
import HomeWorkList from './views/pages/HomeWorkManagement/List';

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
  {
    title: 'Quản lý điểm',
    path: '/points',
    component: PointList,
  },
];
const voucherManagement = [
  {
    title: 'Danh sách voucher',
    path: '/vouchers',
    component: VoucherList,
  },
  {
    title: 'Danh sách yêu cầu',
    path: '/voucher-request',
    component: RequestList,
  },
];

export const routeConfig = [
  {
    title: 'Trang chủ',
    path: '/home',
    component: Homepage,
  },

  {
    title: 'Quản lý thông báo',
    path: '/notification',
    component: NotificationList,
  },
  {
    title: 'Quản lý đánh giá',
    path: '/reviews',
    component: ReviewList,
  },
  {
    title: 'Quản lý bài tập',
    path: '/homework',
    component: HomeWorkList,
  },
  ...voucherManagement,
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
    icon: <SoundOutlined />,
    title: 'Quản lý thông báo',
    path: '/notification',
    single: true,
  },
  {
    icon: <FileDoneOutlined />,
    title: 'Quản lý đánh giá',
    path: '/reviews',
    single: true,
  },
  {
    icon: <BookOutlined />,
    title: 'Quản lý bài tập',
    path: '/homework',
    single: true,
  },
  {
    icon: <UserOutlined />,
    title: 'Quản lý tài khoản',
    subItems: userManagement,
    single: false,
  },
  {
    icon: <GiftOutlined />,
    title: 'Quản lý voucher',
    subItems: voucherManagement,
  },
  {
    icon: <SettingOutlined />,
    title: 'Quản lý hệ thống',
    subItems: systemManagement,
    single: false,
  },
];
