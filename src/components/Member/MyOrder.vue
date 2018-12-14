<template>
  <transition name="slide">  
    <div class="my-order">
        <div class="header">
             <div class="member-header">
                <div class="back" @click="$router.go(-1)">
                <i class="iconfont icon-fanhui2"></i>
                </div>
                <div class="text" >我的订单</div> 
            </div>
            <div class="tabs border-bottom">
                <div class="tab-list active"  :class="{'active':$route.params.id ==1}" @click="goJump(1),getPayList()">
                    <span class="line">全部</span>
                </div>
                <div class="tab-list"  :class="{'active':$route.params.id == 2}" @click="goJump(2), getFinishData()">
                    <span class="line">待付款</span>

                </div>
                <div class="tab-list" :class="{'active':$route.params.id ==1}" @click="goJump(1),getPayList()">
                    <span class="line">待发货</span>
                </div>
                <div class="tab-list"  :class="{'active':$route.params.id == 2}" @click="goJump(2), getFinishData()">
                    <span class="line">待收货</span>

                </div>
               
                <div class="tab-list"  :class="{'active':$route.params.id == 2}" @click="goJump(2), getFinishData()">
                    <span class="line">已完成</span>

                </div>
            </div>
           
           
        </div>
        <div class="line-wrapper"></div>
       <ul class="order-list" >
           <li class="border-bottom" v-for="(item,index) in orderList">
               <div class="img-wrap">
                   <!-- <img :src="" > -->
               </div>
               <div class="desc-wrap">
                   <h2 class="title">百瑞源宁夏枸杞子正宗头茬枸杞特枸...         </h2>
                   <p class="num">商品共计 8件</p>
                   <p class="time">2018-11-22 12:22            </p>
                   <div class="status">
                       <span>已完成</span>
                   </div>
               </div>
           </li>
       </ul>
        <!-- <div class="empty">
            <div class="bg"></div>
            <div class="text">你还没有相关订单！</div>
            <div class="btn">去采购喽</div>
        </div> -->
        
    </div>
  </transition>  
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
          this.getPayList()
        // if(this.userCode){
        //     if(this.$route.params.id == 1){
        //         this.getPayList()
        //     }else{
        //         this.getFinishData()
        //     }
        // }
       
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
         
            let {data:res} = await  getPayData({userCode: this.userCode,orderStatus:1,page:this.page});
           
            if(res.flag == 'success'){
                this.orderList = res.orderList;
                 console.log(this.orderList)
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
.slide-enter-active, .slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
.my-order
    position absolute
    top 0
    bottom 0
    width 6.4rem
    margin 0 auto
    background #fff
    
    .header
        position fixed
        top 0
        background #fff
        z-index 666
        width 6.4rem

        .member-header
            height .8rem
            line-height .8rem
            overflow hidden
            color #fff
            background #ff6600
            div
                float left
            .back
                width .8rem
                text-align center
                
                i 
                    font-size .3rem
                    color #fff
            .text 
                font-size .26rem
        .tabs
            display flex
            height .8rem
            align-items center
            justify-content center
            background #f3f4f6
            box-sizing border-box;
            .tab-list
                flex 1
                padding  .28rem 0
                font-size .24rem
                text-align center
                color #6a6a6a      
                &.active
                    border-bottom .03rem solid #ff0000
    .line-wrapper
        height 1.6rem                
    .empty 
        padding .8rem 0 0 0
        text-align center
        .bg
           margin 0 auto 
           width 2.24rem
           height 2.07rem
           background url('../../common/img/order-no.png') 
           background-size 100% 100%
        .text
           color #919192
           font-size .18rem
           padding .4rem 0
        .btn
            width 2rem
            border .03rem solid #ff6600   
            margin 0 auto 
            font-size .2rem
            color #ff6600
            padding .15rem 0
            line-height normal
            border-radius .1rem
    .order-list
        li 
            padding  .3rem
            display flex
            .img-wrap
                flex 0 0 1.25rem
                height 1.25rem
                img 
                    width 100%
                    height 100%
            .desc-wrap
                flex 1
                padding-left .3rem
                .title
                    color #202020
                    font-size .22rem
                p 
                    color #939393    
                    font-size .2rem
                    padding-top .2rem
                .num
                    color #939393
                .time
                    font-size .18rem
                .status 
                    font-weight bold
                    font-size .22rem
                    color #202020    
                    text-align right
                    span 
                        padding-left .2rem



    

        


</style>    


