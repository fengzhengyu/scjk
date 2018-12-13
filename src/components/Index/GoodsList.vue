<template>
  <div class="goods">
   
        <ul class="load-more-wrap">
            <li class="goods-list" v-for="(item,index) in goodsList" :key="index">
                <router-link class="link" :to="{name:'id',params:{goodsId:item.goodsId}}">
                    <div class="list-img">
                        <img v-lazy="item.goodsPhoto" >
                    </div>
                    <div class="list-desc">
                        <h3 class="title">{{item.goodsName}}</h3>
                        <p class="text">{{item.goodsSpecification}}</p>
                        <p>{{item.goodsRetailPrice}}<!--<span class="price"> ￥150.00</span>--></p>
                        <p class="last"> 
                            <span class="price" v-if="userCode">{{item.goodsProcurementPrice}}</span>  
                        
                            <span class="show" v-else @click.prevent="show()">查看采购价</span>
                            <span class="repertory" @click.prevent="addCart">+</span>
                            
                        </p>
                    </div>
                </router-link>
                
            </li>
            
        </ul>
        <div v-if="goodsList.length>0">
            <div class="ladding" v-if="!loading">
                <img src="../../common/img/loading-svg/loading-spinning-bubbles.svg"> &nbsp; 加载中...
            </div>
            <div class="ladding" v-else>
                您已经到底了
            </div>
        </div>
  </div>  
</template>
<script>
    export default {
        props: {
            goodsList:{
                type: Array,
                default: []
            },
            loading:{
                type:Boolean,
                default: false
            }
        },
        data(){
            return {
                
            }
        },
        created(){
           
            this.userCode = this.getCookie('userCode')  
          
        },
        methods: {
           
            show(ev){
                this.$toast({
                    message: '请登陆后查看！',
                    position:'middle',
                    duration: 2000
                });
                setTimeout(()=>{
                    this.$router.push({
                        name: 'login'
                    });
                },500)
            },
            addCart(ev){
                ev.preventDefault();
                
                if(this.userCode ){
                  

                }else{
                    this.$toast({
                        message: '请登陆后添加！',
                        position:'middle',
                        duration: 2000
                    });
                    setTimeout(()=>{
                        this.$router.push({
                            name: 'login'
                        });
                    },500)
                }
            }
            
        }
    }
</script>
<style lang="stylus" scoped>
 @import "~common/stylus/variable.styl"
.goods 
    padding-bottom .9rem; 
    padding-top .15rem
    background #f2f2f2    
    .load-more-wrap 
        padding-left  .13rem
        overflow hidden
       

        .goods-list 
            float left;
            width 3rem;
            margin 0 .13rem .15rem 0
            background #fff    
        
            .list-img 
                width: 100%;
                height: 3rem;

                img 
                    width: 100%;
                    height: 100%;
                
            

            .list-desc 
                padding 0 .15rem
                .title
                   color $color-highlight
                   font-size $font-highlight
                   font-weight bold
                   padding .2rem 0 0 0
                   text-overflow ellipsis
                   white-space nowrap
                   overflow hidden
                p
                   padding-top .2rem
                   color $color-highlight
                   font-size $font-info 
                   position relative
                   &.text
                      text-overflow ellipsis
                      white-space nowrap
                      overflow hidden
                   &.last
                    padding-top .2rem
                    margin-bottom .1rem
                   .show
                       background #ff6600
                       color $color-text
                       padding 0.05rem .1rem
                       line-height .2rem
                       display inline-block
                      
                   .price
                       color #ff6600
                   .repertory
                       position absolute
                       right .05rem
                       bottom 0
                       width .36rem
                       height .36rem
                       background #ff6600
                       color #fff
                       line-height .36rem
                       text-align center
                       font-size $font-info 
                       border-radius 50%

            
    .ladding
        text-align center
        line-height .6rem
        height .6rem
        font-size $font-size-22
        margin .15rem 0
        img 
            display inline-block
            vertical-align middle
    
</style>
