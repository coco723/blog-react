import React, { Component } from "react";

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

  }

  render() {
    return (
      <div></div>
    )
  }

}

export default Project;