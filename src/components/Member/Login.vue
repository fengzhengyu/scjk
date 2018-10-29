<template>
    <div class="login">
        <div class="header">
            <i class="iconfont icon-guanbi-copy" @click="$router.go(-1)"></i>
        </div>
        <div class="login-wrap">
            <p>
                <i class="iconfont icon-wode"></i>
                <input type="text"  placeholder="会员账号/邮箱/手机号" v-model="userName">
            </p>
            <p>
                <i class="iconfont icon-mima"></i>
                <input type="password"  placeholder="请输入登录密码" v-model="userPass">
            </p>
            <p class="btn-wrap">
                <span  @click="goLogin">登 录</span>
            </p>
            <!-- <p class="btn-wrap"> 
                <span class="btn " @click="signIn">注册新账号</span>
            </p> -->
        </div>
    </div>
</template>
<script>
    import {getLoginData} from 'common/api'
    export default {
        data(){
            return {
                userName: '',
                userPass: '',
                routerName: ''
            }
        },
        created() {
            
        },
        methods: {
           
            async goLogin(){
                this.routerName = sessionStorage.getItem('routerName')
                let {data: res} = await getLoginData({userName:this.userName,passWord:this.userPass});     
                    
                    if(res.message.flag == 'success'){
                        let userCode = res.message.userCode
                        this.setCookie('userCode',userCode,1);
                        this.$toast({
                            message: res.message.info,
                            position: 'middle',
                            duration: 2000
                        });
                        setTimeout(()=>{
                            if(this.routerName){
                                this.$router.go(-1)
                               
                            } 
                            if(this.routerName == 'null'){
                               this.$router.push({
                                    name: 'member'
                                });
                            }
                            // sessionStorage.setItem('routerName',null)
                            
                        },2000)
                    }else{
                        this.$toast({
                            message: res.message.info,
                            position: 'middle',
                            duration: 2000
                        });
                    }
         
            },
            signIn(){
                 this.$router.push({
                    name: 'register'
                })
            }
        },
        beforeRouteEnter (to, from, next) {
        
            sessionStorage.setItem('routerName',from.name)
            next();
        },
    }
</script>

<style lang="stylus" scoped>
    .login
        width 6.4rem
        margin 0 auto
        background #fff
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        .header 
            position relative
            height 4.5rem
            background url('./login.png') no-repeat;
            background-size 100% 4.5rem
            i   
                position absolute
                font-size .36rem  
                top .3rem 
                left .3rem
        .login-wrap
            background #fff
            padding 0 .5rem
            p 
                margin .3rem 0
             
                background #e6e6e6
                border-radius .5rem
                line-height .5rem
                overflow hidden
                i 
                    font-size .26rem  
                    padding  0 .2rem
                   
                input 
                    height 100%
                    width 4.65rem    
                    outline none
                    background #e6e6e6
                    font-size .24rem

                &.btn-wrap
                    background #fff
                    text-align center
                    span 
                        display inline-block
                        width 3rem
                        height .5rem
                        background #1969b2
                        border 1px solid #1969b2
                        border-radius .3rem
                        color #ffffff
                        font-size .24rem
                        &.btn
                           color #1969b2
                           background #fff
                           border 1px solid #1969b2
                       

</style>    
