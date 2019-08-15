import React, { Component } from 'react';
import { isMobile } from '../utils/utils';
import { Layout, BackTop } from 'antd';
import Nav from '../components/Nav';
import SliderRight from '../components/Slider'
const { Content, Footer, Sider } = Layout;


class Layouts extends Component {
  render() {
    const pathName = this.props.location.pathName;
    const isShowSlider = () => {
      if (pathName !== '/articleDetail' &&  pathName !== '/about' &&  !isMobile()) {
        return true;
      }
      return false;
    }
  
    return (
      <div className="Layouts">
        <Nav pathname={pathName}/>
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
        <Footer style={{ textAlign: 'center', background: '#fff' }}>
          全栈修炼 ©2019 Created by GuoYanHong
        </Footer>
        <BackTop />
      </div>
    )
  }
}

export default Layouts;