

import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userCode: '',
    userLevel: '',
    cartCount: 0
  },
 
  mutations: {
    getUserCode(state,value){
      localStorage.setItem('key',value);
   
      state.userCode = value;
    

    },
    getUserLevel(state,value){
      localStorage.setItem('key2',value);
      state.userLevel = value
    },
    delUserInfo(state,value){
      localStorage.clear();
      state.userCode =value;
      state.userLevel = value

    },

    updateCartCount(state,cartCount){
      state.cartCount += cartCount;
      localStorage.setItem('num', state.cartCount);
    },
    initCartCount(state,cartCount){
      localStorage.setItem('num',cartCount);
      state.cartCount = cartCount;

    }
  }
})