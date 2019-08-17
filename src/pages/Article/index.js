import React, { Component } from 'react';
import { getQueryStringByName } from '../../utils/utils';


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
      articlesList: [],
      total: 0,
    };
  }


  render() {

    return (
      <div className="left">
        {}
      </div>
    );
  }
}

export default Articles;
