

import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    cartCount: 0
  },
  getters:{
    getStorage(state){
      return state.user = JSON.parse(localStorage.getItem('key'))
    }
  },
  mutations: {
    getUserInfo(state,value){
      localStorage.setItem('key',JSON.stringify(value));
      state.user = value;

    },
    updateCartCount(state,cartCount){
      state.cartCount += cartCount;
    },
    initCartCount(state,cartCount){
      state.cartCount = cartCount;

    }
  }
})