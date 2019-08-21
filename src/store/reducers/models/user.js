import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../../types';

const initState = {
  userInfo: {
    avatar: '',
    create_time: '',
    email: '',
    id: '',
    img_url: '',
    introduce: '',
    name: '',
    password: '',
    phone: '',
    type: '',
    update_time: '',
    __v: 0,
    _id: '',
  },
  message: '',
  refresh: 1,
}

export function user(state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload.data,
        message: action.payload.message,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        userInfo: '',
        message: action.payload
      }
    default:
      return state;
  }
}