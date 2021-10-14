import React, { Fragment, useEffect, useState } from 'react';
import { Row, Spin, Input, Col, Button, Divider } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { getConfig, saveConfig, configSelector } from 'state/config/reducer';
export default function List() {
  useEffect(() => {
    document.title = 'Quản lý điểm';
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const { loading, data } = useSelector(configSelector);
  const [state, setState] = useState({
    per_post: null,
    money_per_point: null,
  });
  useEffect(() => {
    if (Object.keys(data).length) {
      setState({ ...data });
    }
  }, [data]);
  useEffect(() => {
    dispatch(getConfig());
  }, [dispatch]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setState((oldState) => ({
      ...oldState,
      [name]: value,
    }));
  };
  const save = () => {
    dispatch(saveConfig(state));
  };
  return (
    <Fragment>
      <div style={{ fontSize: 12 }}>
        <span>1. Số điểm thưởng khi chia sẻ 1 bài viết</span>
        <br />
        <span>2. Đố điểm thưởng khi đóng 1.000.000đ</span>
      </div>
      <Divider />
      <Spin spinning={loading}>
        <Row style={{ marginBottom: 20, alignItems: 'center' }}>
          <Col span={3}>
            <span>Số điểm / Bài viết</span>
          </Col>
          <Col span={3}>
            <Input
              name="per_post"
              value={state.per_post}
              type="number"
              onChange={(event) => handleChange(event)}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20, alignItems: 'center' }}>
          <Col span={3}>
            <span>Số tiền thưởng / Điểm</span>
          </Col>
          <Col span={3}>
            <Input
              name="money_per_point"
              value={state.money_per_point}
              type="number"
              onChange={(event) => handleChange(event)}
            />
          </Col>
        </Row>
        <Button type="primary" onClick={() => save()}>
          Lưu
        </Button>
      </Spin>
    </Fragment>
  );
}
