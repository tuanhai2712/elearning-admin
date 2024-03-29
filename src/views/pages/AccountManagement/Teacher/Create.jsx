import React from 'react';
import { Button, Modal, Spin, Form, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { createAccountTeacher, accountSelector } from 'state/account/reducer';
export default function ModalCreateTeacherAccount({ visible, action }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { create } = useSelector(accountSelector);
  const onFinish = (values) => {
    dispatch(createAccountTeacher(values));
  };

  return (
    <ModalStyled
      title="Tạo tài khoản giáo viên"
      visible={visible}
      onCancel={action}
      centered={true}
      maskClosable={false}
      width={900}
      footer={null}
      className="custom_modal"
    >
      <div style={{ padding: '0px 24px 24px' }}>
        <Spin spinning={create.loading}>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              title: '',
              content: '',
            }}
            onFinish={onFinish}
          >
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item
                  name="name"
                  label="Họ và tên"
                  rules={[
                    {
                      required: true,
                      message: 'Tên giáo viên không được để trống!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[
                    {
                      required: true,
                      message: 'Số điện thoại không được để trống!',
                    },
                    {
                      pattern: new RegExp(
                        /([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/
                      ),
                      message: 'Số điện thoại không đúng định dạng!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: 'Email không được để trống!',
                    },
                    {
                      type: 'email',
                      message: 'Email không đúng định dạng!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  rules={[
                    {
                      required: true,
                      message: 'Mật khẩu không được để trống!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="level"
                  label="Bằng cấp"
                  rules={[
                    {
                      required: true,
                      message: 'Bằng cấp không được để trống!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tạo mới
              </Button>
            </Form.Item>
          </Form>
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
