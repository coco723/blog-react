import './index.less';
import './mobile.less';
import React, { Component } from 'react';
import { Layout, BackTop } from 'antd';
import SliderRight from '../components/Slider/index';
import Nav from '../components/Nav/index';
import Home from '../components/Home/index';
import { isMobile } from '../utils/utils';
const { Content, Footer, Sider } = Layout;

class Layouts extends Component {
  render() {
    const pathName = this.props.location.pathname;
    const isShowSlider = () => {
      if (pathName !== '/articleDetail' &&  pathName !== '/about' &&  !isMobile()) {
        return true;
      }
      return false;
    }    

    const isIndexPage = () => {
      if (pathName === '/') {
        return true;
      }
      return false;
    }

    return (
      <div className="Layouts">
        {
          isIndexPage ? (
            <Home />
          ) : (
            <div>
              <Nav pathname={pathName} />
              <Layout className="layout" style={{ padding: '24px 0', background: '#fff' }}>
                <Content style={{ padding: '0 24px 0 0', minHeight: 280 }}>
                  {this.props.children}
                </Content>
                {isShowSlider? (
                  <Sider width={350} style={{ background: '#fff' }}>
                    <SliderRight />
                  </Sider>
                ) : ( '' )}
              </Layout>
              <Footer style={{ textAlign: 'center', background: '#fff' }}>
                全栈修炼 ©2019 Created by coco
              </Footer>
              <BackTop />
            </div>
          )
        }
      </div>
    );
  }
}

export default Layouts;
