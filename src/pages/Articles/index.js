import { Component } from "react";
import {} from '../../utils/utils';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class Articles extends Component {
  state = {
    tag_id: getQueryStringByName('tag_id'),
    tag_name: decodeURI(getQueryStringByName('tag_name')),
    isLoading: false,
    isLoadEnd: false,
    articleList: [],
  }
  render() {
    const list = this.state.articleList.map((item, i) => (
      <ReactCSSTransitionGroup
        key={item._id}
        transitionName='example'
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
      >
        <li key={item._id} className="have-img">
          <a className="wrap-img" href="/" target="_blank">
            <img 
              className="img-blur-done"
              data-src={item.img_url}
              data-has-lazy-src="false"
              src={bg}
              alt="文章封面"
            />
          </a>
        </li>
      </ReactCSSTransitionGroup>
    ))
    return (
      <div className="left">
        { this.state.tag_id ? (
          <h3 className="left-title">{this.state.tag_name} 相关的文章：</h3>
        ) : (
          ''
        )}
        <ul className="note-list" id="list">{list}</ul>
        { this.state.isLoading ? <LoadingCom /> : '' }

      </div>
    )
  }
}

export default Articles;