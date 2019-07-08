import './index.less';
import './mobile.less';
import React, { Component } from 'react';
import { Layout, BackTop } from 'antd';
import SliderRight from '../components/Slider/index';
import Nav from '../components/Nav/index.js';
import Index from '../pages/Home/index';
import { isMobile } from '../utils/utils';
const { Content, Footer, Sider } = Layout;

class Layouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let isShowSlider = false;
    let pathName = this.props.location.pathname;
    if (
      pathName !== '/articleDetail' &&
      pathName !== '/about' &&
      !isMobile()
    ) {
      isShowSlider = true;
    }

    let isIndexPage = false;
    if (pathName === '/') {
      isIndexPage = true;
    }
    return (
      <div className="Layouts">
        {!isIndexPage ? (
          <div>
            <Nav pathname={this.props.location.pathname} />
            <Layout className="layout">
              <Content>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                  <Content style={{ padding: '0 24px 0 0', minHeight: 280 }}>
                    {this.props.children}
                  </Content>
                  {!isShowSlider ? (
                    ''
                  ) : (
                    <Sider width={350} style={{ background: '#fff' }}>
                      <SliderRight />
                    </Sider>
                  )}
                </Layout>
              </Content>
            </Layout>
            <Footer style={{ textAlign: 'center', background: '#fff' }}>
              全栈修炼 ©2018 Created by CoCo
            </Footer>
            <BackTop />
          </div>
        ) : (
          <Index />
        )}
      </div>
    );
  }
}

export default Layouts;
