import React, { Component } from 'react';
import { Modal, Input } from 'antd';
const { TextArea } = Input;

class ChildrenComment extends Component {
  render() {
    const { visible, handleCancel, handleOk, content, handleChange } = this.props;
    return (
      <Modal
        title="评论"
        style={{ top: '25%' }}
        visible={visible}
        onCancel={handleCancel}
        onOk={handleOk}
        width={600}
      >
        <div>
          <TextArea
            rows={4}
            name="content"
            placeholder="文明社会，理性评论"
            value={content}
            onChange={handleChange}
          />
        </div>
      </Modal>
    );
  }
}

export default ChildrenComment;
