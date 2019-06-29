import { combineReducers } from 'redux';
import { user } from './models/user';
import { connectRouter } from 'connected-react-router';

const reducer = (history) => 
  combineReducers({
    user,
    router: connectRouter(history)
  });
  
export default reducer;