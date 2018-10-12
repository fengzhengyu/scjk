// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'

import 'common/js/base'
import 'common/stylus/index.styl'
Vue.config.productionTip = false

//引入 mint-ui
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css';
Vue.use(Mint)

Vue.use(VueLazyload, {
  loading: require('common/img/default.jpg')
})
//
//引 axios
import  Axios from 'axios';
Vue.prototype.$http = Axios;
//设置默认URL请求基础路径
Axios.defaults.baseURL = 'http://www.scjksm.com/scjkSvn/Home/';
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/* eslint-disable no-new */




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


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
