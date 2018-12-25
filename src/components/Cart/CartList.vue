<template>

<div class="cart" :style="{'padding-bottom': paddingVal}">
    <div class="cart-wrap" v-for="(item,index) in  cartList" :key="index">
        <div class="shop">
            <div class="check-btn list">
                <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':item.checked}" @click=" selectedShop(item,item.shopList)"></i>
            </div>
            <div class="shop-icon list">
                <i class="iconfont icon-guanzhudianpu"></i>
            </div>
            <div class="shop-name list">
                <router-link :to="{name:'shop',params:{shopId:item.shopId}}" class="name">{{item.shopName}}</router-link>
            </div>
        </div>
        <div class="group border-bottom" v-for="(goods,index) in item.shopList" :key="index">
            <div class="group-check" >
                    <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':goods.checked}" @click="selectedProduct(goods,item.shopList,item)"></i>
            </div>
            <div class="group-detail" >
                <div class="item-img" @click="$router.push({name:'id',params:{goodsId:goods.goodsId}})">
                    <img v-lazy="goods.goodsPhoto" :key="goods.goodsPhoto">
                </div>
                <div class="item-info">
                    
                    <p class="title">{{goods.goodsName}}</p>
                    <p class="specification">
                        <span class="text">规格：{{goods.goodsSpecification}}</span>
                        
                    </p>
                    
                        <div class="bottom">
                        <p class="price">{{userLevel == 5? "零售价": "采购价"}}：￥{{goods.goodsPrice}} </p>
                            <div class="cart-control-wrapper"  >
                            <!--  -->
                        
                            <div class="cart-decrease icon-circle border"  @click=" editCart('minus',goods)">
                                <i class="iconfont icon-jian"></i>
                                </div>
                            <div class="cart-count" >{{typeof goods.goodsNum == 'undefined'?$set(goods,'goodsNum',0):goods.goodsNum }}</div> 
                            <div class="cart-add icon-circle border" @click=" editCart('add',goods)" >
                                <i class="iconfont icon-jiaru"></i>
                            </div>
                    
                            </div>
                        </div>
                    
                    
                </div>
            </div>
        </div>
    </div>

    <div class="footer-fiexd"  :class="{'fiexd':fiexdStatus}">
        <div class="all-check" @click="checkAllFlag?checkAll(false):checkAll(true)">
            <i class="iconfont icon-weixuanzhong" :class="{'icon-xuanzhong':checkAllFlag}"></i>
            <span>全选</span>
        </div>
        <div class="total">商品合计<span>￥{{countTotalPrice}}</span></div>
        
        
        <div class="next-btn" @click="nextStep" v-show="!deleteStatus">去结算()</div>
        
        <div class="delete" v-show="deleteStatus" @click="deleteGoods">
            删除()
        </div>
    </div>

