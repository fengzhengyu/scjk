<template>
    <div>
        <RankHead></RankHead>
    
        <div class="goods border-top">
            <div class="menu-wrapper " ref="menuWrapper">
                <ul>
                    <li class="menu-list border" v-for="(item,index) in typeName" :key="index" :class="{'current':active == item.typeId}" @click="navTap(item.typeId)"> {{item.typeName}} <i></i></li>
                </ul>
            </div>
            <div class="goods-wrapper" ref="goodsWrapper">
                <ul>
                    <li class="goods-list border-bottom" v-for="(item,index) in goodsList" :key="index" @click="goDetail(item)">
                        <div class="img">
                            <img :src="item.goodsPhoto" alt="">
                        </div>
                        <div class="content">
                            <h2 class="title">{{item.goodsName}}</h2>
                            <p class="norms">{{item.goodsSpecification}}</p>
                            <p class="price">{{item.goodsRetailPrice}} </p>
                            <p class="buy-pirce" v-if="userCode">{{item.goodsProcurementPrice}}</p>
                            <div class="cart-control-wrapper" @click.stop="">
                               
                                    <div class="cart-decrease icon-circle" v-show="item.goodsNum>0"  @click="editCart('minus',item)">
                                        <i class="iconfont icon-jian"></i>
                                        </div>
                                    <div class="cart-count" v-show="item.goodsNum>0" >{{typeof item.goodsNum == 'undefined'?$set(item,'goodsNum',0):item.goodsNum }}</div> 
                                    <div class="cart-add icon-circle" >
                                        <i class="iconfont icon-jiaru" @click="editCart('add',item)"></i>
                                       </div>
                               
                            </div>
                        </div>
                    </li>
                    <div class="bottom-tip" v-if="goodsList.length>0 ">
                        <span class="loading-hook"> <img src="../common/img/loading-svg/loading-spinning-bubbles.svg"> 加载中...</span>
                    </div>
                </ul>
                
                <div class="no-goods" v-if="goodsList.length<=0 && isLoad">数据载入中</div>
            </div>
          
            
            
           
        </div>
        <!-- <Footer></Footer>  -->
    </div>
    
