import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from 'page/Index.vue'
import Cart from 'page/Cart.vue'
import Member from 'page/Member.vue'
import Password from 'components/Member/Password'
import Collect from 'components/Member/Collect'
import MyOrder from 'components/Member/MyOrder'
import Goods from 'page/Goods.vue'
import Shop from 'page/Shop.vue'
import GoodsDetail from 'components/Goods/GoodsDetail'
import OrderWrite from 'components/Order/OrderWrite'
import OrderDetail from 'components/Order/OrderDetail'
import Login from 'components/Member/Login'
import Search from 'components/Index/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      // children: [
      //   {
      //     path: ':goodsId',
      //     name: 'id',
      //     component: GoodsDetail
      //   }
      // ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/member',
      name: 'member',
      component: Member,
      children: [
        {
          path: 'pwd',
          name: 'password',
          component: Password
        },
        {
          path: 'collect',
          name: 'collect',
          component: Collect
        },
        {
          path: 'myorder/:id',
          name: 'myorder',
          component: MyOrder,
          children: [
            {
              path: 'detail',
              name: 'orderdetail',
              component: OrderDetail
            },
          ]
        }
      ]
    },
    {
      path: '/goods/:id',
      name: 'goods',
      component: Goods,
      // children: [
      //   {
      //     path: ':goodsId',
      //     name: 'goodsId',
      //     component: GoodsDetail
      //   }
      // ]
    },
    {
      path: '/goodsId/:goodsId',
      name: 'id',
      component: GoodsDetail
    },
    {
      path: '/order',
      name: 'order',
      component: OrderWrite
           
    },
    {
      path: '/shop/:shopId',
      name: 'shop',
      component: Shop

    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})