</div>

    

    
</template>
<script>
    import {getCartData , getCartCount, getCartPay , getCartDelete } from 'common/api'
    export default {
        props: {
            goodsList:{
                type: Array
             },
            deleteStatus: {
                type:Boolean
            },
            userCode: {
                 type: String
            },
            isLoad: {
                 type:Boolean
            },
          
        },
        data() {
            return {
               userLevel: '', 
               checkAllFlag: false,
               orderArr: [],
               orderStr: '',
               selectAll: [],
               fiexdStatus: false,
               paddingVal: 0
            }
        },
        created(){
          this.userLevel = this.getCookie('userLevel');
        },
        mounted(){
            
                window.addEventListener('scroll', this.handleScroll,false)
           
        },
        watch: {
           
        },
       
        computed:{
            cartList(){
                return this.goodsList;
            },
            //计算总价
            countTotalPrice(){
                let totalPrice = 0;
                if(!this.cartList){
                    return
                }
                this.cartList.forEach((item,index)=>{
                    if (item.checked) {
                        item.shopList.forEach((ele,i)=>{
                            if (ele.checked){
                                totalPrice += ele.goodsPrice * ele.goodsCount
                                
                            }
                        })
                    }else{
                        item.shopList.forEach((ele,i)=>{
                            if (ele.checked){
                                totalPrice += ele.goodsPrice * ele.goodsCount                              
                            }           
                        })
                    }
                  
                })            
              
                return totalPrice.toFixed(2);
            }
        },
         methods:{
            
            //数量加减
            async cheangeQuantity(item,status){
                if(status>0){
                    item.goodsCount++;
                    if(item.goodsCount >= item.goodsInventory){
                        item.goodsCount = item.goodsInventory;
                    }

                }else{
                    item.goodsCount--;
                    if(item.goodsCount < 1){
                        item.goodsCount = 1
                    }
                }
                let {data:res} = await getCartCount({userCode:this.userCode,orderId:item.orderId,goodsCount:item.goodsCount});
                if(res.flag == 'success'){
                  
                }else{
                     console.log(res.infn)
        
                }
            },
            //商品单选
            selectedProduct(goods,goodsList,items){
             
                if(typeof goods.checked == 'undefined'){
                    this.$set(goods,'checked',true)
                     
                }else{
                    goods.checked = !goods.checked;
                }

                items.checked = true;
                goodsList.forEach((item,index)=>{
                    
                    if(!item.checked){
                        items.checked = false;
                    }
                })
                // console.log( goods.checked)
                 //长度不够全选取消
                this.checkAllFlag = true;
                this.cartList.forEach((item,index)=>{
                    if(!item.checked){
                        this.checkAllFlag = false;
                    }
                })
              
            },
            //店铺选中及商品全选
            selectedShop(list,items){
                //店铺选中
                if(typeof list.checked == 'undefined'){
                    this.$set(list,'checked',true);
                    
                }else{
                   list.checked = !list.checked;
                }
                //商品全选
                items.forEach((item,index)=>{
                    if(typeof item.checked == 'undefined'){
                        this.$set(item,'checked',true);
                    }else{
                        item.checked = list.checked;
                    }
                })  
                 //长度不够全选取消
                this.checkAllFlag = true;
                this.cartList.forEach((item,index)=>{
                    if(!item.checked){
                        this.checkAllFlag = false;
                    }
                })
                
            },
            //全选
            checkAll(flag){
                this.checkAllFlag = flag;
                this.cartList.forEach((item,index)=>{
                    if(typeof item.checked == 'undefined'){
                        this.$set(item,'checked',this.checkAllFlag);
                    }else{
                        item.checked = this.checkAllFlag;
                    }
                   item.shopList.forEach((item,index)=>{
                        if(typeof item.checked == 'undefined'){
                            this.$set(item,'checked',true);
                        }else{
                            item.checked = this.checkAllFlag
                        }
                    })  
                })
            },
            //结账
            async nextStep(){
                if(this.countTotalPrice<=0){
                    this.$toast({
                        message: '请选择商品哦！',
                        position:'middle',
                        duration: 2000
                    });
                }else{
                    this.orderArr = [];
                    this.cartList.forEach((item,index)=>{
                        if (item.checked) {
                            item.shopList.forEach((ele,i)=>{
                                if (ele.checked){
                                   
                                    this.orderArr.push(ele.orderId)             
                                }
                            })
                        }
                       
                        else{
                            item.shopList.forEach((ele,i)=>{
                                if (ele.checked){
                                    this.orderArr.push(ele.orderId)             
                                }           
                            })
                        }
                    
                    })            
                    this.orderStr = this.orderArr.join(',')
                    //结算数据
                    let {data:res} = await getCartPay({userCode:this.userCode,orderId:this.orderStr});
                    if(res.flag == 'success'){
                        let goods =  JSON.stringify(res.data)
                        sessionStorage.setItem('goods',goods)
                        this.$router.push({
                            name: 'order',
                                query: {id:1}
                        })
                    }else{       
                        this.$toast({
                            message: res.info,
                            position:'middle',
                            duration: 2000
                        });  
                    }
                }
            },
            //删除
            deleteGoods(){
                
                this.orderArr = []
                this.cartList.forEach((item,index)=>{
                    if (item.checked) {
                        
                        item.shopList.forEach((ele,i)=>{
                            if (ele.checked){
                                this.orderArr.push(ele.orderId)      
                            }
                        })
                    }
                    else{
                        item.shopList.forEach((ele,i)=>{
                            if (ele.checked){
                                this.orderArr.push(ele.orderId)             
                            }           
                        })
                    }
                
                })    
                let  orderStr = this.orderArr.join(',');   
                if(this.orderArr.length<=0){
                    this.$toast({
                        message: '请选择删除的商品！',
                        position:'middle',
                        duration: 2000
                    });
                }else{
                    let msg =  `确定删除这${this.orderArr.length}个商品?`
                    this.$messagebox.confirm(msg).then(action => { 
                       
                        getCartDelete({userCode:this.userCode,orderId:orderStr}).then(res=>{
                            if(res.data.flag == 'success'){                        
                            this.$toast({
                                message: res.data.info,
                                position:'middle',
                                duration: 2000
                            });
                            
                            this.$emit('deleteSucceed')
                          
                                
                            }else{       
                                this.$toast({
                                    message: res.data.info,
                                    position:'middle',
                                    duration: 2000
                                });
                            
                            }
                        },err=>{console.log(err)})
                        
                    }).catch(err=>{})

                }
                   
                    
                   
                
            },
            // 滚动固定位置
            handleScroll(){
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                // console.log( scrollTop)
                var parentH =  document.querySelector('.cart').parentNode.offsetHeight,
                    cartH =  document.querySelector('.cart').offsetHeight;
                //   console.log( parentH, cartH)

                  if(cartH >parentH && scrollTop>0){
                      this.fiexdStatus = true;
                      this.paddingVal = '.8rem';
                  }else{
                     this.fiexdStatus = false; 
                     this.paddingVal = 0
                  }
            }
         },
         destroyed(){
              window.removeEventListener('scroll', this.handleScroll,false)
         }
    }
