<template>
    <transition name="slide">
        <div class="collect">
            <mt-header title="我的收藏" fixed>
                <span to="" slot="left" @click="$router.back()">
                    <mt-button icon="">
                        <i class="iconfont icon-fanhui"></i>
                    </mt-button>
                    
                </span>   
                <mt-button icon="" slot="right" @click="edit">{{isShow==true?'完成':'编辑'}}</mt-button>     
            </mt-header>
            <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="isAutoFill" :bottom-all-loaded="allLoaded">
                <div class="collect-goods" >
                    <div class="group" :class="{'active': isShow}" v-for="(item,index) in collectList" :key="index">
                        <div class="group-check" >
                            <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':item.checked}" @click="selectedProduct(item)" ></i>
                        </div>
                        <div class="group-detail" >
                            <div class="item-img" >
                                <img v-lazy="item.goodsPhoto" >
                            </div>
                            <div class="item-info" @click="goDetail(item)">
                            
                                <p class="title">{{item.goodsName}}</p>
                                <p class="specification">{{item.goodsSpecification}}</p>
                                <p class="specification">{{item.goodsRetailPrice}}</p>
                                <p class="price">{{item.goodsProcurementPrice}} <span class="store">库存：{{item.goodsInventory}}</span></p>
                                
                            </div>
                        </div>
                    </div>
                    <div class="collect-empty" v-show="collectList.length<=0">
                        您还没有收藏商品！
                    </div>
                    
                </div>
            </mt-loadmore>
            
            <div class="footer-fiexd" v-show="isShow">
                <div class="all-check" @click="checkAllFlag?checkAll(false):checkAll(true)">
                    <i class="iconfont icon-weixuanzhong" :class="{'icon-xuanzhong':checkAllFlag}"></i>
                    <span>全选</span>
                </div>
                <div class="delete"  @click="deleteCollect">
                    删除
                </div>
            </div>
        </div>
    
    </transition>
    
