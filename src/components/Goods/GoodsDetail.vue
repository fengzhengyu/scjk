<template>
    <transition name="slide">
        <div class="detail">
            <mt-header title="商品详情" fixed>
                <span to="" slot="left" @click="back">
                    <mt-button icon="">
                        <i class="iconfont icon-fanhui"></i>
                    </mt-button>
                </span>        
            </mt-header>
            <div class="img-wrap">
                <img :src="goodsDetailPhotos" alt="">
            </div>
            <h1 class="goods-name">{{goods.goodsName}}</h1>
            <p class="info">{{goods.goodsSpecification}}</p>
            <p class="info">{{goods.goodsRetailPrice}}</p>
            <p class="info">
                <span  v-if="userCode" class="price">{{goods.goodsProcurementPrice}}</span>
                <span class="show" v-else @click="show($event)">查看采购价</span>
                <span class="repertory"> 库存:{{goods.goodsInventory}}</span>
            </p>
            <div class="mumber">
                数量
                <div class="box">
                    <a href="javascript:;" @click=" cheangeQuantity(goods,0)">-</a><input type="text" disabled v-model="goodsQuantity"><a href="javascript:;"  @click=" cheangeQuantity(goods,1)">+</a>
                </div>
            </div>
            <div class="info">
                运费  <span class="bold">免运费</span>
            </div>
            <div class="info">
                <i class="iconfont icon-wancheng"></i>
                <span class="info-text">退货需要联系客户进行咨询</span>  
            </div>
           
            <div class="goods-detail-desc" v-html="goods.goodsDetail">
               
                
            </div>
            <div class="footer-wrap">
                <ul class="handle left">
                    <li @click="goCollect">
                        <i class="iconfont icon-shoucang1 " :class="{'icon-shoucang':active}"></i><br>
                        收藏
                    </li>
                    <li @click="goShop">
                        <i class="iconfont icon-guanzhudianpu"></i><br>
                        店铺
                    </li>
                    <li @click="goCart">
                        <i class="iconfont icon-gouwuche1"></i><br>
                        购物车
                    </li>
                </ul>
                <div class="handle right">
                    <div class="go-cart" @click="addCart">加入购物车</div>
                    <div class="go-buy" @click="nowBuy">立即购买</div>
                </div>
            </div>
        </div>
    </transition>
    
</template>
<script>
    export default {
        data() {
            return {
                goods: {},
                goodsDetailPhotos: '',
                userCode: '',
                goodsQuantity: 1,
                active: false
            }
        },
        created(){
           
           this.userCode = this.getCookie('userCode')
           this.getData();
        },
        methods: {
            getData(){
                this.$http.post('Goods/goodsDetail',{goodsId: this.$route.params.goodsId,userCode: this.userCode},{
                        transformRequest:[function(data){
                        let params = '';
                        for(let key in data){
                            params += key +'='+data[key]+'&'
                        }
                        return params
                    }]
                }).then(response => {
                    let res = response.data;
                    //    console.log(res)
                    this.goods =  res.goodsDetail[0]
                    if(res.goodsDetailPhotos){
                        this.goodsDetailPhotos = res.goodsDetailPhotos[0]
                    }else{
                        this.goodsDetailPhotos = ''
                    }
                     
                })
            },
            show(ev){
                 ev.preventDefault();

                this.$toast({
                            message: '登陆后才可以查看哦！',
                            position:'middle',
                            duration: 2000
                        });
            },
            back(){
                this.$router.back()
            },
            //数量加减
            cheangeQuantity(item,status){
                if(status>0){
                    this.goodsQuantity++;
                    if(this.goodsQuantity >= item.goodsInventory){
                        this.goodsQuantity = item.goodsInventory;
                    }

                }else{
                    this.goodsQuantity--;
                    if(this.goodsQuantity < 1){
                        this.goodsQuantity = 1
                    }
                }
                
            },
            //加入购物车
            addCart(){
                if(!this.userCode){
                    this.$toast({
                        message: '请登录',
                        position:'middle',
                        duration: 2000
                    });
                    return;
                }
                this.$http.post('Cart/addCart',{userCode:this.userCode,goodsId:this.goods.goodsId,shopId:this.goods.shopId,goodsCount:this.goodsQuantity},{
                    transformRequest:[function(data){
                        let params = '';
                        for(let key in data){
                            params += key +'='+data[key]+'&'
                        }
                        return params
                    }]
                }).then(response =>{
                    let res =response.data;
                  //  console.log(res)
                    if(res.flag == 'success'){
                         this.$toast({
                            message: res.info,
                            position:'middle',
                            duration: 2000
                        });
                    }else{
                        this.$toast({
                            message: res.info,
                            position:'middle',
                            duration: 2000
                        });
                    }

                }).catch(err=>{
                     console.log(err)
                })
            },
            //立即购买
            nowBuy(){
                 if(!this.userCode){
                    this.$toast({
                        message: '请登陆',
                        position: 'middle',
                        duration: 2000
                    });
                    return;
                 }
                 this.$http.post('Order/orderPay',{goodsId: this.$route.params.goodsId,userCode: this.userCode,goodsCount:this.goodsQuantity},{
                        transformRequest:[function(data){
                        let params = '';
                        for(let key in data){
                            params += key +'='+data[key]+'&'
                        }
                        return params
                    }]
                }).then(response => {
                    let res = response.data;
                    // console.log(res)
                    if(res.flag == 'success'){
                        let goods =  JSON.stringify(res.data)
                        sessionStorage.setItem('goods',goods)
                        this.$router.push({
                            name: 'order',
                            query: {id:0}
                        })          
                    }else{       
                        this.$toast({
                            message: res.info,
                            position:'middle',
                            duration: 2000
                        });
                        return
                    }
                })
            },
            //去购物车
            goCart(){
                if(!this.userCode){
                    this.$toast({
                        message: '请登录',
                        position: 'middle',
                        duration: 2000
                    });
                    return;
                 }
                 this.$router.push({
                     name: 'cart'

                 })
            },
            //去店铺
            goShop(){
                if(!this.userCode){
                    this.$toast({
                        message: '请登录',
                        position: 'middle',
                        duration: 2000
                    });
                    return;
                 }
                this.$router.push({
                    name:'shop',
                    params: {
                        shopId:this.goods.shopId
                    }
                })
            },
            //去收藏
            goCollect(){
                this.$http.post('Collect/addCollect',{goodsId: this.$route.params.goodsId,userCode: this.userCode},{
                        transformRequest:[function(data){
                        let params = '';
                        for(let key in data){
                            params += key +'='+data[key]+'&'
                        }
                        return params
                    }]
                }).then(response => {
                    let res = response.data;
                    if(res.flag == 'success'){
                        
                        this.$toast({
                            message: res.info,
                            position:'middle',
                            duration: 2000
                        });     
                    }else{       
                        this.$toast({
                            message: res.info,
                            position:'middle',
                            duration: 2000
                        });
                        return
                    }
                })
            }
        }
    }
