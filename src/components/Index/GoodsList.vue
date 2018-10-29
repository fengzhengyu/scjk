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
                        <p>{{item.goodsSpecification}}</p>
                        <p>{{item.goodsRetailPrice}}<!--<span class="price"> ￥150.00</span>--></p>
                        <p> 
                            <span class="price" v-if="userCode">{{item.goodsProcurementPrice}}</span>  
                            <span class="show" v-else @click.prevent="show()">查看采购价</span>
                            <span class="repertory"> 库存:{{item.goodsInventory}}</span>
                            
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
        
        
    
     <!-- <router-view></router-view> -->
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
            
        }
    }
</script>
<style lang="stylus" scoped>
.goods 
    // padding-bottom .9rem;
    height atuo
    background #fff
    // margin-bottom 55px
    .load-more-wrap 
        width 100%;
        overflow hidden
       

        .goods-list 
            float left;
            width 50%;
            .list-img 
                width: 100%;
                height: 2.4rem;

                img 
                    width: 100%;
                    height: 100%;
                
            

            .list-desc 
               padding .15rem 0 .15rem .15rem
               .title
                   color #000000
                   font-size .24rem
                   font-weight bold
                   padding .05rem 0
                   text-overflow ellipsis
                   white-space nowrap
                   overflow hidden
                p
                   padding .1rem 0
                   color #555555
                   font-size .2rem
                   text-overflow ellipsis
                   white-space nowrap
                   overflow hidden
                   .show
                       background #ff0000
                       color #ffffff
                       padding .05rem .1rem
                   .price
                       color #dc143c
                   .repertory
                       float right     
                       margin-right .05rem
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
