import React, { Component } from "react";

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

  // componentDidMount() {
  //   this.handleSearch();
  // }

  render() {
    return (
      <div></div>
    )
  }
}

export default Archive;