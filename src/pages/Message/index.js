import React, { Component } from "react";
import { Input, Icon, Button, message } from "antd";
import https from '@/utils/request';
import urls from "@/utils/urls";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      phone: '',
      name: '',
      content: '',
      cacheTime: 0, // 缓存时间
      times: 0, // 评论次数
    }
  }

  addMessage() {
    const { email, name, phone, content, times, cacheTime } = this.state;
    if (times > 3) {
      message.warn('您今天留言的次数已经用完，明天再来留言吧！', 1);
      return;
    }
    const nowTime = new Date().getTime();
    if (nowTime - cacheTime < 60000) {
      message.warn('您留言泰国频繁，1分钟后再来留言吧！', 1);
      return;
    }
    this.setState({
      isLoading: true,
    });
    https.post(urls.addMessage, {
      email, name, phone, content
    }, {
      withCredentials: true,
    }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        this.setState({
          isLoading: false,
        });
        message.success('您的留言已经发送到后台，管理员会尽快回复您的问题', 1);
        const t = times + 1;
        this.setState({
          cacheTime: nowTime,
          times: t,
        });
      } else {
        message.error(res.data.message, 1);
      }
    }).catch(err => {
      this.setState({
        isLoading: false,
      });
      message.error(`请求服务错误${err}`, 1);
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = () => {
    const reg = new RegExp(
      '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$',
    );
    const { email, content } = this.state;
    if (!email) {
      message.warn('邮箱不能为空！');
      return;
    }
    if (!reg.test(email)) {
      message.warn('请输入正确的邮箱！');
      return;
    }
    if (!content) {
      message.warn('内容不能为空！');
      return;
    }
    this.addMessage();
  }

  render() {
    const { email, name, phone, content, isLoading } = this.state;
    return (
      <div className="message">
        <div>
          <Input
            style={{ marginBottom: 40 }}
            prefix={
              <Icon type="safety" theme="twoTone" style={{ color: 'rgba(0,0,0,.25)' }} />
            } 
            name="email"
            placeholder="邮箱（不能为空）"
            value={email}
            onChange={this.handleChange}
          />
          <Input
            style={{ marginBottom: 40 }}
            prefix={<Icon type="lock" theme="twoTone" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            name="name"
            placeholder="名字（可为空）"
            value={name}
            onChange={this.handleChange}
          />
          <Input
            style={{ marginBottom: 40 }}
            prefix={<Icon type="phone" theme="twoTone" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            name="phone"
            placeholder="手机（可为空）"
            value={phone}
            onChange={this.handleChange}
          />
          <Input
            style={{ marginBottom: 40 }}
            prefix={<Icon type="message" theme="twoTone" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            name="content"
            placeholder="留言内容（不能为空）"
            value={content}
            onChange={this.handleChange}
          />
        </div>
        <div className="submit">
          <Button
            loading={isLoading}
            style={{ width: '100%' }}
            type="primary"
            onClick={this.handleSubmit}
          >
            提交
          </Button>
        </div>
      </div>
    )
  }
}

export default Message;