</template>
<script>
    import BScroll from 'better-scroll'
     import RankHead from 'components/goods/RankHead.vue'
    import { getGoodsTypeData, getIndexData, getAddCartData, getCartCount } from 'common/api'

    import GoodsList from 'components/Index/GoodsList.vue'
    import Footer from 'components/common/c-footer'
    export default {
        data() {
            return {
                active: 1,
                tabStatus:0,
                typeName: [],
                title: '分类页面',
                goodsList: [],
                page: 1,
                loading: true,  //true为禁止，false 为启动
                isLoad:false,
                goodsNum: 0
            }
        },
        created(){
         
            this.active = this.$route.query.id || 1;

            this.getTypeName();
            this.$indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            })
            this.getGoodsTypeList('recommend');
           
         
           
        },
        computed: {
            userCode(){
                return this.$store.state.userCode == 'null'? '': this.$store.state.userCode;
            }
        },
        mounted(){
              this.$nextTick(() => {
                    this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                            click: true
                    })
                    this.goodsScroll = new BScroll(this.$refs.goodsWrapper,{
                            click: true,
                            scrollY: true,
                            pullUpLoad: {
                                threshold: -10, // 当上拉距离超过30px时触发 pullingUp 事件
                                mouseWheel: {    // pc端同样能滑动
                                    speed: 20,
                                    invert: false
                                },
                                useTransition:false  // 防止iphone微信滑动卡顿
                            }
            
                    });
                
             
                    this.goodsScroll.on('pullingUp', (pos) => {
                        
                        
                        if(this.goodsScroll ) { //&& !this.loading
                      
                                if(!this.loading){
                                    this.page++
                                    setTimeout(()=>{
                                        getGoodsTypeData({typeId:this.active,userCode:this.userCode,screening:'recommend',page:this.page}).then((response)=>{
                                        let res = response.data;
                                            console.log( res)
                                            if(res.flag == 'success'){
                                                this.goodsList  = res.typeGoodsList;
                                                if(res.msg== '已到底部'){ 
                                                    document.querySelector('.loading-hook').innerHTML = '~ 到底了 ~';
                                                    this.loading = true;           
                                                return;
                                                }
                                                this.loading = false;
                                            }
                                        },(err)=>{console.log(err)});

                                    },300)

                                }
                            
                        
                                this.goodsScroll.refresh()
                                this.goodsScroll.finishPullUp()
                            }
                        

                        
                        // this.goodsScroll.finishPullUp(); // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
                    })

            })
           
        },
         watch: {
        $route(){
            this.page =1;
            this.goodsList =[];
            this.getGoodsTypeList('recommend')
            }
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
                   console.log(res)
                let {data:res} = await getGoodsTypeData({typeId:this.active,userCode:this.userCode,screening:value,page:this.page});
                console.log(res)
                if(res.flag == 'success'){

                    this.goodsList = res.typeGoodsList;
                    this.loading = false;     
                }
               this.$indicator.close()
               this.isLoad = true
                

            },
            navTap(id){
                this.active = id;
                this.$router.push({
                     name:'goods',
                        query: {
                            id: id
                        }
                })
            },
               //上拉刷新
            loadMore(){
                let value = ''
                if(this.active == 1){
                   value = 'recommend';
                }else if(this.active == 2){
                    value = this.tabStatus == true?1:0;
                }else if(this.active == 3){
                    value = 'salesVolume';
                }
            },
            goDetail(item){
                this.$router.push({
                    name: 'id',
                    params: {goodsId: item.goodsId}
                })
            },
            // 加入购物车
            editCart(flag,item){
                if(flag == 'add'){
                    item.goodsNum++;
                }else if(flag == 'minus'){
                    if(item.goodsNum<=0){
                        return;
                    }
                    item.goodsNum--;
                }
              getAddCartData({userCode:this.userCode,goodsId:item.goodsId,shopId:item.shopId,goodsCount: item.goodsNum}).then(response=>{
                  let res = response.data;
                  if(res.flag == 'success'){
                        this.$store.commit('updateCartCount',1)
                  }
                  this.$toast({
                        message: res.info,
                        position:'middle',
                        duration: 2000
                    });
              })

            }

        },
        components: {
             RankHead,
             GoodsList,
             Footer 
        }
    }
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"
    
    .goods
        width 6.4rem
        display flex
        position absolute
        top .8rem
        // bottom .9rem
        bottom 0
        overflow: hidden;
        .menu-wrapper
            flex: 0 0 1.4rem;
            width: 1.4rem;
            background: #f8f8f8;
            overflow: hidden;
            .menu-list
                border-left 0.05rem solid $color-text
                height .8rem
                line-height .8rem
                text-align center
                color $color-text-d
                font-size  $font-info
                position relative
                // border-bottom 1px solid #dddddd
                i 
                  height 100%  
                  position absolute
                  width 1px
                  right 0
                  top 0
                  background #fff
                  display none
                &.current
                  border-left-color $color-theme  
                  background #fff
                  i 
                    display block
                  
                 
                 
                 
        .goods-wrapper
            flex: 1;  
            position relative  
            

            ul
                margin-left .2rem 
                .goods-list
                    padding .25rem 0
                    display: flex;
                  
                    .img
                        flex 0 0 1.15rem
                        margin-right .2rem
                        height 1.15rem
                        img 
                            width 100%
                            height  100%
                    .content
                        flex 1    
                        position relative
                        margin-right .2rem
                        .title
                            font-size $font-highlight
                            font-weight bold
                            height .25rem
                            line-height .25rem
                            color $color-highlight
                            width 3.25rem
                            text-overflow: ellipsis
                            overflow: hidden
                            white-space: nowrap
                        p 
                            padding-top .14rem
                            height .16rem
                            line-height .16rem
                            color $color-highlight
                            font-size $font-info
                            width 3.25rem
                            text-overflow: ellipsis
                            overflow: hidden
                            white-space: nowrap
                            &.buy-pirce
                                color $color-theme 
                        .cart-control-wrapper
                            position absolute
                            right  0
                            bottom 0
                            font-size: 0;
                            .cart-decrease, .cart-add
                                display: inline-block;
                               
                            .cart-count
                                display: inline-block;
                               
                                width .3rem
                                height .3rem
                                padding 0 .05rem
                                color: #000;
                                font-size $font-info
                                line-height: .3rem;
                                text-align: center;
                                font-size .18rem
                            .icon-circle
                                width .3rem
                                height .3rem
                                background  $color-theme
                                border-radius 50%
                                line-height .3rem
                                text-align center
                                font-size $font-info
                                i 
                                    font-size .18rem
                                    color #fff
                                    font-weight bold
            .bottom-tip
                width 100%
                height: 40px;
                line-height: 40px;
                text-align: center;
                color: #000;
                background: #fff;
                font-size .18rem
                .loading-hook
                    img 
                        width .3rem
              
                

           
            .no-goods
                display flex
                justify-content center
                height 100%
                align-items center
                font-size .2rem
                color #666                   
</style>


