<template>
    <div class="order-write">
        <mt-header title="填写订单" >
            <span to="" slot="left" @click="$router.go(-1)">
                <mt-button icon="">
                    <i class="iconfont icon-fanhui"></i>
                </mt-button>
            </span>        
        </mt-header>
        <div class="hint">
            <i class="iconfont icon-iconfontzhizuobiaozhun023132"></i>
            温馨提示：发票为必填项，请确认相关商品信息后提交订单
        </div>
        <div class="address" @click="addressFlag=!addressFlag">
            <div class="come-door">上门自提</div>
            <div class="text">四川省广汉市东莞路二段10号内一号市场二层<br/><span>上午9:00—下午17:00</span> 咨询电话：<a href="javascript:;">13658050467</a> 王</div>
        </div>
        <div  class="goods-wrap">
            <div class="cart-wrap" v-for="item in goodsList">
                <div class="shop">
                    <div class="shop-icon list">
                        <i class="iconfont icon-guanzhudianpu"></i>
                    </div>
                    <div class="shop-name list">
                        <router-link :to="{name:'shop',params:{shopId:item.shopId}}" class="name">{{item.shopName}}</router-link>
                    </div>
                </div>
                <div class="group" v-for="goods in item.shopList">
                    <div class="group-detail">
                        <div class="item-img" @click="$router.push({name:'id',params:{goodsId:goods.goodsId}})">
                            <img :src="goods.goodsPhoto" alt="">
                        </div>
                        <div class="item-info">                            
                            <p class="title">{{goods.goodsName}}</p>
                            <p class="specification">
                                <span class="text">规格：{{goods.goodsSpecification}}</span>
                                <span class="box">
                                   x{{goods.goodsCount}}
                                </span>
                            </p>
                            <p class="price">采购价：￥{{goods.goodsPrice}} </p>
                            
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
        <div class="invoice-wrap">
            <h3 class="name">发票</h3>
            <div class="desc" @click=" invoiceFlag = !invoiceFlag">
                <span class="red">纸质</span>(商品明细--{{invoiceType}}) 
                <span class="go">〉</span>
            </div>
        </div>
        <div class="footer-fiexd">
            <div class="total-wrap">
                <div class="total">合计:￥{{totalMoney}}</div>
                <div class="next-btn"  @click="submitOrder">提交订单</div>
            </div>
        </div>
        <OrderInvoice v-show="invoiceFlag" v-on:listenToChild= "getBackMsg" v-on:childSaveMasg = "getSaveMsg"></OrderInvoice>    
        <Address v-show="addressFlag" @addressInfo="getAddressBack"></Address>
        <router-view></router-view>
    </div>
