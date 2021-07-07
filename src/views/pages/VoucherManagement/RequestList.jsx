import React, {
  Fragment,
  useEffect,
  useState,
  useCallback
} from 'react';
import {
  Row,
  Spin,
  Table,
  Col
} from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { getRequestCoupon, couponSelector } from 'state/coupon/reducer';
import NoResultFound from 'views/components/NoResult/no-result'
import styled from 'styled-components'
import TableDataRequestList from './TableDataRequestList'
export default function List() {
  useEffect(() => {
    document.title = 'Danh sách yêu cầu đổi voucher';
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch()
  const { requestCoupon } = useSelector(couponSelector)
  const { loading, data, total } = requestCoupon
  const [filterConditions, setFilterConditions] = useState({
    page: 1,
    pageSize: 10,
  })

  useEffect(() => {
    dispatch(getRequestCoupon(filterConditions))
  }, [filterConditions, dispatch])

  const handleChangePage = useCallback((page) => {
    setFilterConditions((state) => ({
      ...state,
      page: page.current,
      pageSize: page.pageSize
    }))
  }, [])


  return (
    <Fragment>
      <div className="container user_list">
        {!loading && !data.length && <NoResultFound />}
        <Spin spinning={loading}>
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
        </Spin>
      </div>
    </Fragment>
  );
}

const TitleStyled = styled.span`
    font-weight: 700;
    color: #001529;
  `
const TimeActiveTextStyled = styled.span`
    font-weight: 400;
    font-size: 12px;
    color: #919496;
  `
const PointStyled = styled.span`
    font-weight: 400;
    font-size: 12px;
    color: #919496;
  `