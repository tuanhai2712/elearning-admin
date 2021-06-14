import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Form, Input, Button, Row, Col, Spin } from 'antd';
import { useQuery } from 'utils/router';
import './style.scss';
import { TooltipButton } from 'views/components/Button';
const background_app = require('assets/images/cloths.png');
export default function Login() {
  useEffect(() => {
    document.title = 'Đăng nhập';
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory()

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  // Login
  const onLogin = useCallback((values) => {
    const payload = {
      username: values.username,
      password: values.password,
      rememberMe: values.rememberMe,
    };
  }, []);

  const query = useQuery();
  // if (
  //   isValidAccessToken(login.accessToken) &&
  // ) {
  //   if (from) return <Redirect to={from} />;
  //   return <Redirect to="/home" />;
  // }

  return (
    <Spin spinning={loading}>
      <Row
        id="login"
        justify="center"
        align="middle"
        style={{ backgroundImage: `url(${background_app})` }}
      >
        <Col span={7}>
          <div className="form_login">
            <Form name="basic" onFinish={onLogin} form={form}>
              <Row align="middle" type="flex" className="mb-1">
                <Col span={24} className="text_center">
                  <img
                    src={
                      'https://gobonly.com/wp-content/uploads/2021/06/Go-bonly-logo-218x73.png'
                    }
                    alt="logo"
                    width={150}
                  />
                </Col>
              </Row>
              <Row align="middle" type="flex" className="mb-1">
                <Col span={24} className="text_center">
                  <h3 className="title_login">Gobonly Administrator</h3>
                </Col>
              </Row>
              <Row align="middle" type="flex">
                <Col span={24}>
                  <Form.Item
                    className="mb-1"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập tài khoản!',
                      },
                    ]}
                  >
                    <Input placeholder={'Tài khoản'} />
                  </Form.Item>
                </Col>
              </Row>

              <Row align="middle" type="flex">
                <Col span={24}>
                  <Form.Item
                    className="mb-1 input-pass"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu',
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder={'Mật khẩu'}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item className="mb-0">
                <Button type="primary" htmlType="submit" className="full">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </Spin>
  );
}
