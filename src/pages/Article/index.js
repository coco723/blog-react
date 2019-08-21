import React, { Component } from 'react';
import { getQueryStringByName, getScrollTop, getWindowHeight, getDocumentHeight, lazyload, timestampToTime } from '../../utils/utils';
import Loading from '@/components/Loading/index';
import https from '@/utils/request';
import urls from '@/utils/urls';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { message, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './index.less';
import LoadEnd from '@/components/LoadEnd';


class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadEnd: false,
      isLoading: false,
      keyword: '',
      likes: '', // 是否是热门文章
      state: 1, // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
      tag_id: getQueryStringByName('tag_id'),
      tag_name: decodeURI(getQueryStringByName('tag_name')),
      category_id: getQueryStringByName('category_id'),
      pageNum: 1,
      pageSize: 10,
      list: [],
      total: 0,
    };
  }

  componentDidMount() {
    if (this.props.location.pathnmae === '/hot') {
      this.setState({
        likes: true
      });
    }
    this.handleSearch();
    window.onscroll = () => {
      if (getScrollTop() + getWindowHeight() > getDocumentHeight() - 100) {
        if (!this.state.isLoading && !this.state.isLoadEnd) {
          this.handleSearch();
        }
      }
    }
    document.addEventListener('scroll', lazyload);
  }

  handleSearch = () => {
    this.setState({
      isLoading: true,
    });
    const { keyword, likes, state, tag_id, category_id, pageNum, pageSize } = this.state;
    https.get(urls.getArticleList, {
      params: { keyword, likes, state, tag_id, category_id, pageNum, pageSize },
    }, {
      withCredentials: true,
    }).then(res => {
      let num = pageNum;
      if (res.status === 200 && res.data.code === 0) {
        this.setState(state => ({
          list: [...state.list, ...res.data.data.list],
          total: res.data.data.count,
          pageNum: ++num,
          isLoading: false,
        }));
        if (this.state.total === this.state.list.length) {
          this.setState({
            isLoadEnd: true,
          });
        }
        lazyload();
      }
    }).catch(error => {
      message.error(`加载数据错误: ${error}`);
    })
  }


  render() {
    const list = this.state.list.map((item, i) => {
      const link = `/articleDetail?article_id=${item._id}`;
      return (
        <ReactCSSTransitionGroup
          key={item._id}
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
        <li key={item._id} className="have-img">
          <div className="content">
            <Link className="title" target="_blank" to={link}>{item.title}</Link>
            <p className='abstract'>{item.desc}</p>
            <div className="meta">
              <Link rel="noopener noreferrer" to={link}>
                <Icon type="eye" theme="outlined" /> {item.meta.views}
              </Link>{' '}
              <Link target="_blank" to={link}>
                <Icon type="message" theme="outlined" /> {item.meta.comments}
              </Link>{''}
              <Link target="_blank" to={link}>
                <Icon type="like" theme="outlined" /> {item.meta.likes}
              </Link>
              <span className="time">
                {item.create_time ? timestampToTime(item.create_time, true) : ''}
              </span>
            </div>
          </div>
        </li>
        </ReactCSSTransitionGroup>
      )
    })
    return (
      <div className="left">
        {
          this.state.tag_id ?  (
            <h3 className="left-title">{this.state.tag_name} 相关文章</h3>
          ) : (
            ''
          )
        }
        <ul className="note-list" id="list">{list}</ul>
        {this.state.isLoading ? <Loading /> : ''}
        {this.state.isLoadEnd ? '' : <LoadEnd /> }
      </div>
    )
  }
}

export default Articles;
