import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Spin,
  Form,
  Input,
  Row,
  Col,
  Radio,
  Tabs,
  Select,
} from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNotification,
  getCourse,
  getClass,
  notificationSelector,
  getPost,
  reset,
} from 'state/notification/reducer';
import {
  SEND_NOTIFICATION_TYPE_ALL,
  SEND_NOTIFICATION_TO_CLASS,
  TAB_NOTI_NORMAL,
  TAB_NOTI_CLASS_REVIEW,
  TAB_NOTI_WITH_POST,
} from 'utils/constants';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
const { TabPane } = Tabs;
const { Option } = Select;
export default function ModalCreateNotification({ visible, action }) {
  const [form] = Form.useForm();
  const [formWithPost] = Form.useForm();
  const [formReview] = Form.useForm();
  const dispatch = useDispatch();
  const { create, course, classes, post } = useSelector(notificationSelector);
  const [sendType, setSendType] = useState(SEND_NOTIFICATION_TYPE_ALL);
  const [tabSelected, setTabSelected] = useState(TAB_NOTI_NORMAL);
  const [courseSelected, setCourseSelected] = useState(null);
  const [classesSelected, setClassesSelected] = useState(null);
  const [postSelected, setPostSelected] = useState([]);
  const [error, showError] = useState(false);
  const selectSendType = (e) => {
    if (e.target.value === SEND_NOTIFICATION_TYPE_ALL) {
      dispatch(reset());
      setClassesSelected([]);
      setCourseSelected(null);
    }
    setSendType(e.target.value);
  };

  useEffect(() => {
    if (sendType === SEND_NOTIFICATION_TO_CLASS) {
      dispatch(getCourse({ page: 1, pageSize: 999 }));
    }
  }, [dispatch, sendType]);
  useEffect(() => {
    if (tabSelected === TAB_NOTI_WITH_POST) {
      dispatch(getPost({ page: 1, pageSize: 999 }));
    }
  }, [dispatch, tabSelected]);
  useEffect(() => {
    if (courseSelected) {
      dispatch(getClass({ page: 1, pageSize: 999, productId: courseSelected }));
    }
  }, [courseSelected, dispatch]);
  useEffect(() => {
    if (create.result) {
      action();
      dispatch(reset());
    }
  }, [action, create, dispatch]);

  const onFinish = (values) => {
    if (sendType === SEND_NOTIFICATION_TO_CLASS && !classesSelected.length) {
      showError(true);
    } else {
      const payload = {
        ...values,
        type: sendType,
        content_type: tabSelected,
        classes: [classesSelected],
        data: {
          html: draftToHtml(values.data),
        },
      };
      dispatch(createNotification(payload));
    }
  };
  const selectCourse = (selected) => {
    setCourseSelected(selected);
    setClassesSelected([]);
  };
  const selectClasses = (selected) => {
    setClassesSelected(selected);
  };
  const selectPost = (selected) => {
    setPostSelected(selected);
  };

  const changeTab = (key) => {
    if (key === TAB_NOTI_CLASS_REVIEW) {
      setSendType(SEND_NOTIFICATION_TO_CLASS);
    }
    setTabSelected(key);
  };
  return (
    <ModalStyled
      title="Tạo mới thông báo"
      visible={visible}
      onCancel={action}
      centered={true}
      maskClosable={false}
      width={900}
      footer={null}
      className="custom_modal"
    >
      <div style={{ padding: '0px 24px 24px' }}>
        <Row gutter={8} style={{ marginBottom: 20 }}>
          <Col>
            <span style={{ fontWeight: 700 }}>Hình thức gửi:</span>
          </Col>
          <Col>
            <Radio.Group onChange={selectSendType} value={sendType}>
              {tabSelected !== TAB_NOTI_CLASS_REVIEW && (
                <Radio value={SEND_NOTIFICATION_TYPE_ALL}>Gửi tất cả</Radio>
              )}
              <Radio value={SEND_NOTIFICATION_TO_CLASS}>Gửi tới lớp</Radio>
            </Radio.Group>
          </Col>
        </Row>
        {sendType === SEND_NOTIFICATION_TO_CLASS && (
          <Row gutter={8} style={{ marginBottom: 20 }}>
            <Col span={12}>
              <SelectStyled
                placeholder="Lựa chọn khóa học"
                loading={course.loading}
                onChange={selectCourse}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                showSearch
              >
                {course.data &&
                  course.data.length &&
                  course.data.map((item) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
              </SelectStyled>
            </Col>
            <Col span={12}>
              <SelectStyled
                value={classesSelected}
                placeholder="Lựa chọn lớp"
                loading={classes.loading}
                onChange={selectClasses}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                showSearch
              >
                {classes.data &&
                  classes.data.length &&
                  classes.data.map((item) => {
                    return (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
              </SelectStyled>
              {error && (
                <p style={{ color: '#ff4d4f' }}>Vui lòng lựa chọn lớp</p>
              )}
            </Col>
          </Row>
        )}

        <Spin spinning={create.loading}>
          <Tabs
            activeKey={tabSelected}
            defaultActiveKey={TAB_NOTI_NORMAL}
            onChange={changeTab}
          >
            <TabPane tab="Thông báo thường" key={TAB_NOTI_NORMAL}>
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  title: '',
                  content: '',
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="title"
                  label="Tiêu đề"
                  rules={[
                    {
                      required: true,
                      message: 'Tiêu đề không được để trống!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="content"
                  label="Mô tả ngắn"
                  rules={[
                    {
                      required: true,
                      message: 'Mô tả không được để trống!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="data"
                  label="Mô tả"
                  rules={[
                    {
                      required: true,
                      message: 'Mô tả không được để trống!',
                    },
                  ]}
                >
                  <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Tạo mới
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Thông báo đánh giá lớp" key={TAB_NOTI_CLASS_REVIEW}>
              <Form
                form={formReview}
                layout="vertical"
                initialValues={{
                  title: '',
                  content: '',
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="title"
                  label="Tiêu đề"
                  rules={[
                    {
                      required: true,
                      message: 'Tiêu đề không được để trống!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="content"
                  label="Mô tả"
                  rules={[
                    {
                      required: true,
                      message: 'Mô tả không được để trống!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Tạo mới
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Thông báo với bài viết" key={TAB_NOTI_WITH_POST}>
              <Form
                form={formWithPost}
                layout="vertical"
                initialValues={{
                  title: '',
                  content: '',
                  post: '',
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="title"
                  label="Tiêu đề"
                  rules={[
                    {
                      required: true,
                      message: 'Tiêu đề không được để trống!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="post"
                  label="Bài viết"
                  rules={[
                    {
                      required: true,
                      message: 'Bài viết không được để trống!',
                    },
                  ]}
                >
                  <SelectStyled
                    value={postSelected}
                    placeholder="Lựa chọn bài viết"
                    loading={post.loading}
                    onChange={selectPost}
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {post.data &&
                      post.data.length &&
                      post.data.map((item) => {
                        return (
                          <Option value={item.id} key={item.id}>
                            {item.post_title}
                          </Option>
                        );
                      })}
                  </SelectStyled>
                </Form.Item>
                <Form.Item
                  name="content"
                  label="Mô tả ngắn"
                  rules={[
                    {
                      required: true,
                      message: 'Mô tả không được để trống!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Tạo mới
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
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

const SelectStyled = styled(Select)`
  width: 100%;
`;
