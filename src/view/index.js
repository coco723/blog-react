import './index.less';
import './mobile.less';
import React, { Component } from 'react';
import { Layout } from 'antd';
import SliderRight from '../components/Slider/index';
import Nav from '../components/Nav/index';
import Index from '../components/Home/index';
import { isMobile } from '../utils/utils';
const { Content, Footer, Sider } = Layout;

class Layouts extends Component {
  render() {
    const pathName = this.props.location.pathname;
    const isShowSlider = () => {
      if ((pathName === '/home' || pathName === '/articleDetail') && !isMobile()) {
        return false;
      }
      return true;
    }

    const isIndexPage = () => {
      if (pathName === '/') {
        return true;
      }
      return false;
    }
    
    return (
      <div className="Layouts">
        {isIndexPage() ? (
          <Index />
        ) : (
          <div>
            <Nav pathname={this.props.location.pathname} />
            <Layout className="layout">
              <Content style={{ minHeight: 828 }}>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                  <Content style={{ padding: '0 24px 0 0', minHeight: 280 }}>
                    {this.props.children}
                  </Content>
                  {
                    isShowSlider() ? (
                    <Sider width={200} style={{ background: '#fff' }}>
                      <SliderRight />
                    </Sider>
                    ) : (
                      ''
                    )
                  }
                </Layout>
              </Content>
              <Footer style={{ textAlign: 'center', background: '#fff' }}>
                全栈修炼 ©2018 Created by BiaoChenXuYing
              </Footer>
            </Layout>
          </div>
        )}
      </div>
    );
  }
}

export default Layouts;
