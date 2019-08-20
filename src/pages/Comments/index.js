import './index.less';
import React, { Component } from 'react';
import { Avatar, Input } from 'antd';

const { TextArea } = Input;

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      content: '',
    };
  }

  render() {
    const { content, handleChange, isSubmitLoading, handleAddComment } = this.props;
    const userInfo = () => {
      if (window.sessionStorage.userInfo) {
        return JSON.parse(window.sessionStorage.userInfo);
      }
      return {};
    }
    
    return (
      <div className="comment">
        <div className="avatar">
          <Avatar
            className="auth-logo"
            size={50}
            icon="user"
            src={userInfo().avatar || ''}
          />
        </div>
        <h3>{userInfo().name || ''}</h3>
        <TextArea
          className="textarea"
          name="content"
          value={content}
          onChange={handleChange}
          placeholder="文明社会，理性评论"
          rows={4}
        />
        <div className="new-comment write-function-block">
          {
            isSubmitLoading ? (
              <div href="/" className="btn btn-send">发送中...</div>
            ) : (
              <div href="/" onClick={handleAddComment} className="btn btn-send">发送</div>
            )
          }
          <div className="cancel">取消</div>
        </div>
      </div>
    );
  }
}

export default Comment;
