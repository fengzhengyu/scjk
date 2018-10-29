<template>
    <div class="index">
         <Header></Header>
         <Classify :goodsTypeList="goodsTypeList"></Classify>   
          <!-- <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="isAutoFill" :bottom-all-loaded="allLoaded" v-if="isLoad"> -->
            <GoodsList :goodsList="goodsList" 
                :loading="end"
                v-if="isLoad"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10"
                class="goods-list"
                >
            </GoodsList>
          <!-- </mt-loadmore> -->
         <Footer></Footer>
    </div>
</template>
<script>
    import { getIndexData } from 'common/api'
    import Header from 'components/Index/Header'
    import Classify from 'components/Index/Classify'
    import GoodsList from 'components/Index/GoodsList'
    import Footer from 'components/common/Footer'

    export default {
        components: {
            Header,
            Classify,
            GoodsList,
           
            Footer
        },
        data(){
            return {
                goodsTypeList:[],
                goodsList: [],
                loading: true,
                page: 1,
                isLoad: false,
                end: false
             
               
               

            }
        },
        created(){
            this.userCode = this.getCookie('userCode');
            // loading...
            this.$indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            });
            this.getAllData()
        },
        methods: {
            async getAllData(flag){
                //   console.log()
                // getIndexData({page:this.page,userCode:this.userCode}).then((res)=>{
                //     console.log(res.data)
                // },(err)=>console.log(err))
                // 以上写法一般，想要you逼格，用语法糖

                let {data:res} = await getIndexData({page:this.page,userCode:this.userCode})  
                if(flag){
                    this.goodsList = res.goodsList;
                    if(res.info == '已到底部'){
                        this.loading = true;
                        this.end = true;
                        this.$toast({
                            message: '没有更多数据了',
                            position:'middle',
                            duration: 3000
                        });
                    }else{
                          this.loading = false;
                    }
                }else{
                    this.goodsTypeList = res.goodsTypeList
                    this.goodsList = res.goodsList;
                    
                    this.isLoad = true;
                    this.loading = false;
                    this.$indicator.close();
                }     
               
               


            },
            loadMore(){
                this.loading = true;
                setTimeout(()=>{
                     this.page++;
                     this.getAllData(true)

                },300)
                                       
              
             }

        },
        
    }
    
</script>
<style lang="stylus" scoped>
    .index 
       background #fff
       .goods-list
            padding-bottom 55px;     
</style>

