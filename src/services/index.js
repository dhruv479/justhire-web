import Axios from 'axios';
import Vue from 'vue';

const instance = Axios.create({
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('sid')}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

instance.interceptors.request.use(
  config => {
    if (localStorage.getItem('sid')) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ` + localStorage.getItem('sid');
    }
    return config;
  },
  error => {
    // Do something with request error
    Vue.$log.error(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    // Do something with response data
    return response;
  },
  error => {
    // Do something with response error
    if (error.response.status === 401) {
      localStorage.removeItem('sid');
      location.reload();
    }
    Vue.$log.error(error);
    return Promise.reject(error);
  }
);

export default () => instance;
