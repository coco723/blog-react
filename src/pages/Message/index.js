import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);
    this.setState = {
      isLoading: false,
      email: '',
      phone: '',
      name: '',
      content: '',
      cacheTime: 0, // 缓存时间
      times: 0, // 评论次数
    }
  }
  render() {
    return (
      <div></div>
    )
  }
}

export default Message;
