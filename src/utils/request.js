import axios from 'axios';
import { message } from 'antd';

let service = null;
if (process.env.NODE_ENV === 'development') {
  service = axios.create({
    baseURL: '/api',
    timeout: 50000,
  });
} else {
  service = axios.create({
    baseURL: '/api',
    timeout: 50000,
  });
}


service.interceptors.request.use(
  config => {
    console.log('config = = =', config);
    return config;
  },
  error => {
    console.error('interceptors request with error:', error);
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  response => {
    console.log('response = ', response);
    if (response.status === 200 && response.data.code === 0) {
      return response.data.data;
    }
    message.error(response.data.message);
  },
  error => {
    console.error('interceptors response with error:' + error); // for debug
    return Promise.reject(error);
  },
);

export default service;
