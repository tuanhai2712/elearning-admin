import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';
import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Table,
  Tooltip,
} from 'antd';
import {
  InfoCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import ModalCreateBanner from './Create'
export default function List() {
  useEffect(() => {
    document.title = 'Quản lý người dùng';
    window.scrollTo(0, 0);
  }, []);

  const [filterConditions, setFilterConditions] = useState({
    page: 1,
    pageSize: 10,
    searchTerm: ''
  })
  const [loading, setLoading] = useState(false)
  const [visibleModalCreateBanner, setVisibleModalCreateBanner] = useState(false)
  const [totalData, setTotalData] = useState(0)

  const openCreateBannerModal = () => {
    setVisibleModalCreateBanner(!visibleModalCreateBanner)
  }
  return (
    <Fragment>
      <div className="container user_list">
        <Row style={{ marginBottom: 10 }}>
          <Col
            span={6}
            xs={24}
            sm={24}
            md={6}
            lg={8}
            xl={6}
            style={{ paddingRight: 10 }}
          >
            <Input
              placeholder="Tìm kiếm"
              value={filterConditions.searchTerm}
              style={{ height: 35, marginBottom: 5 }}
              onChange={() => console.log('xxx')}
              allowClear={true}
              prefix={<SearchOutlined />}
              suffix={
                <Tooltip title="Hỗ trợ tìm kiếm theo tên, tên đăng nhập, số điện thoại, đơn vị, vai trò!">
                  <InfoCircleOutlined />
                </Tooltip>
              }
            />
          </Col>
          <Col
            span={6}
            xs={24}
            sm={24}
            md={6}
            lg={8}
            xl={6}
            style={{ paddingRight: 10 }}
          >
            <div className="fl_row align_center">
              <SelectFilterStyled
                allowClear
                showSearch
                onChange={() => console.log('xxx')}
                className="full"
                placeholder="Lọc theo đơn vị"
                filterOption={(input, option) =>
                  option.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
              </SelectFilterStyled>
            </div>
          </Col>
          <Col
            span={6}
            xs={24}
            sm={24}
            md={6}
            lg={8}
            xl={6}
            className="btn-create-user"
            style={{ textAlign: 'start' }}
          >
            <Tooltip title={'Tạo tài khoản'}>
              <ButtonStyled
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => openCreateBannerModal()}
              />
            </Tooltip>
          </Col>
        </Row>
        <Row type="flex">
          {/* list banner */}
        </Row>
      </div>
      {visibleModalCreateBanner && <ModalCreateBanner visible={visibleModalCreateBanner} action={() => openCreateBannerModal()} />}
    </Fragment>
  );
}

const SelectFilterStyled = styled(Select)`
    .ant-select-selector {
      height: 35px !important;
      margin-bottom: 5px;
    }
  `;
const ButtonStyled = styled(Button)`
    height: 35px;
    width: 35px;
    padding: 0px;
  `
const TableStyled = styled(Table)`
    table {
      .text_right {
        right: -5px !important;
      }
    }
  `;