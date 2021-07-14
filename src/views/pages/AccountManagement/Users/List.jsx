import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  Col,
  Table
} from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { getAccountUser, accountSelector } from 'state/account/reducer';
import TableData from './TableData'

const initialFilterConditions = {
  page: 1,
  pageSize: 10
}
export default function List() {
  useEffect(() => {
    document.title = 'Quản lý người dùng';
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch()
  const { users } = useSelector(accountSelector)
  const { loading, data, total } = users
  const [filterConditions, setFilterConditions] = useState(initialFilterConditions)
  useEffect(() => {
    dispatch(getAccountUser(filterConditions))
  }, [dispatch, filterConditions])

  const handleChangePage = useCallback((page) => {
    setFilterConditions((state) => ({
      ...state,
      page: page.current,
      pageSize: page.pageSize
    }))
  }, [])
  console.log(total)
  return (
    <Fragment>
      <div className="container user_list">
        <Col span="24">
          <Table
            showSorterTooltip={false}
            dataSource={data}
            columns={TableData()}
            className="full mt-1"
            loading={loading}
            rowKey="email"
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
    </Fragment>
  );
}
