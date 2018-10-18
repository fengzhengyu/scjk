<template>
    <div class="cart-home">
        
        <mt-header  title="购物车" fixed>
            <router-link to="/" slot="left">
                <mt-button icon="">
                    <i class="iconfont icon-fanhui"></i>
                </mt-button>
            </router-link>
            <mt-button icon="" slot="right" v-show="userCode" @click="deleteFlag = !deleteFlag">{{deleteFlag == true?'完成':'编辑'}}</mt-button>
        </mt-header>

        <CartList :deleteStatus="deleteFlag" v-show="userCode" :goodsList="cartList" :checkAllState="checkAllFlag" :isLoad="isLoad" :userCode="userCode" @deleteSucceed="getDeleteMsg"></CartList>  
        

        <div class="empty-cart" v-show="!userCode">
            <div class="icon">
                <i class="iconfont icon-gouwuche1"></i>
            </div>
            <h2>登录后可同步购物车中商品</h2>
            <div class="go-home">
                <span @click="$router.push({name: 'login'})">去登录</span>
            </div>
        </div>
        <!-- <Footer></Footer> -->
    </div>
</template>
<script>
 import {getCartData} from 'common/api'
 import Footer from 'components/common/Footer.vue'
 import CartList from 'components/Cart/CartList.vue'
 export default {
     data(){
         return {
             deleteFlag:false,
             userCode: '',
             cartList:[],
             isLoad: false,
             checkAllFlag: false,
         }
     },
     created(){
        //   this.userCode = this.getCookie('userCode');
           this.userCode = this.getCookie('userCode')
            this.$indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            })
             this.getCartList();
           
     },
     methods: {
            async getCartList(){
                let {data:res} = await getCartData({userCode:this.userCode});
              
                this.$indicator.close();
                 this.isLoad = true
                if(res.flag == 'success'){
                    this.cartList  = res.data;
                  
                }else{
                     this.cartList = []
                }
                
            },
            getDeleteMsg(){
                  this.getCartList();
            }
     },
      beforeRouteLeave(to, from, next) {
          console.log(to)
          console.log(from)
          if(to.name == 'index'){
              from.meta.keepAlive = false;
               this.getCartList();
               this.checkAllFlag = true;
              next();
          }
         next()
                
            
         },
     components: {
         CartList,
         Footer
     }
 }
    
</script>
<style lang="stylus" scoped>
.cart-home
    
    background #fff
    .mint-header
        width 6.4rem
        margin 0 auto
        background #ffffff;
        color #000
        font-size 18px
        .mint-header-button
            .iconfont 
                font-size 20px
            .mint-header-title
                font-weight bold
    .empty-cart
        padding-top 40px
        text-align center
        .icon
            padding-top .5rem
            i 
                font-size 2rem
                color #e93b3d
        h2
            font-weight bold
            font-size .26rem
            color #222
            padding .3rem 0
        .go-home
            span
                width  1.5rem 
                border: 1px solid #e4393c;
                color: #e4393c;
                text-decoration: none;
                text-align: center;
                display: inline-block;
                border-radius: 4px;
                line-height: .4rem;
                -webkit-appearance: none;
</style>
