<template>

    <div class="payment">
        <div class="header">
            <mt-header title="我的订单">
                <span to="" slot="left" @click="$router.push({path: '/member'})">
                    <mt-button icon="">
                        <i class="iconfont icon-fanhui"></i>
                    </mt-button>
                    
                </span>   
            </mt-header>    
            <div class="tabs">
                <div class="tab-list" :class="{'active':$route.params.id ==1}" @click="goJump(1),getPayList()">
                    <span class="line">已支付</span>
                </div>
                <div class="tab-list"  :class="{'active':$route.params.id == 2}" @click="goJump(2), getFinishData()">
                    <span class="line">已完成</span>

                </div>
            </div>
           
        </div>
         <div class="line"></div>
         <div 
             v-if="isLoad"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
         >
            <div class="content-list" v-for="(item,index) in orderList" :key="index" >
                <div class="shop">
                    <div class="shop-icon list">
                        <i class="iconfont icon-guanzhudianpu"></i>
                    </div>
                    <div class="shop-name list">
                    <router-link :to="{name:'shop',params:{shopId:item.shopId}}" class="name">{{item.shopName}}</router-link>
                    </div>
                    <div class="delete-icon" v-show="$route.params.id ==2" @click="deleteOrder(item)">
                        <i class="iconfont icon-shanchu"></i>
                    </div>
                </div>
                <div class="group" v-for="goods in item.orderList" :key="goods.goodsId">
                    <div class="group-detail" @click="goOrderDetail(goods)">
                        <div class="item-img" >
                            <img v-lazy="goods.goodsPhoto" :key="goods.goodsPhoto" >
                        </div>
                        <div class="item-info">
                        
                            <p class="title">{{goods.goodsName}}</p>
                            <p class="specification">
                            <span class="text">规格：{{goods.goodsSpecification}}</span>
                            <span class="box">x{{goods.goodsCount}}</span>

                            </p>
                            <p class="price">采购价：￥{{goods.goodsPrice}} <span class="store" v-show="$route.params.id ==2">已完成</span></p>
                            
                        </div>
                    </div>
                    
                </div>
                <div class="price-total"  v-show="$route.params.id ==1">
                        <div class="total">
                            实付款：<span class="color">￥{{ item.orderList[item.orderList.length -1].goodsPriceTotal }}</span>
                        </div> 
                        <div class="btn" @click="confirmOrder(item)">
                            确认收货
                        </div>

                    </div>
            </div>
         </div>
        
        <div class="no-order" v-if="orderList.length<=0">暂无订单！</div>
        <div v-else>
            <div class="ladding" v-if="!loading">
                <img src="../../common/img/loading-svg/loading-spinning-bubbles.svg"> &nbsp; 加载中...
            </div>
            <div class="ladding" v-else>
                您已经到底了
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import {getPayData , getConfirmOrder, delOrderData } from 'common/api'
export default {
    data() {
        return {
            userCode : '',
            orderList: [],
            page:1,
            isLoad: false,
            end:false,//
            loading:true,
        }
    },
    created(){
       
        this.userCode = this.getCookie('userCode')
        if(this.userCode){
            if(this.$route.params.id == 1){
                this.getPayList()
            }else{
                this.getFinishData()
            }
        }
       
    },
    computed: {
      
    },
    methods: {
        goJump(id){
            this.$router.push({
                name: 'myorder',
                params: {id:id}
            })
        },
        //已支付
        async getPayList(){
            this.page =1;  
            
            let {data:res} = await  getPayData({userCode: this.userCode,orderStatus:this.$route.params.id,page:this.page});
            if(res.flag == 'success'){
                this.orderList = res.orderList;
                this.isLoad = true;
                if(res.msg == '已到底部'){
                    this.loading = true;
                    this.end = true;
                }else{
                    this.loading = false;
                }
                
               
            }

        },
        //已完成
        async getFinishData(){
            this.page =1;  
            
            let {data:res} = await  getPayData({userCode: this.userCode,orderStatus:this.$route.params.id,page:this.page});
             if(res.flag == 'success'){
                this.orderList = res.orderList;
                this.isLoad = true;
                if(res.msg == '已到底部'){
                    this.loading = true;
                    this.end = true;
                }else{
                    this.loading = false;
                }
            }
        },
        //上啦加载
        loadMore(){
            this.loading = true;
            alert(1)
            setTimeout(()=>{
                this.page++;
               
                getPayData({userCode: this.userCode,orderStatus:this.$route.params.id,page:this.page}).then((response)=>{
                    let res = response.data;
                    console.log(res)
                    if(res.flag == 'success'){
                        this.orderList = res.orderList;
                    
                        if(res.msg == '已到底部'){
                            this.end = true;
                            this.loading = true;
                            
                        }else{
                            this.loading = false;
                        }
                    }
                    
                });
               


            },300)

        },
        
        //查看详情
        goOrderDetail(goods){
            this.$router.push({
                name: 'orderdetail',
                query: {order:goods.orderNumber,shopId:goods.shopId}
            })
        },
        //确认收货
        confirmOrder(item){
            getConfirmOrder({userCode: this.userCode,orderNumber:item.orderNumber,shopId:item.shopId}).then((response) => {
                let res = response.data;
                if(res.flag == 'success'){
                        this.$toast({
                            message: res.info,
                            position:'middle',
                            duration: 3000
                        });
                        this.getPayList()
                    }else{
                        this.$toast({
                            message: res.info,
                            position:'middle',
                            duration: 3000
                        });
                    }
            })
            
        },
        //删除订单
        deleteOrder(item){
            delOrderData({userCode: this.userCode,orderNumber:item.orderNumber,shopId:item.shopId}).then((response) => {
                let res = response.data;
                if(res.flag == 'success'){
                    this.$toast({
                        message: res.info,
                        position:'middle',
                        duration: 3000
                    });
                    this.getFinishData()
                }else{
                    this.$toast({
                        message: res.info,
                        position:'middle',
                        duration: 3000
                    });
                }
            },(err)=>{console.log(err)})   
        }
       
    }
}
</script>
<style lang="stylus" scoped>
    .payment
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        width 6.4rem
        margin 0 auto
        background #fff
        overflow-y auto
        z-index 665
        
        .header
            position fixed
            top 0
            right 0
            left 0
            background #fff
            z-index 666
            width 6.4rem
            margin 0 auto
            .mint-header
                background #fff;
                color #000
                font-size 18px
                .mint-header-button 
                    .iconfont 
                        font-size 20px
                    .mint-header-title
                        font-weight bold  
            .tabs
                display flex
                .tab-list
                    flex 1
                    height .6rem
                    text-align center
                    line-height .6rem
                    font-size .24rem
                    border-bottom 1px solid #aaaaaa
                    color #111111
                    .line
                        display inline-block
                        height .58rem
                        padding 0 .1rem
                    
                    &.active
                        color #ff0000
                        .line
                            border-bottom 2px solid #ff0000
        .line
            margin-bottom 1.3rem

        .content-list
            
            .shop
                overflow hidden
                background #e4e4f6
                height .6rem
                line-height .6rem 
                .list
                    float left
                .shop-icon
                    height .6rem
                    margin 0 .1rem 0 .25rem
                    i 
                        font-size 0.36rem
                        color #707070
                .shop-name  
                    width 4rem 
                    font-size .24rem
                    .name 
                        color #010101  
                      
                .delete-icon
                    float right  
                    padding 0 .25rem  
                    height .6rem
                    i   
                        font-size 0.3rem
                        color #707070   
            .group
                .group-detail
                    width 6.4rem
                    overflow hidden
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
                        width 4.3rem
                        .title
                            padding .2rem 0
                            font-size .24rem
                            font-weight bold
                            overflow hidden
                            text-overflow ellipsis 
                            white-space nowrap
                        .specification
                            font-size .2rem
                            color #787878
                            position relative
                            padding .15rem 0
                            overflow hidden
                            text-overflow ellipsis 
                            white-space nowrap  
                            .box
                                float right
                                font-size .24rem    
                        .price
                            font-size .2rem
                            color #ff0000
                            position relative
                            padding .15rem 0
                            .store
                                position absolute 
                                bottom 0
                                right  0
                                color #ff0000
                                font-weight 700       
            .price-total
                height .5rem
                line-height .5rem 
                text-align right

                .total
                    
                    display inline-block
                    font-size .2rem
                    color #787878
                    vertical-align top
                    .color 
                        color #f00
                .btn
                    display inline-block
                    width 1rem
                    height .38rem
                    text-align center
                    border 1px solid #f00
                    line-height .38rem
                    color #f00
                    margin 0 .15rem
        .no-order
            text-align center
            font-size .24rem
            color #000
            height 3rem
            line-height 3rem
        .ladding
            text-align center
            line-height .6rem
            height .6rem
            font-size .24rem
            margin .15rem 0
            img 
                display inline-block
                vertical-align middle


</style>    


