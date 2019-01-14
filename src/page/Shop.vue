<template>
    <div class="shop">
      <mHeader class="shop-header"> 
           <div class="text" slot="text">{{shopData.shopName}}</div> 
      </mHeader>
      <div class="line"></div>
             <shopList
                :goodsList=" goodsList" 
                :loading="end"
                v-if="isLoad"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10"
                class="goods-list"
              :style="{'padding-bottom':this.$route.params.shopId? '0rem':'.9rem'}"></shopList>   
       
        
        
    </div>
</template>
<script>
    import {getShopData} from 'common/api'
    import shopList from 'components/Index/GoodsList'
    import mHeader from 'components/Member/memberHead'
    export default {
        data(){
            return {
                shopData: {},
        
                goodsList: [],
                loading: true,
                page: 1,
                isLoad: false,
                end: false
             
               
               
            }
        },
       
        created(){
          
            if(this.$route.params.shopId){
                 // loading...
                this.$indicator.open({
                    text: 'Loading...',
                    spinnerType: 'fading-circle'
                });
                this.getShopList();
            }else{
                this.$router.push({
                    name: 'login'
                })
            }
        },
        methods: {
            async getShopList(flag){
                let {data:res} = await getShopData({shopId:this.$route.params.shopId,salesId:this.$store.state.shopData,page:this.page,userType:'sales'})
               
                console.log(res)
                if(res.flag == 'success'){

                    if(flag){

                       
                         this.goodsList = res.goodsData;
                        if(res.message == '已到底部'){
                        
                            this.loading = true;
                            this.end= true;
                           
                        
                        }else{
                              this.loading = false;
                        }

                    }else{
                        this.shopData = res.shopData;
                        this.goodsList = res.goodsData;
                        this.isLoad = true;
                        this.loading = false;
                        this.$indicator.close();   
                          
                    }
                }else{
                    this.$indicator.open({
                        text: 'Loading...',
                        spinnerType: 'fading-circle'
                    })
                }
                
            },
           

            //上啦加载
            loadMore(){
                this.loading = true;
                setTimeout(() => {
                    this.page++;
                    this.getShopList(true);
                }, 300);

            },
            
        },
        components: {
            shopList,
             mHeader
        }
    }
</script>
<style lang="stylus" scoped>
    .shop
        width 6.4rem
        margin 0 auto
        background #fff
        .shop-header
            position fixed
            width 6.4rem
            z-index 999
        .line
            height .8rem    

</style>


