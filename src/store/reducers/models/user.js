import {
  LOGIN_SUCCESS,
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



export const user = (state = initState,  action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload.data,
        message: action.payload.message,
      };
    default:
    return state;
  }
}