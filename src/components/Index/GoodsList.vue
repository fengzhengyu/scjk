<template>
  <div class="goods">
    <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="isAutoFill" :bottom-all-loaded="allLoaded">
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
                            <span class="show" v-else @click="show($event)">查看采购价</span>
                            <span class="repertory"> 库存:{{item.goodsInventory}}</span>
                            
                        </p>
                    </div>
                </router-link>
                
            </li>
            
        </ul>
     </mt-loadmore>   
     <!-- <router-view></router-view> -->
  </div>  
</template>
<script>
    export default {
        data(){
            return {
                goodsList: [],
                userCode: '',
                page: 1,
                isAutoFill:false,//是否自动检测，并调用loadBottom
                allLoaded:false,//数据是否全部加载完毕，如果是，禁止函数调用
            }
        },
        created(){
            // this.$nextTick(()=>{
                this.userCode = this.getCookie('userCode')
                this.getDataList()
                
           // })
        },
        methods: {
            getDataList(){
                this.$http.post('Goods/index',{page:this.page,userCode:this.userCode},{
                    transformRequest:[function(data){
                        let params = '';
                        for(let key in data){
                            params += key +'='+data[key]+'&'
                        }
                        return params
                    }]
                    
                }).then(response=>{
                    let res =response.data;
                     if(res.goodsList){
                        this.goodsList = res.goodsList;
                        this.page++
                     }else{
                         this.goodsList = [];
                     }
                   
                }).catch(err=>{
                    console.log(err)
                    this.goodsList =[];
                })

            },
            show(ev){
                 ev.preventDefault();

                this.$toast({
                            message: '登陆后才可以查看哦！',
                            position:'middle',
                            duration: 2000
                        });
            },
            //上啦加载
             loadBottom(){
                 this.$http.post('Goods/index',{page:this.page,userCode:this.userCode},{
                    transformRequest:[function(data){
                        let params = '';
                        for(let key in data){
                            params += key +'='+data[key]+'&'
                        }
                        return params
                    }]
                }).then(response=>{
                    let res =response.data;
            
                    this.goodsList = res.goodsList;
                    this.page++
                    this.$refs.loadmore.onBottomLoaded();
                    if(res.info == '已到底部'){
                        this.allLoaded = true;
                        this.$toast({
                            message: '没有更多数据了',
                            position:'middle',
                            duration: 3000
                        });
                        return;
                    }
                    
                }).catch(err=>{
                    console.log(err)
                    this.goodsList =[];
                })
            }
        }
    }
</script>
<style lang="stylus" scoped>
.goods 
    // padding-bottom .9rem;
    height atuo
    background #fff
    margin-bottom 55px
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
        
    

</style>
