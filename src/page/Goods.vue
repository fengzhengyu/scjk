<template>
    <div class="goods">
       <mt-header :title="title" fixed>
            <router-link to="/" slot="left">
                <mt-button icon="">
                    <i class="iconfont icon-fanhui"></i>
                </mt-button>
            </router-link>
          
        </mt-header>
        <div class="top-nav">
            <div :class="{'active': active==1}" @click="active=1,getGoodsTypeList('recommend')" >推荐</div>
            <div :class="{'active': active==2}" @click="active=2 ,tabStatus =!tabStatus,getGoodsTypeList(tabStatus ==true?1:0)">价格<i class="iconfont icon-xiaosanjiaodown" :class="{'icon-xiaosanjiaoup': tabStatus==1}"></i></div>
            <div :class="{'active': active==3}" @click="active=3,getGoodsTypeList('salesVolume')">销量</div>
        </div>
        <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="isAutoFill" :bottom-all-loaded="allLoaded" v-if="isLoad">
            <GoodsList :goodsList="goodsList"></GoodsList>    
        </mt-loadmore>
       
        <div v-if="goodsList.length<=0 && isLoad" class="no-goods">
            暂无商品！
        </div>
        
        <!-- <router-view></router-view> -->
        <Footer></Footer> 
    </div>
</template>
<script>
import { getGoodsTypeData, getIndexData } from 'common/api'
    import GoodsList from 'components/Index/GoodsList.vue'
     import Footer from 'components/common/Footer'
    export default {
        data() {
            return {
                active: 1,
                tabStatus:0,
                typeName: [],
                title: '分类页面',
                goodsList: [],
                page: 1,
                isAutoFill:false,//是否自动检测，并调用loadBottom
                allLoaded:false,//数据是否全部加载完毕，如果是，禁止函数调用
                isLoad:false
            }
        },
        created(){
            this.userCode = this.getCookie('userCode')
            this.getTypeName();
            this.$indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            })
            this.getGoodsTypeList();
           
        },
       
        methods:{
            async getTypeName(){
                let {data:res} = await getIndexData();
                if(res.goodsTypeList){
                    this.typeName = res.goodsTypeList;  
                  this.getTitle();//获取分类名称 
                }
                
                 
            },
            getTitle(){
                if(this.typeName){
                    this.typeName.forEach(element => {
                        if(element.typeId == this.$route.params.id){
                            this.title = element.typeName
                        }
                    });
                }else{
                     this.title = '分类页面'
                }
                
            },
            async getGoodsTypeList(value){
                this.page =1;
                let {data:res} = await getGoodsTypeData({typeId:this.$route.params.id,userCode:this.userCode,screening:value,page:this.page});
                if(res.flag == 'success'){
                    this.goodsList = res.typeGoodsList;
                    this.isLoad = true;
                    this.page++;
                }
                this.$indicator.close()
               
               
                

            },
               //上拉刷新
            async loadBottom(){
                let value = ''
                if(this.active == 1){
                   value = 'recommend';
                }else if(this.active == 2){
                    value = this.tabStatus == true?1:0;
                }else if(this.active == 3){
                    value = 'salesVolume';
                }
                let {data:data} = await getGoodsTypeData({typeId:this.$route.params.id,userCode:this.userCode,screening:value,page:this.page});
                this.goodsList  = data.typeGoodsList
                this.page ++;
                this.$refs.loadmore.onBottomLoaded();
                if(res.msg== '已到底部'){
                    this.allLoaded = true;
                    this.$toast({
                        message: '没有更多数据了',
                        position:'middle',
                        duration: 2000
                    });
                }
                
            },

        },
        components: {
             GoodsList,
             Footer 
        }
    }
</script>
<style lang="stylus" scoped>
    .goods
        background #ffffff
        .mint-header
            width 6.4rem
            margin 0 auto
            background #ffffff
            color #000
            font-size 18px
            .mint-header-button 
                .iconfont 
                    font-size 20px
                .mint-header-title
                    font-weight bold
        .top-nav
            padding-top 40px
            height .6rem
            border-bottom 1px solid #c9c9c9
            display flex
            margin-bottom .15rem
            div
                flex 1
                line-height .6rem
                text-align center
                font-size .24rem
                color #898989
                i 
                    font-size .24rem
                &.active 
                    color #ff0000
                    border-bottom 2px solid #ff0000
        .mint-loadmore
            padding-bottom 55px;   
        .no-goods
            text-align center
            line-height 3rem
            font-size .22rem
            color #666                   
</style>


