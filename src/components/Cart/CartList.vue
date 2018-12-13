<template>
<div>
    <div class="cart">
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
            <div class="group" v-for="(goods,index) in item.shopList" :key="index">
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
                           <span class="box">
                               <a href="javascript:;" @click=" cheangeQuantity(goods,0)">-</a><input type="text" disabled  v-model="goods.goodsCount"><a href="javascript:;"  @click=" cheangeQuantity(goods,1)">+</a>
                           </span>
                        </p>
                        <p class="price">{{userLevel == 5? "零售价": "采购价"}}：￥{{goods.goodsPrice}} <span class="store">库存：{{goods.goodsInventory}}</span></p>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
   
    <div class="footer-fiexd" v-show="cartList.length>0">
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
            }
        },
        created(){
          this.userLevel = this.getCookie('userLevel');
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
                   
                    
                   
                
            }
            
         }
    }
</script>
<style lang="stylus" scoped>
    .cart
        padding-bottom .9rem
        background #fff
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
           .group-check
               margin  0 .2rem
               float left
               vertical-align middle
               line-height 1.9rem
               i
                font-size 0.36rem

                &.icon-xuanzhong
                    color #cc3e2e
                
           .group-detail
               float left
               width 5.6rem
             
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
                   width 3.6rem
                  
                   .title
                       padding .2rem 0
                       font-size .24rem
                       font-weight bold
                       text-overflow ellipsis
                       white-space nowrap
                       overflow hidden
                   .specification
                       font-size .2rem
                       color #787878
                       position relative
                       padding .2rem 0

                       span 
                         
                         display inline-block
                         &.text
                             line-height .3rem
                         &.box
                             float right
                            
                             background pink 
                             input 
                                float left
                                width .3rem
                                height .3rem
                                border-top 1px  solid #ccc
                                border-bottom 1px solid #ccc
                                outline none
                                line-height .3rem
                                text-align center
                                background #fff
                                font-size .2rem
                             a 
                                float left
                                border 1px solid #ccc
                                width .3rem
                                height .3rem
                                line-height .3rem
                                text-align center
                                background #fff
                                color  #000
                                font-size .24rem

                   .price
                       font-size .2rem
                       color #dc143c
                       position relative
                       padding .1rem 0

                       .store
                           position absolute 
                           bottom 0
                           right  0
                           color #787878
    .empty-goods
        color #222
        text-align center
        margin-top 2.5rem
        font-size .26rem
        font-weight bold
        
    .footer-fiexd
        position fixed
        bottom .88rem
        width 6.4rem
        height .9rem
        line-height  .8rem
        background #fff
        overflow hidden
        margin 0 auto
        .all-check
             margin  0 .2rem
             float left
             i 
                font-size .36rem
                vertical-align middle
                &.icon-xuanzhong
                    color #cc3e2e
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
            background-image linear-gradient(-90deg,#e93b3d,#ff9574);
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


</style>    