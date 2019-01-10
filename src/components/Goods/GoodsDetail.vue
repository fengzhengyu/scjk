<template>
    <transition name="slide">
        <div>
            <div class="header">
                <div class="back"  @click="$router.go(-1)">
                    <i class="iconfont icon-fanhui2"></i>
                </div>
            </div>
            <div class="detail" >
               <div ref="detailWrapper" class="detailWrapper">
                 <div>
                     <Swiper :sliders=" goodsDetailPhotos" class="img-wrap"></Swiper>
                    <h1 class="goods-name">{{ goods.goodsName }}</h1>
                   
                    <p class="buy-price" v-if="goods.goodsProcurementPrice">{{symbol}} <b>{{num}}</b> <span >{{str}}</span> </p>
                   
                    <p class="info">{{goods.goodsRetailPrice}}</p>
                    <p class="info size">{{goods.goodsSpecification}}</p>
                    <!-- <div class="mumber">
                        数量
                        <div class="box">
                            <a href="javascript:;" @click=" cheangeQuantity(goods,0)">-</a><input type="text" disabled v-model="goodsQuantity"><a href="javascript:;"  @click=" cheangeQuantity(goods,1)">+</a>
                        </div>
                    </div> -->
                    <div class="desc-tit">
                        <span class="bold">商品详情</span>
                    </div>
                
                    <div class="goods-detail-desc" v-html="goods.goodsDetail">
                    
                        
                    </div>
        

                </div>
               </div>
          
               
                    <!-- <img :src="goodsDetailPhotos" alt=""> -->
                <!-- </div> -->
               
            </div>
            <div class="shopCart border-top">
               
                <div class="left">
                   
                    <div class="logo-wrapper "  @click="$router.push({name: 'cart'})">
                        <div class="logo">
                            <i class="iconfont icon-gouwuche1-copy-copy"></i>
                        </div>
                        <div class="num" v-if="cartCount>0">{{cartCount}}</div>
                    </div>
                     <div class="shop-wrap">店铺</div>
                </div>
                <div class="right">
                    
                    <div class="cart-control-wrapper" v-show="goods.goodsNum>0" >
                        <!--  -->   
                            <div></div>
                               
                            <div class="cart-decrease icon-circle"  @click=" editCart('minus',goods)">
                                <i class="iconfont icon-jian"></i>
                                </div>
                            <div class="cart-count" >{{typeof goods.goodsNum == 'undefined'?$set(goods,'goodsNum',0):goods.goodsNum }}</div> 
                            <div class="cart-add icon-circle" @click=" editCart('add',goods)" >
                                <i class="iconfont icon-jiaru"></i>
                                </div>
                        
                    </div>
                     <div class="btn" v-show="goods.goodsNum<=0"  @click=" editCart('add',goods)" >加入购物车</div>
                </div>
                
            </div>
        </div>
        
    </transition>
    
