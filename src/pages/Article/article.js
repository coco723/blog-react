import React, { Component } from "react";
import { isMobile, getQueryStringByName, timestampToTime } from '@/utils/utils';
import { Avatar, Icon, Button, message } from "antd";
import logo from '@/assets/userLogo.jpeg';
import Loading from "@/components/Loading/index";
import './article.less';
import https from '@/utils/request';
import urls from '@/utils/urls';
import Comment from '../Comments/index';
import CommentList from '../Comments/list';
import markdown from '@/utils/markdown';


class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isSubmitLoading: false,
      list: [],
      content: '',
      type: 1, //文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
      info: {
        _id: undefined,
        author: 'coco',
        category: [],
        comments: [],
        create_time: '',
        desc: '',
        id: 16,
        img_url: '',
        numbers: 0,
        keyword: [],
        like_users: [],
        meta: { views: 0, likes: 0, comments: 0 },
        origin: 0,
        state: 1,
        tags: [],
        title: '',
        update_time: '',
      },
      cacheTime: 0, // 缓存时间
      times: 0, // 评论次数
      likeTimes: 0, // 点赞次数
    }
  };


  componentWillUnmount() {
    document.title = '可可的博客';
    document.getElementById('keywords').setAttribute('content', '可可的博客');
    document.getElementById('description').setAttribute('content', '全栈修炼');
  }

  UNSAFE_componentWillMount() {
    const article_id = getQueryStringByName('article_id');
    this.handleSearch(article_id);
  }

  handleSearch = (article_id) => {
    this.setState({
      isLoading: true,
    });
    https.post(urls.getArticleDetail, {
      id: article_id,
      type: this.state.type,
    }, {
      withCredentials: true,
    }).then(res => {
      this.setState({
        isLoading: false,
      })
      if (res.status === 200 && res.data.code === 0) {
        const data = res.data.data;
        const articlemd = markdown.marked(data.content);
        articlemd.then(md => {
          data.content = md.content;
          data.toc = md.toc;
          this.setState({
            info: data,
          });
        });
        const keyword = data.keyword.join(',');
        const { desc, title } = data;
        document.title = title;
        document.getElementById('keywords').setAttribute('content', keyword);
        document.getElementById('description').setAttribute('content', desc);
      } else {
        message.error(res.data.message, 1);
      }
    }).catch (err => {
      console.log(err);
      this.setState({
        isLoading: false,
      });
      message.error('请求服务错误', 1);
    })
  }

  likeTimes({ info, likeTimes }, user_id) {
    https.post(urls.likeArticle, {
      id: info._id,
      user_id,
    }, {
      withCredentials: true
    }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        ++info.meta.likes;
        this.setState({
          likeTimes: likeTimes + 1,
          isLoading: false,
          info,
        });
      } else {
        this.setState({
          isLoading: false
        })
        message.warning(res.data.message, 1);
      }
    })
    .catch(err => {
      console.log(err);
      this.setState({
        isLoading: false,
      })
      message.error(err, 1);
    });
  }

  likeArticle = () => {
    const { _id } = this.state.info;
    if(!_id) {
      message.error('该文章不存在！', 1);
      return;
    }
    if (this.state.likeTimes > 0) {
      message.warning('您已经点过赞了', 1);
      return;
    }
    if (!window.sessionStorage.userInfo) {
      message.warning('登陆后才能点赞，请先登陆！', 1);
      return;
    }
    const userInfo = JSON.parse(window.sessionStorage.userInfo);
    const userId = userInfo._id;
    this.setState({
      isLoading: true,
    })
    this.likeTimes(this.state, userId);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleAddComment = () => {
    const { info, times, cacheTime, content } = this.state;
    if (info._id) {
      message.error('该文章不存在！', 1);
      return;
    }
    if (times > 10) {
      message.warning('您今天评论次数已经用完', 1);
      return;
    }

    const nowTime = new Date().getTime();
    if (nowTime - cacheTime < 60000 ) {
      message.warning('您评论太过频繁，1分钟后再来评论', 1);
      return;
    }

    if (!content) {
      message.warning('请输入内容！', 1);
      return;
    }
    if (!window.sessionStorage.userInfo) {
      message.warning('登陆后才能评论，请先登录！', 1);
      return;
    }

    const userInfo = JSON.parse(window.sessionStorage.userInfo);
    const user_id = userInfo._id;
    this.setState({
      isSubmitLoading: true,
    });
    https.post(urls.addComment, {
      article_id: info._id,
      user_id,
      content,
    }, {
      withCredentials: true
    }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        this.setState({
          cacheTime: nowTime,
          times: times + 1,
          isSubmitLoading: false,
          content: '',
        });
        const article_id = getQueryStringByName('article_id');
        this.handleSearch(article_id);
      } else {
        message.error(res.data.message, 1);
      }
    }).catch(err => {
      message.error('请求服务错误', 1);
      return;
    });
  }

  refresh = () => {
    const article_id = getQueryStringByName('article_id');
    this.handleSearch(article_id);
  }

  render() {
    const width = isMobile() ? '100%' : '75%';
    const { create_time, author, title, numbers, meta, tags, content, _id, comments, toc } = this.state.info;
    const tagList = tags.map(item => (
      <span key={item.id} className="tag">{item.name}</span>
    ));
    return (
      <div className="article clearfix">
        <div className="detail fl" style={{ width: width }}>
          <div className="header">
            <div className="title">{title}</div>
            <div className="author">
              <div className="avator">
                <Avatar className="ant-logo" src={logo} size={50} icon="user" />
              </div>{' '}
              <div className="info">
                <span className="name">
                  <span>{author}</span>
                </span>
                <div props-data-classes="user-follow-button-header" data-author-follow-button="">
                  <span className="meta">
                    <span className="publish-time">
                      {create_time ? timestampToTime(create_time) : ''}
                    </span>
                    <span className="wordage">字数 {numbers}</span>
                    <span className="views-count">阅读 {meta.views}</span>
                    <span className="comments-count">评论 {meta.comments}</span>
                    <span className="links-count">喜欢 {meta.likes}</span>
                  </span>
                </div>
              </div>
              <div className="tags" title="标签">
                <Icon type="tags" theme="twoTone" />{tagList}
              </div>
              <span className="clearfix" />
            </div>
          </div>
          {this.state.isLoading ? <Loading/> : ''}
          <div className="content">
            <div
              id="content"
              className="article-detail"
              dangerouslySetInnerHTML={{
                __html: content ? content : null,
              }}
            />
          </div>
          <div className="heart">
            <Button type="danger" size="large" icon="likes" loading={this.state.isLoading} onClick={this.likeArticle}>点赞</Button>
          </div>
          <Comment
            content={content}
            isSubmitLoading={this.state.isSubmitLoading}
            handleChange={this.handleChange}
            handleAddComment={this.handleAddComment}
          />
          <CommentList
            numbers={meta.comments}
            list={comments}
            article_id={_id}
            refreshArticle={this.refresh}
          />
        </div>
        {isMobile() ? ('') : (
          <div
            style={{ width: '23%' }}
            className="article-right fr anchor"
            dangerouslySetInnerHTML={{
              __html: toc ? toc : null,
            }}
          />
        )}
      </div>
    )
  }
}

export default ArticleDetail;
