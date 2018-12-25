

import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userCode: '',
    userLevel: '',
    cartCount: 0,
    addressItem: null
  },
 
  mutations: {
    // 保存登录状态
    getUserCode(state,value){
      localStorage.setItem('key',value);
      state.userCode = value;
    },
    // 保存登录级别
    getUserLevel(state,value){
      localStorage.setItem('key2',value);
      state.userLevel = value
    },
    // 退出登录状态
    delUserInfo(state,value){
      localStorage.clear();
      state.userCode =value;
      state.userLevel = value

    },
    //跟新购物车数量 
    updateCartCount(state,cartCount){
      state.cartCount += cartCount;
      localStorage.setItem('num', state.cartCount);
    },
    // 初始化购物车数量
    initCartCount(state,cartCount){
      localStorage.setItem('num',cartCount);
      state.cartCount = cartCount;

    },
    getAddressItem(state,value){
      state.addressItem = value;
    }
  }
})