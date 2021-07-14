import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { Row, Table, Col } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { getRequestCoupon, couponSelector } from 'state/coupon/reducer';
import TableDataRequestList from './TableDataRequestList';
export default function List() {
  useEffect(() => {
    document.title = 'Danh sách yêu cầu đổi voucher';
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const { requestCoupon } = useSelector(couponSelector);
  const { loading, data, total } = requestCoupon;
  const [filterConditions, setFilterConditions] = useState({
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(getRequestCoupon(filterConditions));
  }, [filterConditions, dispatch]);

  const handleChangePage = useCallback((page) => {
    setFilterConditions((state) => ({
      ...state,
      page: page.current,
      pageSize: page.pageSize,
    }));
  }, []);

  return (
    <Fragment>
      <div className="container user_list">
        <Row>
          <Col span="24">
            <Table
              showSorterTooltip={false}
              dataSource={data}
              columns={TableDataRequestList()}
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
        </Row>
      </div>
    </Fragment>
  );
}
