import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { user } from './models/user';
import { articles } from './models/articles'

const rootReducer = history =>
  combineReducers({
    user,
    articles,
    router: connectRouter(history),
  })

export default rootReducer;
