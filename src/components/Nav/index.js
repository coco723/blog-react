import './index.less';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Icon, Menu, Row, Col, Button, Avatar, message } from 'antd';
import Register from '../Register/index';
import Login from '../Login/index';
import { isMobile, getQueryStringByName } from '@/utils/utils';
import https from '@/utils/request';
import urls from '@/utils/urls';
import Loading from '../Loading/index';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      current: null,
      menuCurrent: '',
      login: false,
      register: false,
      nav: '首页',
      navTitle: '首页',
      code: '',
      isLoading: false,
    };
  }
  componentDidMount() {
    const code = getQueryStringByName('code');
    const { pathname } = this.props;
    if (code) {
      this.setState({
        code,
      })
      this.getUser(code);
    }
    this.initMenu(pathname);
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  initMenu = (name) => {
    let key = '9';
    let navTitle = '';
    switch(name) {
      case '/':
        key = '9';
        navTitle = '首页';
        break;
      case '/articles':
        key = '1';
        navTitle = '文章';
        break;
      case '/message': 
        key = '4';
        navTitle = '留言';
        break;
      case '/articleDetail':
        key = '6';
        navTitle = '文章详情';
        break;
      case '/project': 
        key = '7';
        navTitle = '项目';
        break;
      case '/archive':
        key = '8';
        navTitle = '归档';
        break;
      default:
        break;
    }
    
    this.setState({
      navTitle,
      menuCurrent: key,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.initMenu(nextProps.pathname);
  }

  getUser(code) {
    this.setState({
      isLoading: true,
    });
    https.post(urls.getUser, {
      code,
    },{ 
      withCredentials: true 
    }).then(res => {
      this.setState({
        isLoading: false,
      });
      if (res.status === 200 && res.data.code === 0) {
        const { _id, name, avatar } = res.data.data;
        const userInfo = { _id, name, avatar };
        window.sessionStorage.userInfo = JSON.stringify(userInfo);
        this.handleLoginCancel();
        // 跳转到之前授权前的页面
        let preventHistory = JSON.parse(window.sessionStorage.preventHistory);
        if (preventHistory) {
          this.props.history.push({
            pathname: preventHistory.pathname,
            search: preventHistory.search,
          });
        }
      } else {
        message.error(res.data.message, 1);
      }
    }).catch(err => {
      this.setState({
        isLoading: false,
      });
      console.log(`服务期请求错误: ${err}`);
      message.error(JSON.stringify(err), 1);
    });
  }

  handleMenu = e => {
    this.setState({
      menuCurrent: e.key,
    });
  };

  handleLogout = e => {
    this.setState({
      current: e.key,
    });
    window.sessionStorage.userInfo = '';
    this.onClose();
  };

  showLoginModal = () => {
    this.onClose();
    this.setState({
      login: true,
    });
  }
  showRegisterModal = () => {
    this.onClose();
    this.setState({
      register: true,
    });
  }
  handleLoginCancel = () => {
    this.setState({
      login: false,
    });
  }
  handleRegisterCancel = () => {
    this.setState({
      register: false,
    });
  }
  menuClick = (key) => {
    this.setState({
      nav: key,
    });
  }
  render() {
    const { login, register, isLoading } = this.state;
    const userInfo = () => {
      if (window.sessionStorage.userInfo) {
        return JSON.parse(window.sessionStorage.userInfo);
      }
      return '';
    }

    return (
      <div className="left">
        {
          isMobile() ? (
          <Header 
            className="mobile-header"
          >
            <Row className="container">
              <Col style={{ width: '25%', float: 'left', lineHeight: '64px' }}>
                <a href="../../../public/main.html">
                </a>
              </Col>
              <Col style={{ textAlign: 'center', width: '50%', float: 'left' }}>
                <div className="nav-title"> {this.state.navTitle} </div>
              </Col>
              <Col style={{ textAlign: 'right', width: '25%', float: 'left' }}>
                <div>
                  <Icon
                    type="bars"
                    onClick={this.showDrawer}
                    style={{
                      fontSize: '40px',
                      marginRight: '10px',
                      marginTop: '10px',
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Header>
        ) : (
          <Header className="header">
            <Row className="container">
              {/* <Col style={{ width: '120px', float: 'left' }}>
                <a href="http://biaochenxuying.cn/main.html">
                  <div className="logo ">
                    <h2>可可的博客</h2>
                  </div>
                </a>
              </Col> */}
              <Col style={{ width: '780px', float: 'left' }}>
                <Menu
                  theme="light"
                  mode="horizontal"
                  defaultSelectedKeys={['1']}
                  onClick={this.handleMenu}
                  selectedKeys={[this.state.menuCurrent]}
                  style={{ lineHeight: '64px', borderBottom: 'none' }}
                >
                  <Menu.Item key="9">
                    <Link to="/">
                      <Icon type="home" theme="twoTone" />
                      首页
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="1">
                    <Link to="/articles">
                      <Icon type="file-text" theme="twoTone" />
                      文章
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="8">
                    <Link to="/archive">
                      <Icon type="project" theme="twoTone" />
                      归档
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="7">
                    <Link to="/project">
                      <Icon type="database" theme="twoTone" />
                      项目
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to="/message">
                      <Icon type="message" theme="twoTone" />
                      留言
                    </Link>
                  </Menu.Item>
                </Menu>
              </Col>
              <Col style={{ textAlign: 'right', width: '300px', float: 'right' }}>
                {userInfo() ? (
                  <Menu
                    onClick={this.handleLogout}
                    style={{
                      width: 220,
                      lineHeight: '64px',
                      display: 'inline-block',
                    }}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                  >
                    <SubMenu
                      title={
                        <span className="submenu-title-wrapper">
                          <Avatar
                            onClick={this.showDrawer}
                            size="large"
                            icon="user"
                            src={userInfo.avatar}
                            style={{ marginRight: 5 }}
                          />
                          {userInfo.name}
                        </span>
                      }
                    >
                      <MenuItemGroup>
                        <Menu.Item key="logout">退出</Menu.Item>
                      </MenuItemGroup>
                    </SubMenu>
                  </Menu>
                ) : (
                  <div>
                    <Button
                      type="primary"
                      icon="login"
                      style={{ marginRight: '15px' }}
                      onClick={this.showLoginModal}
                    >
                      登 录
                    </Button>
                    <Button
                      type="danger"
                      icon="logout"
                      style={{ marginRight: '15px' }}
                      onClick={this.showRegisterModal}
                    >
                      注 册
                    </Button>
                  </div>
                )}
              </Col>
            </Row>
          </Header>
        )}
        <Login visible={login} handleCancel={this.handleLoginCancel} />
        <Register visible={register} handleCancel={this.handleRegisterCancel} />
        {
          isLoading ? (
            <div style={{ marginTop: 100 }}>
              <Loading />
            </div>
          ) : ( '' )
        }
      </div>
    );
  }
}

export default withRouter(Nav);
