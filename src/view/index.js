import './index.less';
import './mobile.less';
import React, { Component } from 'react';
import { Layout, BackTop, Menu, Breadcrumb } from 'antd';
import SliderRight from '../components/Slider/index';
import Nav from '../components/Nav/index';
import Index from '../components/Home/index';
import { isMobile } from '../utils/utils';
const { Content, Footer, Sider , Header} = Layout;

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
      <div>
        {
          isIndexPage() ? (
            <Index />
          ) : (
            <Layout className="layout">
              <Nav pathname ={pathName} />
              <Layout style={{ marginTop: 30 }}>
                <Content>
                  <div style={{ background: '#fff', padding: 24, minHeight: 868 }}>{this.props.children}</div>
                </Content>
                {
                  isShowSlider() ? (
                    <Sider style={{ backgroundColor: '#fff' }}>
                      <SliderRight />
                    </Sider>
                  ) : ( '' )
                }
              </Layout>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
          )
        }
      </div>
    );
  }
}

export default Layouts;
