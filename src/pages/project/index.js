import React, { Component } from "react";
import Loading from "@/components/Loading";
import LoadEnd from "@/components/LoadEnd";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Card, message } from "antd";
import Meta from "antd/lib/card/Meta";
import { timestampToTime, getScrollTop, getWindowHeight, getDocumentHeight } from "@/utils/utils";
import https from '@/utils/request';
import urls from "@/utils/urls";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoadEnd: false,
      keyword: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      list: [],
    }
  }
  componentDidMount() {
    this.handleSearch();
    window.onscroll = () => {
      if (getScrollTop() + getWindowHeight() >  getDocumentHeight() - 100) {
        // 如果还有数据，否可以继续滚动加载
        if(!this.state.isLoadEnd && !this.state.isLoading) {
          this.handleSearch();
        }
      }
    }
  }

  handleSearch = () => {
    this.setState({
      isLoading: true,
    });
    const { keyword, pageNum, pageSize, list, total } = this.state;
    https.get(urls.getProjectList, {
      params: { keyword, pageNum, pageSize }
    }).then(res => {
      let num = pageNum;
      const data = res.data.data;
      this.setState({
        list: list.concat(data.list),
        total: data.count,
        pageNum: ++num,
        isLoading: false,
      });
      if (total === list.length) {
        this.setState({
          isLoadEnd: true,
        })
      } else {
        message.error(res.data.message, 1);
        this.setState({
          isLoading: false,
        })
      }
    }).catch(err => {
      console.error(`请求服务期错误： ${err}`);
      this.setState({
        isLoading: false,
      })
    })
  }

  render() {
    // state 状态 1 是已经完成 ，2 是正在进行，3 是没完成
    const list = this.state.list.map(item => (
      <ReactCSSTransitionGroup
        key={item._id}
        transitionName="example"
        transitionApper={true}
        transitionApperTimeout={1000}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
      >
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          <Card
            hoverable
            style={{ width: '100%' }}
            cover={
              <img alt={item.title} src={item.img} />
            }
          >
            <Meta title={item.title} description={item.content}/>
            <span>
              {item.start_time ? timestampToTime(item.start_time, false) : ''}
              ~
              {item.end_time ? timestampToTime(item.end_time, false) : ''}
            </span>
          </Card>
        </a>
      </ReactCSSTransitionGroup>
    ))
    return (
      <div className="left">
        <ul className="project">{list}</ul>
        {this.state.isLoading ? <Loading /> : ''}
        {this.isLoadEnd ? <LoadEnd /> : ''}
      </div>
    )
  }

}

export default Project;