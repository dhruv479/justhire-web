import api from './index';
import URL from '../constants/url';

export default {
  registerUser: payload => api().post(URL.REGISTER_USER, payload),
  loginUser: payload => api().post(URL.LOGIN_USER, payload)
};
