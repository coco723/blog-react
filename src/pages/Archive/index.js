import './index.less';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Timeline, Icon, message } from 'antd';
import https from '@/utils/request';
import urls from '@/utils/urls';
import { timestampToTime } from '@/utils/utils';
import Loading from '@/components/Loading/index';

class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoadEnd: false,
      likes: "", // 是否是热门文章
      state: 1, // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
      article: 1,
      keyword: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      list: [],
    };
  }
  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    this.setState({
      isLoading: true,
    });
    const { state, keyword, pageNum, pageSize, article, total, list } = this.state;
    https.get(urls.getArticleList, {
      params: {
        state, keyword, pageNum, pageSize, article
      },
    }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const data = res.data.data;
        const num = pageNum + 1;
        this.setState({
            list: list.concat(data.list),
            total: data.count,
            pageNum: num,
            isLoading: false,
        });
        if (total === list.length) {
          this.setState({
            isLoadEnd: true,
          });
        }
      } else {
        message.error(res.data.message);
      }
    }).catch(err => {
      console.log(`请求服务错误：${err}`);
      this.setState({
        isLoading: false,
      })
    });
  };

  render() {
    const list = this.state.list.map((item, i) => 
      <Timeline.Item 
        key = { i }
        color = { 'red' }
        dot = { 
          <Icon type = "clock-circle-o" style = {{ fontSize: '16px' }} />
        }
      >
        <h1> { item.year } </h1> 
        { item.list.length > 0 ? item.list.map(article => {
          return ( 
            <Timeline key = {article._id} >
              <Timeline.Item>
                <Link
                  target = "_blank"
                  to = {`/articleDetail?article_id=${article._id}`}
                >
                  <h3> {article.title} </h3>
                </Link> 
                <p>
                  <span>{article.create_time ? timestampToTime(article.create_time, true) : ''}</span>
                </p> 
              </Timeline.Item>
            </Timeline>
          );
        }) : ('')}
      </Timeline.Item>
    );

    return (
      <div className = "archive">
        {this.state.list.length > 0? (<Timeline>{ list }</Timeline> ) : ('')}
        {this.state.isLoading ? <Loading /> : ('')} 
      </div>
    );
  }
}

export default Archive;