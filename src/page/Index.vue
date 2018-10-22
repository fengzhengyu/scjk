<template>
    <div class="index">
         <Header></Header>
         <Classify :goodsTypeList="goodsTypeList"></Classify>   
          <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="isAutoFill" :bottom-all-loaded="allLoaded" v-if="isLoad">
            <GoodsList :goodsList="goodsList"></GoodsList>
          </mt-loadmore>
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
                isAutoFill:false,//是否自动检测，并调用loadBottom
                allLoaded:false,//数据是否全部加载完毕，如果是，禁止函数调用
                isLoad: false,
               
               

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
            async getAllData(){
                //   console.log()
                // getIndexData({page:this.page,userCode:this.userCode}).then((res)=>{
                //     console.log(res.data)
                // },(err)=>console.log(err))
                // 以上写法一般，想要you逼格，用语法糖

                let {data:res} = await getIndexData({page:this.page,userCode:this.userCode})  
                if(res.goodsList){

                }
                // setTimeout(()=>{
                this.goodsTypeList = res.goodsTypeList
                this.goodsList = res.goodsList;
                //异步操作，上面数据不成功后面不执行
                this.isLoad = true;
                this.loading = false;
                this.$indicator.close();
                this.page++;
                // },2000)       

               


            },
            async loadBottom(){
                let {data:data} = await getIndexData({page:this.page,userCode:this.userCode})  
                    
                    this.goodsList = data.goodsList;
                    this.page++
                    this.$refs.loadmore.onBottomLoaded();
                    if(data.info == '已到底部'){
                        this.allLoaded = true;
                        this.$toast({
                            message: '没有更多数据了',
                            position:'middle',
                            duration: 3000
                        });
                        return;
                    }
                    
             }

        },
        
    }
    
</script>
<style lang="stylus" scoped>
    .index 
       background #fff
       .mint-loadmore
            padding-bottom 55px;     
</style>