</template>
<script>
    import BScroll from 'better-scroll'
    import { getGoodsDetailData, getAddCartData , getNowBuyData, getCollectData } from 'common/api'
    import Swiper from 'components/common/Swiper'
    export default {
        data() {
            return {
                goods: {},
                goodsDetailPhotos: [],
              
                goodsQuantity: 1,
                active: false,
                symbol: '',
                num: '',
                str: ''
            }
        },
        created(){
           this.$indicator.open({
                        text: 'Loading...',
                        spinnerType: 'fading-circle'
                    });
        
           this.getData();
        },
        computed: {
            userCode(){
                return this.$store.state.userCode == null ? '': this.$store.state.userCode;
            },
            cartCount(){
                return this.$store.state.cartCount;
            }
        },
        mounted(){
             this.$nextTick(() => {
                  
              })      
        },
        methods: {
            async getData(){
               let {data:res} = await getGoodsDetailData({goodsId: this.$route.params.goodsId,userCode: this.userCode});
             
                // console.log(res)
                if(res){
                    this.goodsDetailPhotos = res.goodsDetailPhotos;
                    this.goods =  res.goodsDetail[0];
                    if(this.goods.goodsProcurementPrice != null){
                         this.symbol = this.goods.goodsProcurementPrice.substring(4,5)
                    this.num = this.goods.goodsProcurementPrice.substring(5)
                    this.str = this.goods.goodsProcurementPrice.substring(0,3)
                    }
                   
                 
                    this.$indicator.close()
                }else{
                    
                }
                
                
            },         
             // 加入购物车
            editCart(flag,item){
                if(!this.userCode){
                    this.$toast({
                        message: '请登录',
                        position:'middle',
                        duration: 2000
                    });
                    setTimeout(()=>{
                        this.$router.push({
                            name: 'login',
                             query: {
                                redirect: this.$route.fullPath
                            }
                        });
                    },500)
                    return;
                }
               

                if(flag == 'add'){
                    item.goodsNum++;
                
                }else if(flag == 'minus'){
                    if(item.goodsNum<=0){
                        return;
                    }
                    item.goodsNum--;
                }
              
                getAddCartData({userCode:this.userCode,goodsId:item.goodsId,goodsNum: item.goodsNum}).then(response=>{
                    let res = response.data;
                    if(res.flag == 'success'){
                        let num = 0;
                        if(flag =='add'){
                            num = 1;
                        }else if(flag == 'minus'){
                            num = -1;
                        }
                        this.$store.commit('updateCartCount',num)
                    }
                    // this.$toast({
                    //     message: res.info,
                    //     position:'middle',
                    //     duration: 2000
                    // });
                })

            },
           
            //立即购买
            async nowBuy(){
                if(!this.userCode){
                    this.$toast({
                        message: '请登陆',
                        position: 'middle',
                        duration: 2000
                    });
                    setTimeout(()=>{
                        this.$router.push({
                            name: 'login'
                        });
                    },500)
                    return;
                }
                let {data:res} = await getNowBuyData({goodsId: this.$route.params.goodsId,userCode: this.userCode,goodsCount:this.goodsQuantity});
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
                    
                }

            },
            //去购物车
            goCart(){
                if(!this.userCode){
                    this.$toast({
                        message: '请登录',
                        position: 'middle',
                        duration: 2000
                    });
                    setTimeout(()=>{
                        this.$router.push({
                            name: 'login'
                        });
                    },500)
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
                    setTimeout(()=>{
                        this.$router.push({
                            name: 'login'
                        });
                    },500)
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
            async goCollect(){
                if(!this.userCode){
                    this.$toast({
                        message: '请登录',
                        position: 'middle',
                        duration: 2000
                    });
                    setTimeout(()=>{
                        this.$router.push({
                            name: 'login'
                        });
                    },500)
                    return;
                 }
                let {data:res} = await getCollectData({goodsId: this.$route.params.goodsId,userCode: this.userCode});
                this.$toast({
                    message: res.info,
                    position:'middle',
                    duration: 2000
                });
            }
        },
       
        components: {
            Swiper
        }
      
    }
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"
.slide-enter-active, .slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
.header
    width 6.4rem
    position fixed
    top 0
    font-size 18px
    height .8rem
    z-index 100
   
    .back
        width .6rem
        height .6rem
        background #898889
        text-align center
        line-height .6rem
        border-radius 50%
        margin  .15rem 0 0 .25rem
        i 
            color #fff
            font-size .3rem
.detail
   
    width 6.4rem
    position relative
    overflow-y auto
    padding-bottom .9rem
    // -webkit-overflow-scrolling: touch;
    background #fff
   
    
    .detailWrapper
        flex 1    
        .img-wrap
            width 6.4rem
            height 6.4rem
        .goods-name
            padding .25rem
            height .32rem
            line-height .32rem
            color #474747
            font-size .28rem
            font-weight bold
        .buy-price
            padding 0 .25rem
            font-size .22rem
            color #ff3d00
            
            
            b 
                font-size .34rem
                display inline-block
                vertical-align: text-bottom;
            span 
                display inline-block
                color #fd7f31
                border 0.01rem solid #fd7f31
                text-align: center;
                vertical-align: text-bottom;
                // height .32rem
                line-height normal
                padding .05rem 0
                width .8rem
                margin-left .10rem
                border-radius .05rem
                font-size .16rem

              
        .info 
            padding .2rem .25rem
            overflow hidden
            font-size .18rem
            line-height .24rem
            color #9a9a9a
            &.size
                font-size .22rem
            
        .desc-tit
            padding .2rem .25rem
            font-size .24rem
            font-weight bold    
            span    
                padding 0 .15rem  
                border-left .05rem solid #000  
        
        .goods-detail-desc
            padding .2rem .25rem
.shopCart
    width 6.4rem
    height: .9rem;
    position: fixed;
    z-index: 100;
    bottom: 0;
    background: #fff;
    display: flex;
    justify-content center
    align-items center
    .left
        flex: 1;
        background: #fff;
        .shop-wrap
            width 1rem
            background #fd7722
           
            height: 0.7rem;
            text-align: center;
            line-height: 0.7rem;
            font-size: 0.24rem;
            margin-left .1rem
            
            color: #fff
        .logo-wrapper
            width .95rem
            height .95rem
            background #f8f8f8
            border-radius 50%
            position absolute
            top -.25rem
            left 1.5rem
            box-shadow  0px  -1px 2px #ddd
    
            padding: .1rem
            .logo
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: #fd7722;
                text-align: center;
                line-height .95rem
                i 
                    font-size .4rem
                    color #fff
            .num
                position: absolute;
                top: 0;
                right: 0;      
                width .26rem
                padding .06rem 0
                background #ff0000  
                line-height normal
                text-align center
                border-radius 50%
                color #fff
                font-size .14rem
    .right 
        flex: 1;
        justify-content center
        align-items center
        .btn
            width 2.7rem
            height .7rem
            text-align center
            line-height .7rem
            font-size .24rem
            color #fff
            background #fe8f32
            border-radius .4rem
            margin  0 auto
           
        .cart-control-wrapper
            position absolute
            right  .3rem
            bottom .3rem
            font-size: 0;
            .cart-decrease, .cart-add
                display: inline-block;
                
            .cart-count
                display: inline-block;
                
                width .36rem
                height .36rem
                padding 0 .05rem
                color: #000;
                font-size $font-info
                line-height: .36rem;
                text-align: center;
                font-size .22rem
            .icon-circle
                width .36rem
                height .36rem
                background  $color-theme
                border-radius 50%
                line-height .36rem
                text-align center
                font-size $font-info
                i 
                    font-size .18rem
                    color #fff
                    font-weight bold



</style>
