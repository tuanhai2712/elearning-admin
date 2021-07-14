import React, { Fragment, useEffect, useState } from 'react';
import { Row, Spin, Input, Col, Button } from 'antd';

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
