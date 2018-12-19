<template>
    <transition name="slide">
        <div class="invoice-page">
             <mHeader>
                 <div slot="text" class="text">订单备注</div>
                 <div slot="handle"  class="finish"><span><i class="iconfont icon-bitian2-5"></i></span>为必填选项</div>
            </mHeader>
            
            <div class="column-list">
                <div class="title"><span><i class="iconfont icon-bitian2-5"></i></span>发票抬头</div>
                <div class="content">
                    <div @click="active = 0"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':active==0}"></i>个人</div>
                    <div @click="active = 1"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':active==1}"></i>公司</div>
                    <div @click="active = 2"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':active==2}"></i>不开票</div>
                </div>
            </div>
             <div  v-show="active == 0">
                 <div class="column-list">
                    <div class="title"><span><i class="iconfont icon-bitian2-5"></i></span>发票内容</div>
                    <div class="content">
                        <div @click="active = 0"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':active==0}"></i>商品项目</div>
                        <div @click="active = 1"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':active==1}"></i>商品明细</div> 

                    </div>
                </div>
             </div>
            <div v-show="active == 1">
                <div class="column-list">
                    <div class="title"><span><i class="iconfont icon-bitian2-5"></i></span>公司名称</div>
                    <div class="content">
                        <div> 
                            <input type="text" placeholder="完整公司名称">
                        </div>
                        
                    </div>
                </div>
                <div class="column-list">
                    <div class="title"><span><i class="iconfont icon-bitian2-5"></i></span>公司税号</div>
                    <div class="content">
                         <div> 
                            <input type="text" placeholder="纳税人识别号">
                        </div>
                    </div>
                </div>
                <div class="column-list">
                    <div class="title"><span><i class="iconfont icon-bitian2-5"></i></span>发票内容</div>
                    <div class="content">
                        <div @click="active = 0"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':active==0}"></i>商品项目</div>
                        <div @click="active = 1"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':active==1}"></i>商品明细</div> 

                    </div>
                </div>
                 <div class="column-list">
                    <div class="title change"><span><i class="iconfont icon-bitian2-5"></i></span>开户银行</div>
                    <div class="content">
                         <div> 
                            <input type="text" placeholder="如需开具增值税专用发票请必填">
                        </div>
                    </div>
                </div>
                 <div class="column-list">
                    <div class="title change"><span><i class="iconfont icon-bitian2-5"></i></span>开户账号</div>
                    <div class="content">
                         <div> 
                            <input type="text" placeholder="如需开具增值税专用发票请必填">
                        </div>
                    </div>
                </div>
                 <div class="column-list">
                    <div class="title change"><span><i class="iconfont icon-bitian2-5"></i></span>地址</div>
                    <div class="content">
                         <div> 
                            <input type="text" placeholder="如需开具增值税专用发票请必填">
                        </div>
                    </div>
                </div>
                 <div class="column-list">
                    <div class="title change"><span><i class="iconfont icon-bitian2-5"></i></span>电话</div>
                    <div class="content">
                         <div> 
                            <input type="text" placeholder="如需开具增值税专用发票请必填">
                        </div>
                    </div>
                </div>
            </div>
            
              <div  v-show="active == 2">

             </div>
           
            <div class="submit">
                <div class="btn" @click="save">保存发票信息</div>
            </div>
        </div>    
    </transition>
   
</template>
<script>
     import mHeader from 'components/Member/memberHead'
    export default {
        components: {
            mHeader
        },
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
        position absolute
        top 0
        bottom 0
        width 6.4rem
        background #ffffff
        .column-list
            display flex
            padding .35rem .3rem
            align-items center
            .title
                flex 0 0 1.5rem
                width 1.5rem
                font-size .26rem
                color #202020
                
                span 
                    padding-right .1rem
                    i 
                        color #ff0000
                        font-size .2rem
                &.change
                    i 
                        color #fff
            .content 
                flex 1    
                display flex
                div 
                    flex 1
                    font-size .24rem
                    color #202020
                    i 
                        font-size .36rem
                        vertical-align middle
                        color #a2a2a2
                        &.icon-xuanzhong
                            color #ff6600
                    input 
                        width  100%
                        padding .05rem
                        font-size .2rem
                        color #202020

        .submit
            margin .35rem 0
            background #fff
            .btn 
                width 5.5rem
                height .8rem
                background linear-gradient(90deg,#fea233,#ff6600);
                margin 0 auto 
                text-align center
                line-height  .8rem
                color #ffffff
                font-size .24rem
                border-radius .5rem
                   
</style>    


