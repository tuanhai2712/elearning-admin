import React, { useState, useEffect } from 'react';
import { Button, Modal, Spin, InputNumber, Row } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAccountUser,
  addPointForUsers,
  accountSelector,
  reset,
} from 'state/account/reducer';
export default function ModalAddPoint({
  visible,
  action,
  selectedUsers,
  setSelectedUsers,
  filterConditions,
}) {
  const dispatch = useDispatch();
  const { addPoint } = useSelector(accountSelector);
  const { loading, result } = addPoint;
  const [value, setValue] = useState('');
  const handleChange = (value) => {
    setValue(value);
  };
  const onSubmit = () => {
    dispatch(addPointForUsers({ point: value, user_ids: selectedUsers }));
  };
  useEffect(() => {
    if (result) {
      action();
      setSelectedUsers([]);
      dispatch(reset());
      dispatch(getAccountUser(filterConditions));
    }
  }, [action, dispatch, filterConditions, result, setSelectedUsers]);
  return (
    <ModalStyled
      title="Cấu hình điểm"
      visible={visible}
      onCancel={action}
      centered={true}
      maskClosable={false}
      width={400}
      footer={null}
      className="custom_modal"
    >
      <div style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 24 }}>
        <Spin spinning={loading}>
          <span style={{ fontSize: 12 }}>
            Nhập số điểm bạn muốn cộng cho người dùng
          </span>
          <InputNumber
            value={value}
            style={{ width: '100%' }}
            min={0}
            onChange={handleChange}
          />
          <Row justify="end" style={{ marginTop: 10 }}>
            <Button disabled={value <= 0} onClick={onSubmit}>
              Lưu
            </Button>
          </Row>
        </Spin>
      </div>
    </ModalStyled>
  );
}

const ModalStyled = styled(Modal)`
  .ant-modal-header .ant-modal-title {
    font-weight: 600;
  }
`;
