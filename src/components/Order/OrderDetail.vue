<template>
  <transition name="slide">
    <div class="order-detail">
        <mt-header title="订单详情">
            <span to="" slot="left"  @click="goBack">
                <mt-button icon="">
                    <i class="iconfont icon-fanhui"></i>
                </mt-button>
            </span>        
        </mt-header>
         
        <div class="content" >
            <div class="succeed">{{$route.params.id == 1? '订单交易中': '订单完成'}}</div>
            <div class="goods-type" v-if="addressData<=0">
                收货方式
                <span>上门自提</span>
            </div>
            
        </div>
        <div class="address" v-if=" addressData.length >0">
          
            <h2 class="address-name"> {{addressData[0].consigneeName}} <span> {{addressData[0].consigneePhone}}</span>   </h2>
            <p class="address-desc">
                <i class="iconfont icon-icon2"></i>
                {{ addressData[0].addressRegion }}{{ addressData[0].addressDetail }}
            </p>
             
        </div>
        <div class="goods-wrap">
             <div class="cart-wrap" >
                <div class="shop">
                    <div class="shop-icon list">
                        <i class="iconfont icon-guanzhudianpu"></i>
                    </div>
                    <div class="shop-name list">
                        <router-link :to="{name:'shop',params:{shopId:this.$route.query.shopId}}" class="name">{{shopData.shopName}}</router-link>
                    </div>
                </div>
                <div class="group" v-for="goods in orderData" :key="goods.goodsId">
                    <div class="group-detail">
                        <div class="item-img">
                            <img :src="goods.goodsPhoto" alt="">
                        </div>
                        <div class="item-info">                            
                            <p class="title">{{goods.goodsName}}</p>
                            <p class="specification">
                                <span class="text">规格：{{goods.goodsSpecification}}</span>
                                <span class="box">
                                   x{{goods.goodsCount}}
                                </span>
                            </p>
                            <p class="price">采购价：￥{{goods.goodsPrice}} </p>
                            
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
        <div class="content">
            <p>订单编号：{{numberData.orderNumber}}</p>
            <p>订单时间：{{orderTime}}</p>
            <p class="invoice">发票类型：{{numberData.invoiceType}}</p>
            <p class="invoice">发票抬头：{{numberData.invoiceName}}</p>
            <p class="invoice" v-show="isShow">纳税人号：{{numberData.taxpayerNumber}}</p>
            <p class="invoice">发票内容：商品明细</p>

        </div>
        <div class="goods-total">
            商品总额：
            <span>￥{{numberData.goodsPriceTotal}}</span>
        </div>
    </div>
  </transition>
    
</template>
<script>
  import { getOrderDetail } from 'common/api'
     export default {
         data() {
             return {
                numberData: {},
                shopData: {},
                orderData: [],
                orderNumber: '',
                orderTime:'',
                isShow: false,
                addressData: []

             }
         },
          created(){
            this.userCode = this.getCookie('userCode')
            if(this.userCode){
                this.getDetailData();
            }else{
                this.$router.push({
                    name: 'member'
                })
            }
           
        },
         computed: {
        },
        methods: {
            async getDetailData(){
               let {data: res} = await getOrderDetail({userCode:this.userCode,orderNumber:this.$route.query.order,shopId:this.$route.query.shopId});
             
                if(res.flag == 'success'){
                    this.numberData = res.data.numberData[0];
                    this.orderData = res.data.orderData;
                    this.shopData = res.data.shopData[0];
                    if(res.data.addressData){
                        this.addressData = res.data.addressData
                    }
                    if(this.$route.params.id == 1){
                            this.orderTime = this.orderData[0].addTime;
                    }else{
                            this.orderTime = this.orderData[0].takeTime;
                    }
                    if(this.numberData.taxpayerNumber === 'undefined'){
                        this.isShow = false;
                    }else{
                            this.isShow = true;
                    }
                }
               
            },
            goBack(){
                this.$router.go(-1)
            }
        }
     }
</script>
<style lang="stylus" scoped>
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
    .order-detail
        position fixed
        top:0
        left 0
        right 0
        bottom 0
        width 6.4rem
        margin 0 auto
        background #ffffff
        z-index 9999999
        overflow auto
        
        .mint-header
            background #f5f5f5;
            color #000
            font-size 18px
            .mint-header-button 
                .iconfont 
                    font-size 20px
                .mint-header-title
                        font-weight bold
        .address 
            padding .2rem .15rem
            overflow hidden
            position relative
            font-size .2rem
            .address-name
                font-size .26rem
                padding-left .3rem
                line-height .38rem
                span    
                    padding-left .2rem
            .address-desc
                font-size .2rem
                line-height .38rem
                color #999
                i 
                    font-size .22rem
                    padding-right 0.05rem
        .content
            color #000
            .succeed
                height 1.2rem
                background #dc143c
                color #ffffff
                text-align center
                line-height 1.2rem
                font-size .26rem
            .goods-type
                padding 0 .15rem
                height 1rem
                line-height 1rem
                font-size .24rem
                span 
                    float right 
                    height 1rem
                    line-height 1rem
                    padding-right .1rem
            p
                color #787878  
                padding  .2rem  
                font-size .24rem
                &.invoice
                    padding  .15rem      
        .goods-total
            margin-top .2rem
            font-weight bold
            font-size .24rem
            padding 0 .15rem
            border-bottom 1px solid #ccc
            line-height .5rem
            span 
                float right 
                line-height .5rem
                color #ff0000

        .goods-wrap            
            .cart-wrap
                .shop
                    overflow hidden
                    background #e4e4f6
                    height .6rem
                    line-height .6rem 
                    .list
                        float left       
                    .shop-icon                 
                        margin 0 .1rem
                        i 
                            font-size 0.32rem
                            color #707070
                    .shop-name  
                        width 5rem 
                        font-size .24rem       
                        .name 
                            color #000000   
                            font-weight bold
                            
                .group
                    overflow hidden
                    .group-detail
                        float left
                        width 6.4rem                      
                        .item-img
                            width 1.5rem
                            height 1.5rem
                            margin  .2rem
                            float left
                            img 
                                width 100%
                                height 100%
                        .item-info
                            float left
                            width 4.5rem
                            
                            .title
                                padding .2rem 0
                                font-size .24rem
                                font-weight bold
                            .specification
                                font-size .2rem
                                color #787878
                                position relative
                                padding .2rem 0

                                span 
                                    
                                    display inline-block
                                    &.text
                                        line-height .3rem
                                    &.box
                                        float right
                                        padding 0 .2rem
                                        font-size .24rem
                            .price
                                font-size .2rem
                                color #ff0000
                                position relative
                                padding .1rem 0




</style>
