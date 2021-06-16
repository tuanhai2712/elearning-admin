import React, { useState } from 'react';
import {
  Button,
  Col,
  Modal,
  Spin,
} from 'antd';
import styled from 'styled-components';
import ImageUploader from 'react-images-upload';
import { useDispatch, useSelector } from 'react-redux';
import { uploadBanner } from 'state/banner/reducer';
export default function ModalCreateBanner({
  visible,
  action,
}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const [pictures, setPictures] = useState([]);
  const onDrop = (picture) => {
    setPictures(picture);
  }

  const upload = () => {
    dispatch(uploadBanner(pictures))
  }
  return (
    <ModalStyled
      title="Tạo mới banner"
      visible={visible}
      onCancel={action}
      centered={true}
      maskClosable={false}
      width={850}
      footer={null}
      className="custom_modal"
    >
      <div style={{ padding: 24 }}>
        <Spin spinning={loading}>
          <section id="register">
            <div className="container">
              <UploadImageStyled
                withIcon={true}
                label={'Dung lượng ảnh: < 5mb với định dạng: jpg, jpeg, png'}
                buttonText='Chọn ảnh'
                onChange={onDrop}
                imgExtension={['.jpg', '.png', '.jpeg']}
                maxFileSize={5242880}
                withPreview={true}
                fileTypeError="Định dạng ảnh không được hỗ trợ!"
                fileSizeError="Dung lượng file quá lớn!"
              />
              <Button type="primary" onClick={() => upload()}>
                Tạo mới
              </Button>
            </div>
          </section>
        </Spin>
      </div>
    </ModalStyled>
  );
}


const ModalStyled = styled(Modal)`
  .ant-modal-header .ant-modal-title {
    font-weight: 600;
  }
`;

const UploadImageStyled = styled(ImageUploader)`
  .uploadPictureContainer .deleteImage {
    background: #464dda;
  }

  .fileContainer .uploadPicturesWrapper {
    > div {
      align-items: unset !important;
    }
  }
`

