<template>
    <transition name="slide">
        <div class="password">
            <mt-header title="修改密码">
                <span to="" slot="left" @click="$router.back()">
                    <mt-button icon="">
                        <i class="iconfont icon-fanhui"></i>
                    </mt-button>
                </span>        
            </mt-header>
            <div class="wrap">
                <p class="list">
                    <span>旧密码：</span>
                    <input type="text" placeholder="请输入旧密码" v-model=" oldPswd">
                </p>
                <p class="list">
                    <span>新密码：</span>
                    <input type="password" placeholder="请输入新密码" v-model="newPswd">
                </p>
                <p class="list">
                    <span>确认密码：</span>
                    <input type="password" placeholder="请输入确认密码" v-model="verifyPswd">
                </p>
                
            </div>
            <div class="save-btn">
                <div class="btn" @click="save">保存</div>
            </div>
        </div>
    </transition>
</template>
<script>
    import {  getUpdatePassword } from 'common/api'
    export default {
        data() {
            return {
                oldPswd: '',
                newPswd: '',
                verifyPswd: ''
            }
        },
        created(){
            this.userCode = this.getCookie('userCode')
        },
        methods: {
            save(){
                 getUpdatePassword({userCode: this.userCode,userOldPass:this.oldPswd,userNewPass:this.newPswd,userNewPassTwo:this.verifyPswd}).then(response=>{
                  
                     let res = response.data;
                    if(res.flag =='success'){
                        this.$toast({
                            message: res.info,
                            position:'middle',
                            duration: 2000
                        });
                        setTimeout(()=>{
                            this.$router.back()
                        },2000)
                    }else{
                        this.$toast({
                            message: res.info,
                            position:'middle',
                            duration: 2000
                        });
                    }
                     return
                 },err=>console.log(err))
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
    .password
        position fixed
        left 0
        right 0
        top 0
        bottom 0
        width 6.4rem
        margin 0 auto
        background #fff
        .mint-header
            background #fff;
            color #000
            font-size 18px
            .mint-header-button 
                .iconfont 
                    font-size 20px
                .mint-header-title
                    font-weight bold  
        .wrap
            .list
                border-bottom 1px solid #cccccc
                overflow hidden
                padding .15rem 0
                font-size .24rem
                span 
                    width 1.2rem
                    padding-left .2rem
                    float left
                    
                    color #000
                    font-weight bold
                    line-height .5rem
                input 
                    float left
                    padding .05rem
                    height .4rem
                    width 4.8rem
                    outline none
                    
        .save-btn
            margin-top 1rem
            .btn 
                width 3rem
                height .6rem
                text-align  center
                line-height  .6rem
                background #ff0000
                color #fff
                margin 0 auto
                font-size .24rem



</style>