</script>
<style lang="stylus" scoped>
    .cart
        background #fff
        margin .15rem .15rem .95rem .15rem
        // padding-bottom .9rem
       

       .shop
           overflow hidden
           background #e4e4f6
           height .6rem
           line-height .56rem 
           border-top 0.01rem solid #c8c7cc 
           border-bottom 0.01rem solid #c8c7cc
           .list
               float left
               
           .check-btn
               margin  0 .2rem
              
               i 
                font-size 0.36rem
                &.icon-xuanzhong
                    color #cc3e2e
                
           .shop-icon
               
               margin-right .1rem
               i 
                font-size 0.36rem
            .shop-name  
               width 5rem 
               font-size .24rem
              
               .name 
                 color #010101   
       .group
           overflow hidden
           padding .4rem 0
           display flex
           align-items center
           width 6.1rem
           height 1.65rem
           .group-check
               padding  0 .2rem
               flex 0 0 .4rem
               width .4rem 
               i
                font-size 0.36rem

                &.icon-xuanzhong
                    color #ff6600
                
           .group-detail

                flex 1
                max-width calc(100% - .8rem)
                display flex
              
               .item-img
                   flex 0 0 1.65rem
                   width 1.65rem
                   height 1.65rem
                   img 
                      width 100%
                      height 100%
               .item-info
                    flex 1
                    padding 0 .25rem 
                    max-width calc(100% - 1.65rem - .5rem)
                   .title
                       font-size .24rem
                       font-weight bold
                       text-overflow ellipsis
                       white-space nowrap
                       overflow hidden
                       padding  .05rem 0
                       color #474747
                   .specification
                       font-size .18rem
                       color #9a9a9a
                       padding .1rem 0 .6rem 0
                    .bottom
                        display flex
                        align-items center    

                        .price
                            flex 1
                            font-size .2rem
                            color #dc143c
                            position relative
                            

                            .store
                                position absolute 
                                bottom 0
                                right  0
                                color #787878
                        .cart-control-wrapper
                            flex 1
                            font-size: 0;
                            text-align right
                            .cart-decrease, .cart-add
                                display: inline-block;
                                
                            .cart-count
                                display: inline-block;
                                
                                width .36rem
                                height .36rem
                                padding 0 .05rem
                                color: #000;
                                font-size $font-info
                                line-height: .36rem;
                                text-align: center;
                                font-size .22rem

                            .icon-circle
                                width .36rem
                                height .36rem
                                background  $color-theme
                                border-radius 50%

                                line-height .36rem
                                text-align center
                                font-size $font-info
                                &:before
                                    border-radius 50%

                                i 
                                    font-size .18rem
                                    color #000
                                    font-weight bold
    
        .footer-fiexd
            // position fixed
            // bottom .88rem
            // width 6.4rem
            height .8rem
            line-height  .8rem
            background #fff
            overflow hidden
            // margin 0 auto
            .all-check
                margin  0 .2rem
                float left
                i 
                    font-size .36rem
                    vertical-align middle
                    &.icon-xuanzhong
                        color #ff6600
                span 
                    font-size .22rem
            
            
            .total
                float left
                font-size .22rem
                font-weight bold
                margin-right .2rem
                color #000000
                span    
                    color #ff6600
                    font-size .26rem
            .next-btn
                float right
            
                width 1.7rem
                text-align center
                // background #f86320
                color #fff
                display inline-block
                line-height .7rem
                border-radius .5rem
                font-size .24rem
                margin-right .3rem
                background linear-gradient(-90deg,#e93b3d,#ff9574);
                margin-top .05rem
            .delete
                float right 
                font-size .24rem
                height .7rem
                width 1.7rem
                text-align center
                line-height .7rem
                background #fe4600
                color #fff
                margin-right .3rem
                border-radius .05rem
                margin-top .05rem
            &.fiexd
                width 6.1rem
                position fixed
                bottom .88rem

</style>    