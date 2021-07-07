import React from 'react';
import { BASE_LOCAL_URL } from 'utils/constants';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { confirmRequest, deleteRequest } from 'state/coupon/reducer';
const { confirm } = Modal;
export default function TableData() {
  const dispatch = useDispatch()

  const editRequest = (requestId) => {
    confirm({
      title: 'Xác nhận yêu cầu',
      content: 'Bạn có chắc chắn muốn xác nhận yêu cầu ?',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk() {
        dispatch(confirmRequest({ status: 1, requestId }))
      },
      onCancel() {
      },
    });
  }
  const removeRequest = (requestId) => {
    confirm({
      title: 'Xóa yêu cầu',
      content: 'Bạn có chắc chắn muốn xóa yêu cầu ?',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk() {
        dispatch(deleteRequest({ requestId }))
      },
      onCancel() {
      },
    });
  }
  const columns = [
    {
      title: 'Mã voucher',
      render(text, record) {
        return <span>{record.coupon_id}</span>;
      },
    },
    {
      title: 'Ảnh',
      render(text, record) {
        return <img src={`${BASE_LOCAL_URL}/${record.coupon_thumbnail}`} alt={record.id} style={{ width: 50, border: '1px solid #b9b6b6' }} />;
      },
    },
    {
      title: 'Tên',
      render(text, record) {
        return <span>{record.coupon_title}</span>;
      },
    },
    {
      title: 'Trạng thái',
      render(text, record) {
        return <span>{record.status === '0' ? 'Chưa duyệt' : 'Đã duyệt'}</span>;
      },
    },
    {
      title: 'Người yêu cầu',
      render(text, record) {
        return <span>{record.user_name}</span>;
      },
    },
    {
      title: 'Email',
      render(text, record) {
        return <span>{record.user_email}</span>;
      },
    },
    {
      title: 'Số điện thoại',
      render(text, record) {
        return <span>+{record.user_phone}</span>;
      },
    },
    {
      title: 'Tùy chọn',
      render(text, record) {
        return (
          <ActionColumnStyled>
            {record.status === '0' &&
              <IconWrapperStyled onClick={() => editRequest(record.id)}>
                <EditOutlined />
              </IconWrapperStyled>
            }
          </ActionColumnStyled>
        );
      },
    },
  ];
  return columns;
}

const ActionColumnStyled = styled.div`
  display: flex;
`
const IconWrapperStyled = styled.div`
  margin: 0px 5px;
  :hover {
    cursor: pointer;
  }
`
