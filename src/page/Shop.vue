<template>
    <div class="shop">
        <div class="header">
            
            <div class="img-wrap"><img :src="shopData.shopSrc" alt=""></div>
            <div class="shop-name">{{shopData.shopName}}的店铺</div>
            <div class="top">
                <div class="back" @click="$router.back()">
                    <i class="iconfont icon-fanhui"></i>
                </div>
                <div class="search">
                    <i class="iconfont icon-sousuo icon" @click="goSearch"></i>
                     <form action="javascript:void(0)">
                         <input type="search" placeholder="搜索商品" v-model="keyword"  @keyup.enter="getShopList(keyword)">
                     </form>
                   
                </div>
            </div>
        </div>
             <shopList
                :goodsList=" goodsList" 
                :loading="end"
                v-if="isLoad"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10"
                class="goods-list"
             ></shopList>   
       
        
        
    </div>
</template>
<script>
    import {getShopData} from 'common/api'
    import shopList from 'components/Index/GoodsList'
    export default {
        data(){
            return {
                shopData: {},
                keyword: '',
                goodsList: [],
                userCode: '',
                page: 1,
                value: '',
                end:true,// 到底了
                loading:true,// 默认直接加载
                isLoad: false
               
            }
        },
        watch:{
            keyword (val){
                if(val == ''){
                 this.getShopList('');
                }
            }

        },
        created(){
            this.userCode = this.getCookie('userCode');
            if(this.userCode){
                 // loading...
                this.$indicator.open({
                    text: 'Loading...',
                    spinnerType: 'fading-circle'
                });
                this.getShopList('');
            }else{
                this.$router.push({
                    name: 'login'
                })
            }
        },
        methods: {
            async getShopList(value,flag){
                let {data:res} = await getShopData({userCode:this.userCode,shopId:this.$route.params.shopId,keyWord:value,page:this.page})
                this.$indicator.close();   
                
                if(res.flag == 'success'){

                    if(flag){
                        if(res.info == '已到底部'){
                            this.goodsList = res.goodsList;
                            this.loading = true;
                            this.end= true;
                            this.$toast({
                                message: '没有更多数据了',
                                position:'middle',
                                duration: 2000
                            });
                        
                        }else{
                              this.loading = false;
                        }

                    }else{
                        this.shopData = res.shopData[0];
                        this.goodsList = res.goodsData;
                        this.isLoad = true;
                        this.loading = true;
                    }
                }else{
                    this.$indicator.open({
                        text: 'Loading...',
                        spinnerType: 'fading-circle'
                    })
                }
                
            },
            goSearch(){
                 this.getShopList(this.keyword)
            },

            //上啦加载
            loadMore(){
                this.loading = true;
                setTimeout(() => {
                    this.page++;
                    this.getShopList(this.keyword,flag)
                }, 300);

            },
            
        },
        components: {
            shopList
        }
    }
</script>
<style lang="stylus" scoped>
    .shop
        width 6.4rem
        margin 0 auto
        background #fff
        .header
            width 6.4rem
            background #fff
            position relative
            .img-wrap
                height 4rem
                img 
                    width 100%
                    height 100%
            .shop-name
                text-align center
                font-size .24rem
                padding .1rem 0
                font-weight bold
            .top
                position absolute
                top 0
                left  0
                overflow hidden
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
                            color #c3c3c3
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

</style>


