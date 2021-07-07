import React from 'react';
import moment from 'moment';

export default function TableData() {
  const columns = [
    {
      title: 'Lớp',
      render(text, record) {
        return <p>{record.class}</p>;
      },
    },
    {
      title: 'Bình luận',
      render(text, record) {
        return <p>{record.comment}</p>;
      },
    },
    {
      title: 'Mức đánh giá',
      render(text, record) {
        return <p>{record.point}</p>;
      },
    },
    {
      title: 'Người gửi',
      render(text, record) {
        return <p>{record.created_by}</p>;
      },
    },
    {
      title: 'Ngày gửi',
      render(text, record) {
        return <p>{moment(record.created_ay).format('DD-MM-YYYY: HH:mm')}</p>;
      },
    },

  ];
  return columns;
}
