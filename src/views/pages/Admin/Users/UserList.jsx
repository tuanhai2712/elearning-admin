import React, { Fragment, useEffect } from 'react';
export default function UserList() {
  useEffect(() => {
    document.title = 'Quản lý người dùng';
    window.scrollTo(0, 0);
  }, []);
  return (
    <Fragment>
      <div className="container user_list">
        <p>123132</p>
      </div>
    </Fragment>
  );
}
