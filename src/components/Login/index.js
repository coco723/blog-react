import React, { Component } from 'react';
import { Modal, Input, Icon, message, Button } from 'antd';
import https from '@/utils/request';
import urls from '@/utils/urls';
import config from '@/utils/config';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  login({ email, password }) {
    https
      .post(
        urls.login,
        {
          email,
          password,
        },
        { withCredentials: true },
      )
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.props.loginSuccess(res.data);
          let userInfo = {
            _id: res.data.data._id,
            name: res.data.data.name,
            avatar: res.data.data.avatar,
          };
          window.sessionStorage.userInfo = JSON.stringify(userInfo);
          message.success(res.data.message, 1);
          this.props.handleCancel();
          this.setState({
            email: '',
            password: '',
          });
        } else {
          this.props.loginFailure(res.data.message);
          message.warn(res.data.message, 1);
        }
      })
      .catch(err => {
        console.log(err);
        message.error(err, 1);
      });
  }

  handleOk = () => {
    const reg = new RegExp(
      '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$',
    );
    if (!this.state.email) {
      message.warn('邮箱不能为空！');
    } 
    if (!reg.test(this.state.email)) {
      message.warn('请输入格式正确的邮箱！');
    } 
    if (!this.state.password) {
      message.warn('密码不能为空');
    }
    this.login(this.state);
  }
  
  handleOAuth = () => {
    // 保存授权前的页面链接内容
    const preventHistory = {
      pathname: window.location.pathname,
      search: window.location.search,
    };
    window.sessionStorage.preventHistory = JSON.stringify(preventHistory);
    // window.location.href = 'https://github.com/login/oauth/authorize?client_id=6de90ab270aea2bdb01c&redirect_uri=http://biaochenxuying.cn/login'
    window.location.href = `${config.oauth_uri}?client_id=${
      config.client_id
    }&redirect_uri=${config.redirect_uri}`;
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    const { email, password } = this.state;
    const { visible, handleCancel } = this.props;
    return (
      <Modal
        title="登录"
        style={{ top: '25%' }}
        visible={visible}
        onCancel={handleCancel}
        width={400}
        footer={null}
      >
        <div className="login-input">
          <Input
            style={{ marginBottom: 20 }}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="email"
            placeholder="email"
            value={email}
            onChange={this.handleChange}
          />
          <Input
            style={{ marginBottom: 40 }}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
          />
        </div>
        <div className="login-submit">
          <Button
            style={{ width: '100%', marginBottom: '20px' }}
            type="primary"
            onClick={this.handleOk}
          >
            登录
          </Button>
          <Button style={{ width: '100%' }} onClick={this.handleOAuth}>
            github 授权登录
          </Button>
        </div>
      </Modal>
    );
  }
}

export default Login;
