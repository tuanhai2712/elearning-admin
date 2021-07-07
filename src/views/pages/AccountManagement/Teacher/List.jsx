import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  Col,
  Table,
  Button,
  Row
} from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountTeacher, accountSelector } from 'state/account/reducer';
import TableData from './TableData'
import ModalCreateTeacherAccount from './Create'
const initialFilterConditions = {
  page: 1,
  pageSize: 10,
}
export default function List() {
  useEffect(() => {
    document.title = 'Quản lý giáo viên';
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch()
  const { teachers } = useSelector(accountSelector)
  const { loading, data, total } = teachers
  const [filterConditions, setFilterConditions] = useState(initialFilterConditions)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    dispatch(getAccountTeacher(filterConditions))
  }, [dispatch, filterConditions])

  const handleChangePage = useCallback((page) => {
    setFilterConditions((state) => ({
      ...state,
      page: page.current,
      pageSize: page.pageSize
    }))
  }, [])

  const openCreateTeacherAccount = () => {
    setVisible(!visible)
  }
  return (
    <Fragment>
      <div className="container user_list">
        <Row style={{ marginBottom: 10 }} justify="end">
          <Col
            span={6}
            className="btn-create-user"
            style={{ textAlign: 'end' }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => openCreateTeacherAccount()}
            >
              Tạo tài khoản
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <Table
              showSorterTooltip={false}
              dataSource={data}
              columns={TableData()}
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
        {visible && <ModalCreateTeacherAccount visible={visible} action={openCreateTeacherAccount} />}
      </div>
    </Fragment>
  );
}
