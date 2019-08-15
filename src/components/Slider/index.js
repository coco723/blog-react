import './index.less';
import logo from '../../assets/profile.jpeg';
import BiaoChenXuYing from '../../assets/BiaoChenXuYing.png';
import React, { Component } from 'react';
import { Avatar, message } from 'antd';
import { Link } from 'react-router-dom';
import https from '../../utils/https';
import urls from '../../utils/urls';

class SliderRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      keyword: '',
      type: 2, //1 :其他友情链接 2: 是管理员的个人链接 ,‘’ 代表所有链接
      pageNum: 1,
      pageSize: 50,
      list: [],
      linkList: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.handleSearch();
    // this.loadLink();
  }

  handleSearch = () => {
    https
      .get(urls.getTagList, {
        params: {
          keyword: this.state.keyword,
          pageNum: this.state.pageNum,
          pageSize: this.state.pageSize,
        },
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            list: res.data.data.list,
          });
        } else {
          message.error(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleClick(event) {
    this.setState({
      //   [event.target.name]: event.target.value
    });
  }
  render() {
    const list = this.state.list.map((item, i) => (
      <Link
        className="item"
        key={item._id}
        to={`/articles?tag_id=${item._id}&tag_name=${item.name}&category_id=`}
      >
        <span key={item._id}>{item.name}</span>
      </Link>
    ));

    return (
      <div className="right">
        <Avatar className="right-logo" src={logo} size={130} icon="user" />
        <div className="title">coco</div>
        <div className="right-content">
        </div>
        <div className="tags">
          <div className="title">标签云</div>
          {list}
        </div>
        <div className="introduce">
          <div className="title">本站公众号</div>
          <div className="content">
            分享 WEB 全栈开发等相关的技术文章，热点资源<br />
            全栈程序员的成长之路
            <img style={{'width':'100%',marginTop: '20px'}} src={BiaoChenXuYing} alt="公众号" />
          </div>
        </div>
      </div>
    );
  }
}

export default SliderRight;
