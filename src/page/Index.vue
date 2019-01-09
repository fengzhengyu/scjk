<template>
    <div class="index">
         <Header></Header>
         <Swiper :sliders = "sliders"></Swiper>
         <Classify :goodsTypeList="goodsTypeList"></Classify>   
        
            <GoodsList :goodsList="goodsList" 
                :loading="end"
                v-if="isLoad"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10"
               
                >
            </GoodsList>
         
         <Footer></Footer>
    </div>
</template>
<script>
    
    import { getIndexData } from 'common/api'
    import Header from 'components/Index/Header'
    import Swiper from 'components/Index/Swiper'
    import Classify from 'components/Index/Classify'
    import GoodsList from 'components/Index/GoodsList'
    import Footer from 'components/common/c-footer'

    export default {
        components: {
            Header,
            Swiper,
            Classify,
            GoodsList,
           
            Footer
        },
        data(){
            return {
                goodsTypeList:[],
                sliders: [],
                goodsList: [],
                loading: true,
                page: 1,
                isLoad: false,
                end: false
             
               
               

            }
        },
        computed:{
             userCode(){               
                return this.$store.state.userCode;
            }
        },
        created(){
            
            // loading...
            this.$indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            });
            this.getAllData()
        },
        methods: {
            async getAllData(flag){
               
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
                        
                    }else{
                          this.loading = false;
                    }
                }else{
                    this.goodsTypeList = res.goodsTypeList
                    this.goodsList = res.goodsList;
                    this.sliders = res.carouselList.length>0? res.carouselList: [require('../components/Index/banner.png')]; 
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

</style>

