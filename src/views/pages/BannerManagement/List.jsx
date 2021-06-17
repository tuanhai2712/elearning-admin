import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';
import {
  Button,
  Row,
  Spin,
  Col,
  Switch
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import ModalCreateBanner from './Create';
import { useDispatch, useSelector } from 'react-redux';
import { getBanner, bannerSelector } from 'state/banner/reducer';
export default function List() {
  useEffect(() => {
    document.title = 'Quản lý banner';
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch()
  const { loading, data } = useSelector(bannerSelector)
  const [visibleModalCreateBanner, setVisibleModalCreateBanner] = useState(false)
  useEffect(() => {
    dispatch(getBanner())
  }, [])
  const openCreateBannerModal = () => {
    setVisibleModalCreateBanner(!visibleModalCreateBanner)
  }

  const handleActiveBanner = (checked) => {

  }

  const renderBanner = () => {
    if (data.length) {
      return data.map((item) => {
        return (
          <Col span={6} key={item.id} style={{ padding: 5, }}>
            <img src={`https://apidev.theieltsworkshop.com/${item.image}`} alt={item.id} style={{ width: '100%', border: '1px solid #b9b6b6' }} />
            <Row align='middle' justify='space-between' style={{ marginTop: 5 }}>
              <Button style={{ padding: 'unset' }} icon={<DeleteOutlined />}></Button>
              <Switch defaultChecked onChange={handleActiveBanner} checkedChildren="Bỏ kích hoạt" unCheckedChildren="Kích hoạt" />
            </Row>
          </Col>
        )
      })

    }
  }
  return (
    <Fragment>
      <div className="container user_list">
        <Row style={{ marginBottom: 10 }}>
          <Col
            span={6}
            className="btn-create-user"
            style={{ textAlign: 'start' }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => openCreateBannerModal()}
            >
              Tạo banner
            </Button>
          </Col>
        </Row>
        <Spin spinning={loading}>
          <Row type="flex">
            {renderBanner()}

          </Row>
        </Spin>
      </div>
      {visibleModalCreateBanner && <ModalCreateBanner visible={visibleModalCreateBanner} action={() => openCreateBannerModal()} />}
    </Fragment>
  );
}
