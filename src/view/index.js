import './index.less';
import './mobile.less';
import React, { Component } from 'react';
import { Layout, BackTop } from 'antd';
import SliderRight from '../components/Slider/index';
import Nav from '../components/Nav/index';
import Index from '../components/Home/index';
import { isMobile } from '../utils/utils';
const { Content, Footer, Sider } = Layout;

class Layouts extends Component {
  render() {
    const pathName = this.props.location.pathname;
    const isShowSlider = () => {
      if ((pathName === '/home' || pathName === '/articleDetail' ||  pathName === '/about') && !isMobile()) {
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
            <Nav pathname={pathName} />
            <Layout className="layout">
              <Content>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                  <Content style={{ padding: '0 24px 0 0', minHeight: 280 }}>
                    {this.props.children}
                  </Content>
                  {isShowSlider() ? (
                    <Sider width={350} style={{ background: '#fff' }}>
                      <SliderRight />
                    </Sider>
                  ) : ( '' )}
                </Layout>
              </Content>
            </Layout>
            <Footer style={{ textAlign: 'center', background: '#fff' }}>
              Copyright @2019 coco版权所有浙ICP备00000000号-1
            </Footer>
            <BackTop />
          </div>
        )}
      </div>
    );
  }
}

export default Layouts;