</template>
<script>
    export default {
        data(){
            return {
                userCode: '',
                collectList: [],
                isShow: false,
                checkAllFlag: false,
                goodsArr: [],
                page: 1,
                isAutoFill:false,//是否自动检测，并调用loadBottom
                allLoaded:false,//数据是否全部加载完毕，如果是，禁止函数调用
            }
        },
        created(){
            this.userCode = this.getCookie('userCode');
            if(this.userCode){
                this.getCollectData();
            }
           

        },
        methods: {
            //取数据
            getCollectData(){
                 this.$http.post('Collect/index',{userCode: this.userCode,page:this.page},{
                        transformRequest:[function(data){
                        let params = '';
                        for(let key in data){
                            params += key +'='+data[key]+'&'
                        }
                        return params
                    }]
                }).then(response => {
                    let res = response.data;
                  console.log(res)
                    if(res.data){
                        this.collectList = res.data
                        this.page++
                    }else{
                        this.collectList = []

                    }
                     
                }).catch(err=>{
                    console.log(err);

                })
            },
              //上拉刷新
            loadBottom(){
                this.$http.post('Collect/index',{userCode: this.userCode,page:this.page},{
                    transformRequest:[function(data){
                        let params = '';
                        for(let key in data){
                            params += key +'='+data[key]+'&'
                        }
                        return params
                    }]
                }).then((response) => {
                    let res = response.data;
                    // console.log(res)
                  
                    this.collectList =res.data;
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
                    
                })
                .catch(err=>console.log(err));
            },
            //单选
            selectedProduct(item){
                if(typeof item.checked == 'undefined'){
                    //设置属性
                    this.$set(item,'checked',true)
                }else{
                    item.checked = !item.checked
                }
                this.checkAllFlag = true;
                this.collectList.forEach((item,index)=>{
                    if(!item.checked){
                        this.checkAllFlag = false;
                    }
                })
            },
            checkAll(flag){
                this.checkAllFlag =flag;

                this.collectList.forEach((item,index)=>{
                     if(typeof item.checked == 'undefined'){
                        this.$set(item,'checked',this.checkAllFlag);
                    }else{
                        item.checked = this.checkAllFlag
                    }
                })
            },
            //编辑
            edit(){
                 this.isShow = !this.isShow;
            },
            //删除
            deleteCollect(){
                this.goodsArr = []
                this.collectList.forEach((item,index)=>{
                    if(item.checked){
                        this.goodsArr.push(item.collectId)
                    } 
                })
                let str = this.goodsArr.join(',');
               
                if(this.goodsArr.length>0){
                    
                    this.$messagebox.confirm('确定执行此操作?').then(action => { 
                        this.$http.post('Collect/delCollect',{userCode: this.userCode,collectId:str},{
                            transformRequest:[function(data){
                                let params = '';
                                for(let key in data){
                                    params += key +'='+data[key]+'&'
                                }
                                return params
                            }]
                        }).then(response => {
                            let res = response.data;
                                
                            
                            if(res.flag == 'success'){
                               this.$toast({
                                    message: res.info,
                                    position:'middle',
                                    duration: 2000
                                });
                                setTimeout(()=>{
                                     this.getCollectData();
                                },2000)
                            }else{
                                this.$toast({
                                    message: res.info,
                                    position:'middle',
                                    duration: 1000
                                });

                            }
                            
                        }).catch(err=>{console.log(err);})
                    }).catch(err=>{})
                }else{
                    this.$toast({
                        message: '请选择删除的商品！',
                        position:'middle',
                        duration: 2000
                    });
                }
                
            },
            //去商品详情页
            goDetail(item){
                this.$router.push({
                    name: 'id',
                    params: {
                        goodsId: item.goodsId
                    }
                })
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
    .collect
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        width 6.4rem
        // margin 0 auto
        background #fff
        overflow-y auto
        z-index 999
        .mint-header
            width 6.4rem
            margin 0 auto
            background #fff;
            color #000
            font-size 18px
            .mint-header-button 
                .iconfont 
                    font-size 20px
                .mint-header-title
                    font-weight bold  
    .collect-goods
        padding-top 40px
        .group
            overflow hidden
            border-bottom 1px solid #ccc
            &.active
                .group-check
                    display block
                .group-detail
                    width 5.8rem    
                    .item-info
                        width 3.8rem
           .group-check
               padding  0 .1rem
               float left
               vertical-align middle
               line-height 1.9rem
               width .4rem
               display none;
               i
                font-size 0.36rem

                &.icon-xuanzhong
                    color #cc3e2e
            
           .group-detail
               float left
               width 6.4rem
               overflow hidden
               .item-img
                   width 1.5rem
                   height 1.5rem
                   margin  .2rem
                   float left
                   img 
                      width 100%
                      height 100%
               .item-info
                   float left
                   width 4.3rem
                   .title
                       padding .2rem 0
                       font-size .24rem
                       font-weight bold
                       overflow hidden
                       text-overflow ellipsis 
                       white-space nowrap
                   .specification
                       font-size .22rem
                       color #787878
                       position relative
                       padding .1rem 0
                       overflow hidden
                       text-overflow ellipsis 
                       white-space nowrap      
                   .price
                       font-size .22rem
                       color #ff0000
                       position relative
                       padding .1rem 0
                       
                       .store
                           position absolute 
                           bottom 0
                           right  0
                           color #787878
    .collect-empty
        text-align center
        line-height 3rem
        font-size .24rem
        font-weight bold
        color #222


    .footer-fiexd
        position fixed
        bottom 0
        width 6.4rem
        height .8rem
        line-height  .8rem
        background #f5f5f5
        overflow hidden
        .all-check
             margin  0 .2rem
             float left
             i 
                font-size .36rem
                vertical-align middle
                &.icon-xuanzhong
                    color #cc3e2e
             span 
                font-size .24rem
        .delete
            float right 
            font-size .26rem
            height 100%
            width 1.5rem
            text-align center
            background #e4393c
            color #fff

                
</style>