</script>
<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
.detail
   
    width 6.4rem
    position relative
    padding-bottom .8rem
    background #fff
    overflow-y auto
    // -webkit-overflow-scrolling: touch;
   
    .mint-header
        width 6.4rem
        margin 0 auto
        background #ffffff;
        color #000
        font-size 18px
        .mint-header-button 
            .iconfont 
                font-size 18px
            .mint-header-title
                font-weight bold
    .img-wrap
        width 6.4rem
        height 4rem
        padding-top 40px
        img 
            width 100%
            height 100%

    .goods-name
        padding 0 .15rem
        height .6rem
        line-height .6rem
        font-size .24rem
        font-weight bold

    .info 
        padding .1rem .15rem
        overflow hidden
        font-size .2rem
        line-height .24rem
        color #6d6d6d
        .price 
            color  #dc143c
        .show
            background #ff0000
            color #ffffff
            padding .05rem .1rem
        .repertory
            float right 
            font-size .2rem
        .bold
            font-weight bold
            color #000    
            padding 0 .15rem
        i  
            font-size .24rem    
            color #ef3030
            padding-right .2rem
            vertical-align middle
        .info-text
            font-size .2rem    
    .mumber
        padding .4rem .15rem
        font-size .2rem
        height .4rem
        color #6d6d6d
        line-height .4rem
        .box
            float right
            input 
                float left
                width .4rem
                height .4rem
                border-top 1px solid #ccc
                border-bottom 1px solid #ccc
                outline none          
                text-align center
                background #ffffff
                color  #000    
               
            a 
                float left
                border 1px solid #ccc
                width .4rem
                height .4rem
                text-align center
                background #ffffff
                color  #000    
                font-size .24rem           
    // .goods-detail-desc
    //     background pink
    //     p 
    //         padding .2rem .15rem !important
    //         font-size .18rem !important
    //         color #000 !important
    //         img
    //             width 100% !important
           

    .footer-wrap
        height .8rem
        position fixed
        bottom 0
        width 6.4rem
        line-height .8rem
        text-align center
        overflow hidden
        background #ffffff
        -webkit-transform: translateZ(0);
        .handle
           
            float left
            &.left 
                width 40%
                display flex
                li 
                    flex 1
                    line-height normal
                    font-size .16rem
                    color #6d6d6d
                    height .8rem
                    padding-top .1rem
                    i  
                        font-size .36rem
                        color #6d6d6d
            &.right 
                width 60%
                display flex
                div     
                    flex 1
                    color #fff
                    font-size .26rem
                    
                    &.go-cart
                        background #ff0000
                    &.go-buy
                        background #f97d0a


</style>
