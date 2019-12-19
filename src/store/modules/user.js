/* eslint-disable no-empty-pattern */
import Vue from 'vue';
import UserService from '@/services/user';
import utils from '../../utils';

export const user = {
  state: {
    user: {},
    isAuthenticated: false
  },
  getters: {
    getUser: state => state.user,
    getUserAuth: state => state.isAuthenticated
  },
  mutations: {
    setUserAuth(state, value) {
      state.isAuthenticated = value;
    }
  },
  actions: {
    registerUser: ({}, payload) => {
      UserService.registerUser(payload)
        .then(response => {
          console.log(Vue, response);
          Vue.$toast.success(response.data.message);
        })
        .catch(error => {
          Vue.$log.error(error);
        });
    },
    loginUser: ({commit}, payload) => {
      return UserService.loginUser(payload)
        .then(response => {
          localStorage.setItem('sid', response.data.token);
          Vue.$toast.success(response.data.message);
          commit('setUserAuth', true);
          return utils.getUserType();
        })
        .catch(error => {
          Vue.$log.error(error);
        });
    },
    logout: ({commit}) => {
      localStorage.clear();
      commit('setUserAuth', false);
      location = '/';
    }
  }
};
