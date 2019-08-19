import './index.less';
import logo from '../../assets/userLogo.jpeg';
import React, { Component } from 'react';
import { Avatar, message } from 'antd';
import { Link } from 'react-router-dom';
import request from '../../utils/request';
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
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    const params = {
      keyword: this.state.keyword,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    }
    const data = request(urls.getTagList, { params });
    this.setState({
      list: data.list,
    });
  };

  handleClick = e => {
    this.setState({
      //   [event.target.name]: event.target.value
    });
  }
  render() {
    const { list = [] } = this.state;
    list.map(item => (
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
      </div>
    );
  }
}

export default SliderRight;
