import React from 'react';
import moment from 'moment';

export default function TableData() {
  const columns = [
    {
      title: 'Tên',
      render(text, record) {
        return <span>{record.name}</span>;
      },
    },
    {
      title: 'Email',
      render(text, record) {
        return <span>{record.email}</span>;
      },
    },
    {
      title: 'Số điện thoại',
      render(text, record) {
        return <span>{record.phone}</span>;
      },
    },
    {
      title: 'Sinh nhật',
      render(text, record) {
        return (
          <span>
            {record.dob ? moment(record.dob).format('DD-MM-YYYY') : null}
          </span>
        );
      },
    },
    {
      title: 'Trường',
      render(text, record) {
        return <span>{record.school}</span>;
      },
    },
  ];
  return columns;
}