</template>
<script>
    import OrderInvoice from 'components/Order/OrderInvoice'
    import Address from 'components/Order/Address'
    export default {
        data(){
            return {
                goodsList: [],
                goodsIdArr: [],
                orderIdArr:[],
                shopArr: [],
                invoiceType: '个人',
                invoiceName: '',
                taxpayerNumber: '',
                invoiceFlag: false,
                count: '',
                addressFlag: false
              
            }
        },
        created(){
            this.userCode = this.getCookie('userCode')
            let goodsStr = sessionStorage.getItem('goods');
            this.goodsList = JSON.parse(goodsStr)
        },
        computed: {
            totalMoney(){
                let totalPrice = 0;
                
                this.goodsList.forEach((item,index)=>{
                   
                    item.shopList.forEach((ele,i)=>{
                        totalPrice += ele.goodsPrice * ele.goodsCount;
                        this.goodsIdArr.push(ele.goodsId)
                        this.orderIdArr.push(ele.orderId)   
                        this.shopArr.push(ele.shopId)
                       this.count = ele.goodsCount
                    })

                })     
                
                return totalPrice.toFixed(2)
            }
        },
        methods: {
            submitOrder(){
                
                if(!this.invoiceName){
                    this.$toast({
                        message: '请填写发票信息！',
                        position:'middle',
                        duration: 2000
                    });
                    return   
                };
                //店铺id去重
                let obj = {}
                for(let i=0;i<this.shopArr.length;i++){
                    let cur = this.shopArr[i];
                    if(obj[cur] == cur){
                        this.shopArr[i] = this.shopArr[this.shopArr.length-1];
                        this.shopArr.length --;
                        i--;
                        continue;
                    }
                    obj[cur] =cur;
                }
                obj = null;


                let goodsStr = this.goodsIdArr.join(',');
                let orderStr = this.orderIdArr.join(',')
                let shopStr = this.shopArr.join(',');
                let data = {}
                if(this.$route.query.id == 0){

                    data = {
                        userCode:this.userCode,
                        invoiceType:this.invoiceType,
                        invoiceName:this.invoiceName,
                        taxpayerNumber:this.taxpayerNumber,
                        addressId:'',
                        receiverType:'上门自提',
                        goodsId:goodsStr,
                        shopId:shopStr,
                        goodsPriceTotal:this.totalMoney,
                        goodsCount:this.count
                    }

                 }else{
                      data = {
                        userCode:this.userCode,
                        invoiceType:this.invoiceType,
                        invoiceName:this.invoiceName,
                        taxpayerNumber:this.taxpayerNumber,
                        addressId:'',
                        receiverType:'上门自提',
                        orderId:orderStr,
                        shopId:shopStr,
                        goodsPriceTotal:this.totalMoney,
                    }

                 }
                this.$http.post('Order/addOrder',data,{
                transformRequest:[function(data){
                    let params = '';
                    for(let key in data){
                        params += key +'='+data[key]+'&'
                    }
                    return params
                }]
                }).then(response=>{
                    let res = response.data;
                    if(res.flag == 'success'){
                    //   let id =res.orderNumber     
                    sessionStorage.clear() 
                    this.$toast({
                        message: res.info,
                        position:'middle',
                        duration: 2000
                    });   
                    setTimeout(()=>{
                        this.$router.push({
                            name: 'myorder',
                            params: {id:1}
                        })
                    },2000)  
                    
                    }else{
                    this.$toast({
                        message: res.info,
                        position:'middle',
                        duration: 2000
                    });
                    }
                })
                
            },
            getBackMsg(data){
                this.invoiceFlag = data.boole;
                // this.invoiceType = data.type;
               
            },
            getSaveMsg(data){
               
                this.invoiceFlag = data.boole;
                this.invoiceType = data.type;
                this.invoiceName = data.name;
                this.taxpayerNumber = data.number;
            },
            goAddress(){
                this.$router.push({
                    name: 'address'
                })
            },
            getAddressBack(){
              this.addressFlag = false;
            }
        },
        components: {
            OrderInvoice,
            Address
        }
    }
</script>
<style lang="stylus" scoped>
    .order-write
        background #fff
        width 6.4rem
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        margin 0 auto
        overflow-y auto
        .mint-header
            background #ffffff;
            color #000
            font-size 18px
            .mint-header-button 
                .iconfont 
                    font-size 20px
                .mint-header-title
                    font-weight bold
        .hint
            background #f08080
            height .6rem
            color #fff
            line-height .6rem
            font-size .22rem
            i 
                font-size .28rem
                padding 0 .1rem 0 .15rem
        .address 
            padding .2rem .15rem
            overflow hidden
            div
                float left
                font-size .2rem
            .come-door  
                width 1.2rem
                line-height .6rem
                height .6rem
            .text
                padding 0
                width 4.9rem
                line-height .3rem
                height .6rem
                span
                    color #ff2d2d
                    padding  0 .05rem
        .goods-wrap            
            .cart-wrap
                .shop
                    overflow hidden
                    background #e4e4f6
                    height .6rem
                    line-height .6rem 
                    .list
                        float left       
                    .shop-icon                 
                        margin 0 .1rem
                        i 
                            font-size 0.32rem
                            color #707070
                    .shop-name  
                        width 5rem 
                        font-size .24rem       
                        .name 
                            color #000000   
                            font-weight bold
                            
                .group
                    overflow hidden
                    .group-detail
                        float left
                        width 6.4rem                      
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
                            width 4.5rem
                            
                            .title
                                padding .2rem 0
                                font-size .24rem
                                font-weight bold
                                overflow hidden
                                text-overflow ellipsis
                                white-space nowrap
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
                                        padding 0 .2rem
                                        font-size .24rem
                            .price
                                font-size .2rem
                                color #f00
                                position relative
                                padding .1rem 0
        .invoice-wrap
            overflow hidden
            height .5rem
            line-height .5rem
            font-size .2rem
            padding-bottom .8rem
            margin .3rem 0
            .name{
                float left
                padding  0 .2rem
            }
            .desc
                float right 
                color #000
                .red
                    color #ff0000
                .go 
                    padding 0 .1rem      
                    color #c7c7cc         

        .footer-fiexd
            position fixed
            bottom 0
            width 6.4rem
            height .8rem
            line-height  .8rem
            background #f5f5f5
            overflow hidden
            .total-wrap
                float right 
                font-size .26rem
                .total
                    float left
                
                    font-weight bold
                    margin-right .2rem
                    color #ff0000
                .next-btn
                    float right
                    height 100%
                    width 2rem
                    text-align center
                    background #ff0000
                    color #fff
</style>

