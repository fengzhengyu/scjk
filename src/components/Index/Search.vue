<template>
    <div class="search-page">
        <div class="header">
            <div class="back" @click="goBack">
                <i class="iconfont icon-fanhui"></i>
            </div>
            <div class="search">
                <i class="iconfont icon-sousuo icon" @click="goSearch"></i>
                    <form action="javascript:void(0)">
                        <input type="search" placeholder="搜索商品" v-model="keyword"  @keyup.enter="goSearch" v-focus>
                    </form>
                
            </div>
            <div class="text" @click="goSearch">搜索</div>
        </div>
        <div class="no-data" v-show="isShow">
            <div class="box">
                请输入您要搜索的商品
            </div>
            
        </div>
        <div class="goods">
         
                <ul class="load-more-wrap"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="10"
                 >
                    <li class="goods-list" v-for="(item,index) in goodsList" :key="index">
                        <router-link class="link" :to="{name:'id',params:{goodsId:item.goodsId}}">
                            <div class="list-img">
                                <img :src="item.goodsPhoto" alt="">
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
                    <div class="ladding" v-if="!end ">
                        <img src="../../common/img/loading-svg/loading-spinning-bubbles.svg"> &nbsp; 加载中...
                    </div>
                    <div class="ladding" v-else>
                        您已经到底了
                    </div>
                </div >
        
            <router-view></router-view>
        </div>  
       
    </div>
</template>
<script>
     import { getIndexData } from 'common/api'
export default {
    data() {
        return {
            keyword:'',
            goodsList: [],
            isShow: true,
            page:1,
            loading:false,//
            end:false,//
        }
    },
     created(){
           
             this.userCode = this.getCookie('userCode')
                
       
    },
     watch:{
      keyword(val){
        if(val == ''){
          this.isShow = true;
          this.goodsList = [];
        }
      }

    },
    methods: {
        async goSearch(flag){
            if(this.keyword == ''){
                return;
            }
              this.$indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            });
            let {data: res} = await getIndexData({userCode:this.userCode,page:this.page,keyWord:this.keyword});
             this.$indicator.close();   

            if(flag){
                    this.goodsList = res.goodsList;
                    if(res.info == '已到底部'){
                        this.loading = true;
                        this.end = true;
                       
                    }else{
                          this.loading = false;
                    }
            }else{
                if(res.goodsList.length>0){
                    this.goodsList = res.goodsList;
                    this.isShow = false;
                    this.loading = false;
                    // this.isLoad = true;
                   
                    
                    }else{
                        this.goodsList = [];
                        this.$toast({
                            message: '关键字有误！',
                            position:'middle',
                            duration: 2000
                        });
                    }
                
                
            }  
           
             
             
        },
        //上啦加载
        loadMore(){
            this.loading = true;
             setTimeout(()=>{
                    this.page++;
                    this.goSearch(true)

            },300)
        },
        show(){
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
        goBack(){
           this.$router.back()
        }
    }
}
</script>
<style lang="stylus" scoped>
    .search-page
        width 6.4rem
        margin 0 auto  
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        background #fff
        overflow-y auto
        .header  
            width 6.4rem
            overflow hidden
            position fixed
            background #fff
            z-index 9999
            .back 
                padding .3rem
                float left
                i 
                    font-size .36rem
            .search
                background #fff
                float left
                width 4.8rem
                margin-top .2rem
                height .55rem
                border-radius .3rem
                overflow hidden
                
                position relative
                .icon    
                        color #999
                        font-size .36rem;
                        display block
                        position absolute
                        top 50%
                        left .15rem
                        margin-top -0.18rem
                input 
                    background #f5f5f5
                    color #000
                    width 100%  
                    height .55rem
                    border-radius 0.2rem 
                    padding .05rem  0  0.05rem .5rem
                    box-sizing border-box
                    outline none
                    line-height .4rem
                    font-size .24rem
            .text
                float left
                color #000
                line-height .6rem
                margin-top .2rem
                font-size .24rem
        .no-data
            margin-top 1rem
            .box
                margin 0 auto 
                width 3rem
                height .5rem
                border 1px solid #38a0df  
                font-size .24rem
                line-height .5rem
                text-align center
                color #38a0df         
        .goods 
            padding-top 1rem
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

