import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { Row, Table, Button, Tooltip, Col, Input } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { getAccountUser, accountSelector } from 'state/account/reducer';
import TableData from './TableData';
import ModalAddPoint from './ModalAddPoint';
import { InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { debounce } from 'utils/function';
const initialFilterConditions = {
  page: 1,
  pageSize: 10,
};
export default function List() {
  useEffect(() => {
    document.title = 'Quản lý người dùng';
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const { users } = useSelector(accountSelector);
  const { loading, data, total } = users;
  const [filterConditions, setFilterConditions] = useState(
    initialFilterConditions
  );
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [visibleModalAddPoint, setVisibleModalAddPoint] = useState(false);
  useEffect(() => {
    dispatch(getAccountUser(filterConditions));
  }, [dispatch, filterConditions]);

  const handleChangePage = useCallback((page) => {
    setFilterConditions((state) => ({
      ...state,
      page: page.current,
      pageSize: page.pageSize,
    }));
  }, []);
  const rowSelection = {
    selectedRowKeys: selectedUsers,
    onChange: setSelectedUsers,
  };
  const openModalAddPoint = () => {
    setVisibleModalAddPoint(!visibleModalAddPoint);
  };

  const debounceDropDown = useCallback(
    debounce(
      (nextValue) =>
        dispatch(getAccountUser({ page: 1, pageSize: 10, search: nextValue })),
      500
    ),
    []
  );
  const handleChangeSearchTerm = (event) => {
    const { value } = event.target;
    debounceDropDown(value);
    setSearchTerm(value);
  };
  return (
    <Fragment>
      <div className="container user_list">
        <Row justify="space-between">
          <Col span={6}>
            <Input
              placeholder="Tìm kiếm"
              value={searchTerm}
              onChange={handleChangeSearchTerm}
              allowClear={true}
              prefix={<SearchOutlined />}
              suffix={
                <Tooltip title="Hỗ trợ tìm kiếm theo tên, số điện thoại!">
                  <InfoCircleOutlined />
                </Tooltip>
              }
            />
          </Col>
          <Tooltip
            title={
              !selectedUsers.length
                ? 'Bạn cần lựa chọn người dùng trước khi Cấu hình điểm'
                : 'Cấu hình điểm'
            }
          >
            <Button
              onClick={openModalAddPoint}
              disabled={!selectedUsers.length}
            >
              Cấu hình điểm
            </Button>
          </Tooltip>
        </Row>
        <Row>
          <Table
            showSorterTooltip={false}
            dataSource={data}
            columns={TableData()}
            className="full mt-1"
            loading={loading}
            rowKey="id"
            rowSelection={rowSelection}
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
        </Row>
        {visibleModalAddPoint && (
          <ModalAddPoint
            action={openModalAddPoint}
            visible={visibleModalAddPoint}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        )}
      </div>
    </Fragment>
  );
}
