import React, { Fragment } from 'react';
import moment from 'moment';
import { Tooltip, Button } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
export default function TableData(handleDelete, handleDownload, page) {
  const columns = [
    {
      title: 'STT',
      render(text, record, idx) {
        return <span>{(page - 1) * 10 + idx + 1}</span>;
      },
    },
    {
      title: 'Tên bài tập',
      render(text, record) {
        return <p>{record.name}</p>;
      },
    },
    {
      title: 'Ngày tạo',
      render(text, record) {
        return (
          <p>
            {moment(moment.utc(record.created_at).toDate())
              .local()
              .format('DD-MM-YYYY HH:mm')}
          </p>
        );
      },
    },
    {
      title: '',
      dataIndex: 'action',
      fixed: 'right',
      className: 'text_right',
      render(text, record) {
        return (
          <Fragment>
            {record.type === 'file' && (
              <Tooltip title={'Xem'}>
                <Button
                  shape="circle"
                  icon={<EyeOutlined />}
                  className="border-none"
                  data-id={record.id}
                  onClick={handleDownload}
                  style={{ marginRight: 5 }}
                />
              </Tooltip>
            )}
            <Tooltip title={'Xóa'}>
              <Button
                shape="circle"
                icon={<DeleteOutlined />}
                className="border-none"
                data-id={record.id}
                onClick={handleDelete}
              />
            </Tooltip>
          </Fragment>
        );
      },
    },
  ];
  return columns;
}
