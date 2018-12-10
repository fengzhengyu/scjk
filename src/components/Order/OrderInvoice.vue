<template>
    <transition name="slide">
        <div class="invoice-page">
            <mt-header title="设置发票信息">
                <span to="" slot="left" @click="invoiceFlag">
                    <mt-button icon="">
                        <i class="iconfont icon-fanhui"></i>
                    </mt-button>
                </span>        
            </mt-header>
            <div class="hint">
                <i class="iconfont icon-iconfontzhizuobiaozhun023132"></i>
                <span>请认认真真填写发票信息，包括公司名称和纳税人识别号，核实确保准确无误再提交</span>
                
            </div>
            <div class="type">
                <p>发票类型</p>
                <div>普通发票</div>
            </div>
            <div class="header">
                <p>发票抬头</p>
                <div class="tabs-btn">
                    <span class="btn" @click="active = 0, invoiceName =''">
                        <i class="iconfont icon-weixuanzhon1 " :class="{'icon-xuanzhong':active==0}"></i>
                        个人
                    </span>
                    <span class="btn" @click="active = 1,invoiceName ='',taxpayerNumber=''">
                        <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':active==1}"></i>
                        公司
                    </span>
                </div>
                <div class="tabs-content">
                    <div class="content" v-show="active == 0">
                        <input type="text" placeholder="填写个人姓名" v-model="invoiceName" >
                    </div>
                    <div class="content" v-show="active == 1">
                        <input type="text" placeholder="填写公司名称" v-model="invoiceName" >
                        <input type="text" placeholder="纳税人识别号" v-model="taxpayerNumber">
                    </div>
                </div>
            </div>
            <div class="container">
                <p>发票内容<span>发票内容选项已根据税法调整，具体请以展示为准</span></p>
                <div>商品明细</div>
                <span>发票内容将显示详细商品名称和价格信息</span>
            </div>
            <div class="submit">
                <div class="btn" @click="save">保存</div>
            </div>
        </div>    
    </transition>
   
</template>
<script>
    export default {
      
        data(){
            return {
                active: 0,
                invoiceName: '', //抬头
                taxpayerNumber: '' , //纳税人识别号
                status: true
               
            }
        },
        created(){

        },
        methods: {
            save(){
                

                if(this.active == 0){
                    if(this.invoiceName == '' || this.invoiceName == null){
                        this.$toast({
                            message: '个人名称不能为空',
                            position:'middle',
                            duration: 2000
                        });
                    }else{
                       
                        let invoice = {
                            type: '个人',
                            name: this.invoiceName,
                            boole: false
                        }

                      
                        this.$emit('childSaveMasg',invoice)
                        this.$router.go(-1)
                     
                    }
                }else{
                    if(this.invoiceName == '' || this.invoiceName == null){
                        this.$toast({
                            message: '个人名称不能为空',
                            position:'middle',
                            duration: 2000
                        });
                    }else if(this.taxpayerNumber == '' ||this.taxpayerNumber ==null){
                         this.$toast({
                            message: '纳税人识别号不能为空',
                            position:'middle',
                            duration: 2000
                        });   
                    }else{
                        let invoice = {
                            type: '公司',
                            name: this.invoiceName,
                            number: this.taxpayerNumber,
                            boole: false
                        }
                         this.$emit('childSaveMasg',invoice)
                         this.$router.go(-1)
                    }
                }
                    
                
            },
            invoiceFlag(){
                // let data = {
                //     type: '个人',
                //     boole: false
                // }
                // this.$emit('listenToChild',data);
                this.$router.go(-1)

                
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
    .invoice-page
        position fixed
        top 0
        right 0
        left 0
        bottom 0
        width 6.4rem
        margin 0 auto;
        background #ffffff
        .mint-header
            background #f5f5f5;
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
            font-size .2rem 
            i 
                font-size .28rem
                padding 0 .1rem 0 .15rem
                float left 
                width .4rem
                height .6rem
                line-height .6rem
            span
                float left 
                width 5.7rem
                line-height .26rem
                padding-top .05rem
               
        .type
            padding .15rem
            p 
                font-size .24rem
                font-weight bold
                color #000
                padding  .25rem 0
            div
                width 1.2rem
                height .4rem
                border .01rem solid #ff4040
                color #ff5454
                text-align center
                line-height .4rem
                box-shadow 0 0.02rem 0.05rem 
        .header
            padding  0.7rem .15rem 0.45rem .15rem
            p 
                font-size .24rem
                font-weight bold
                color #000
            .tabs-btn
                padding  .2rem 0
                .btn 
                    font-size .22rem
                    color #000
                    padding .1rem .3rem .1rem 0
                    i 
                        font-size .36rem
                        vertical-align middle
                        color #a2a2a2
                        &.icon-xuanzhong
                            color #cc3e2e
            .tabs-content
                .content

                    input 
                        width 5.9rem
                        height .4rem
                        padding .1rem
                        border .01rem solid #cccccc    
                        outline none 
                        border-radius .15rem
                        background #efeff4
                        font-size .22rem
                        margin-bottom .2rem
        .container
            font-size .22rem
            padding .15rem
            p 
                font-size .24rem
                font-weight bold
                color #000
                padding  .25rem 0
                span 
                    font-size .22rem
                    color #999999
                    margin-left .2rem
                    font-weight normal
            div
                width 1.2rem
                height .4rem
                border .01rem solid #ff4040
                color #ff5454
                text-align center
                line-height .4rem
                box-shadow 0 0.02rem 0.05rem   
            span 
                color #999999     
                margin .2rem 0  
                display block 
        .submit
            .btn 
                width 2.5rem
                height .5rem
                background #ff0000
                margin 0 auto 
                text-align center
                line-height  .5rem
                color #ffffff
                font-size .24rem
                   
</style>    


