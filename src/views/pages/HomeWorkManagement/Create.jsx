import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Spin,
  Form,
  Input,
  Row,
  Col,
  Select,
  Radio,
  message,
} from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Files from 'react-files';
import {
  createHomework,
  getCourse,
  getClass,
  homeworkSelector,
  reset,
} from 'state/homework/reducer';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const { Option } = Select;
export default function ModalCreateHomework({ visible, action }) {
  const dispatch = useDispatch();
  const { create, course, classes } = useSelector(homeworkSelector);
  const [form] = Form.useForm();
  const [courseSelected, setCourseSelected] = useState(null);
  const [file, setFile] = useState(null);
  const [typeHomework, setTypeHomeWork] = useState('link');
  useEffect(() => {
    dispatch(getCourse({ page: 1, pageSize: 999 }));
  }, [dispatch]);

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
    let payload = {};
    if (values.type === 'file') {
      const formData = new FormData();
      formData.append('file', file[0]);
      formData.append('name', values.name);
      formData.append('class_id', values.class_id);
      formData.append('type', values.type);
      dispatch(createHomework(formData));
    } else {
      payload = {
        class_id: values.class_id,
        name: values.name,
        type: values.type,
        link: values.link,
      };
      dispatch(createHomework(payload));
    }
  };
  const selectCourse = (selected) => {
    setCourseSelected(selected);
  };

  const uploadHomework = (file) => {
    if (!file[0]) {
      form.setFieldsValue({
        file: null,
      });
      setFile(null);
      return message.error(`Hệ thống chỉ chấp nhận file định dạng PDF`);
    } else {
      setFile(file);
    }
  };
  const selectTypeHomeWork = (event) => {
    const { value } = event.target;
    setTypeHomeWork(value);
  };

  return (
    <ModalStyled
      title="Tạo mới bài tập"
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
              type: 'link',
            }}
            onFinish={onFinish}
          >
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="course"
                  label="Khóa học"
                  rules={[
                    {
                      required: true,
                      message: 'Khóa học không được để trống!',
                    },
                  ]}
                >
                  <SelectStyled
                    placeholder="Lựa chọn khóa học"
                    loading={course.loading}
                    onChange={selectCourse}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
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
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="class_id"
                  label="Lớp"
                  rules={[
                    {
                      required: true,
                      message: 'Lớp không được để trống!',
                    },
                  ]}
                >
                  <SelectStyled
                    placeholder="Lựa chọn lớp"
                    loading={classes.loading}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
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
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="name"
                  label="Tên bài tập"
                  rules={[
                    {
                      required: true,
                      message: 'Tên bài tập không được để trống!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Kiểu bài tập"
                  rules={[
                    {
                      required: true,
                      message: 'Kiểu bài tập không được để trống!',
                    },
                  ]}
                >
                  <Radio.Group onChange={selectTypeHomeWork}>
                    <Radio value={'link'}>Đường dẫn</Radio>
                    <Radio value={'file'}>File</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                {typeHomework === 'link' ? (
                  <Form.Item
                    name="link"
                    label="Đường dẫn"
                    rules={[
                      {
                        required: true,
                        message: 'Đường dẫn không được để trống!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                ) : (
                  <Form.Item
                    name="file"
                    label="File"
                    rules={[
                      {
                        required: true,
                        message: 'File không được để trống!',
                      },
                    ]}
                  >
                    <Button>
                      <Files
                        className="files-dropzone"
                        onChange={uploadHomework}
                        accepts={['.pdf']}
                        maxFileSize={10000000}
                        minFileSize={0}
                        clickable
                        multiple={false}
                      >
                        {file && file[0].name
                          ? file[0].name
                          : 'Kéo hoặc nhấn vào đây để tải file bài tập'}
                      </Files>
                    </Button>
                  </Form.Item>
                )}
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

const SelectStyled = styled(Select)`
  width: 100%;
`;
