import React, { useCallback } from 'react';
import { Modal, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons';
import './style.scss';

export default function Header() {
  const history = useHistory();
  // Confirm and logout
  const handleLogout = useCallback(() => {
    Modal.confirm({
      centered: true,
      title: 'Đăng xuất',
      content: 'Bạn có chắc chắn muốn đăng xuất!',
      onOk() {
        history.push('/login');
        window.location.reload();
      },
      onCancel() { },
      okText: 'Đồng ý',
      cancelText: 'Hủy',
    });
  }, []);

  const showProfile = () => { };

  return (
    <>
      <div className="menu_user text_right" style={{ color: '#fff' }}>
        <span onClick={showProfile} className="mr-1">
          123123
        </span>
        <Tooltip placement="bottom" title="Đăng xuất">
          <span onClick={handleLogout}>
            <LogoutOutlined />
          </span>
        </Tooltip>
      </div>
    </>
  );
}
