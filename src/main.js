// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'

import 'common/js/base'
import 'common/stylus/index.styl'
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./common/img/default.jpg'),
  loading:  require('./common/img/default.jpg'),//'http://img3.imgtn.bdimg.com/it/u=3958473360,317897763&fm=11&gp=0.jpg',
  // attempt: 1
})


//引入 mint-ui
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css';
Vue.use(Mint)



//引 axios
import  Axios from 'axios';
Vue.prototype.$http = Axios;
//设置默认URL请求基础路径
Axios.defaults.baseURL = 'http://www.scjksm.com/scjkSvn/Home/';
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/* eslint-disable no-new */

// 轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { format } from 'path';
Vue.use(VueAwesomeSwiper)

//获取cookie、
function getCookie(name) {
  var name = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}
//设置cookie,增加到vue实例方便全局调用
function setCookie(cname, value, expiredays) {
  var d = new Date();
  d.setTime(d.getTime() + (expiredays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  //console.info(cname + "=" + value + "; " + expires);
  document.cookie = cname + "=" + value + "; " + expires;
 // console.info(document.cookie);
};
//删除cookie
function delCookie (name) {
  this.setCookie(name, "", -1);
};
Vue.prototype.setCookie = setCookie;
Vue.prototype.getCookie = getCookie;
Vue.prototype.delCookie = delCookie;

Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  },
})  

// 购物车 第一次今日缓存，其余刷新
router.afterEach((to, from) => {
  // console.log(to)
  // console.log(from)
  let isRefresh =  sessionStorage.getItem('Refresh')
  if(to.name== 'cart' && from.name == 'index') { 
   
    if(isRefresh == '1'){
     router.go(0)
      // window.location.reload()
    }else{
      sessionStorage.setItem('Refresh',1);
    }
  }else if(to.name== 'cart' && from.name == 'id'){
    if(isRefresh == '1'){
      router.go(0)
    }else{
      sessionStorage.setItem('Refresh',1);
    }
  }else if(to.name== 'cart' && from.name == 'login'){
    sessionStorage.setItem('isRefresh',1);
    if(isRefresh == '1'){
      router.go(0)
    }
  }else if(to.name== 'cart' && from.name == 'member'){
    if(isRefresh == '1'){
      router.go(0)
    }else{
      sessionStorage.setItem('Refresh',1);
    }
  }
  // ...
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
