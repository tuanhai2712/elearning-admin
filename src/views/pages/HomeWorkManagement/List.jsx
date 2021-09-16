import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { Button, Row, Col, Table, Modal, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModalCreateHomework from './Create';
import { useDispatch, useSelector } from 'react-redux';
import {
  getHomework,
  homeworkSelector,
  deleteHomework,
  downloadHomework,
  getCourse,
  getClass,
} from 'state/homework/reducer';
import TableData from './TableData';
import styled from 'styled-components';
const initialFilterConditions = {
  page: 1,
  pageSize: 10,
};
const { Option } = Select;
export default function List() {
  useEffect(() => {
    document.title = 'Quản lý bài tập';
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const { loading, data, total, create, course, classes } = useSelector(
    homeworkSelector
  );
  const [courseSelected, setCourseSelected] = useState(null);
  const [visibleModalCreateHomework, setVisibleModalCreateHomework] = useState(
    false
  );
  const [filterConditions, setFilterConditions] = useState(
    initialFilterConditions
  );
  useEffect(() => {
    dispatch(getCourse({ page: 1, pageSize: 999 }));
  }, [dispatch]);

  useEffect(() => {
    if (courseSelected) {
      dispatch(getClass({ page: 1, pageSize: 999, productId: courseSelected }));
    }
  }, [courseSelected, dispatch]);
  useEffect(() => {
    dispatch(getHomework(filterConditions));
  }, [dispatch, filterConditions]);
  const openCreateHomeworkModal = () => {
    setVisibleModalCreateHomework(!visibleModalCreateHomework);
  };

  useEffect(() => {
    if (create.result) {
      setFilterConditions(initialFilterConditions);
      dispatch(getHomework(initialFilterConditions));
    }
  }, [create, dispatch]);
  const handleChangePage = useCallback((page) => {
    setFilterConditions((state) => ({
      ...state,
      page: page.current,
      pageSize: page.pageSize,
    }));
  }, []);

  // button delete
  const handleDelete = useCallback(
    (event) => {
      const id = event.currentTarget.dataset.id;
      Modal.confirm({
        centered: true,
        title: 'Xóa bài tập',
        content: 'Bạn có chắc chắn muốn xóa bài tập',
        okButtonProps: { type: 'danger' },
        onOk() {
          dispatch(deleteHomework({ id, filterConditions }));
        },
        onCancel() {},
        okText: 'Xác nhận',
        cancelText: 'Hủy',
      });
    },
    [dispatch, filterConditions]
  );
  const handleDownload = useCallback(
    (event) => {
      const id = event.currentTarget.dataset.id;
      dispatch(downloadHomework({ id, filterConditions }));
    },
    [dispatch, filterConditions]
  );
  const selectCourse = (selected) => {
    setCourseSelected(selected);
  };
  const selectClass = (selected) => {
    setFilterConditions((state) => ({
      ...state,
      class_id: selected,
    }));
    setCourseSelected(selected);
  };
  return (
    <Fragment>
      <div className="container user_list">
        <Row style={{ marginBottom: 10 }} justify="space-between">
          <Col span={12}>
            <Row gutter={8}>
              <Col span={12}>
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
              </Col>
              <Col span={12}>
                <SelectStyled
                  placeholder="Lựa chọn lớp"
                  loading={classes.loading}
                  onChange={selectClass}
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
              </Col>
            </Row>
          </Col>
          <Col
            span={6}
            className="btn-create-user"
            style={{ textAlign: 'end' }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => openCreateHomeworkModal()}
            >
              Tạo bài tập
            </Button>
          </Col>
        </Row>
        <Col span="24">
          <Table
            showSorterTooltip={false}
            dataSource={data}
            columns={TableData(
              handleDelete,
              handleDownload,
              filterConditions.page
            )}
            className="full mt-1"
            loading={loading}
            rowKey="id"
            scroll={{ x: true }}
            onChange={handleChangePage}
            pagination={{
              current: filterConditions.page,
              total: total,
              size: filterConditions.pageSize,
              showSizeChanger: true,
              hideOnSinglePage: false,
            }}
          />
        </Col>
      </div>
      {visibleModalCreateHomework && (
        <ModalCreateHomework
          visible={visibleModalCreateHomework}
          action={() => openCreateHomeworkModal()}
        />
      )}
    </Fragment>
  );
}
const SelectStyled = styled(Select)`
  width: 100%;
`;
