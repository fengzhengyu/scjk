<template>
    <div class="login">
        <div class="header">
            <i class="iconfont icon-guanbi-copy" @click="$router.back()"></i>
        </div>
        <div class="login-wrap">
            <p>
                <i class="iconfont icon-wode"></i>
                <input type="text"  placeholder="手机号" v-model="userName">
            </p>
            <p>
                <i class="iconfont icon-wode"></i>
                <input type="text"  placeholder="验证码" class="auth" v-model="authCode">
                <span v-if="!authFlag" class="auth-wrap" @click="getAuthCode">验证码</span>
                 <span v-if="authFlag"   class="auth-wrap">{{time+ 's后获取'}}</span>
                
            </p>
            <p>
                <i class="iconfont icon-mima"></i>
                <input type="password"  placeholder="密码" v-model="userPass">
            </p>
            <p class="btn-wrap">
                <span  @click="goLogin">完成</span>
            </p>
            <p class="btn-wrap"> 
                <span class="btn " @click="$router.push({name:'login'})">已有账号</span>
            </p>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                time: 0,
                userName: '',
                authCode: '',
                userPass: '',
                authFlag:false
            }
        },
        mounted() {
           
        },
        methods: {
            goLogin(){
                 this.$http.post('Login/login',{userName:this.userName,passWord:this.userPass},{
                    transformRequest:[function(data){
                        let params = '';
                        for(let key in data){
                            params += key+'='+ data[key]+'&'
                        }
                        return params;
                    }]
                }).then(response =>{
                    let res = response.data
                    if(res.message.flag == 'success'){

                        let userCode = res.message.userCode
                        this.setCookie('userCode',userCode,1);
                        this.$toast({
                            message: res.message.info,
                            position: 'middle',
                            duration: 2000
                        });
                        setTimeout(()=>{
                            this.$router.push({
                                name:'member'
                            });
                        },2000)
                    }else{
                        this.$toast({
                            message: res.message.info,
                            position: 'middle',
                            duration: 2000
                        });
                    }
                   // 


                })
            },
            getAuthCode(){
              let reg=/^1[34578]{1}\d{9}$/;
              if(this.userName == '') {
                this.$toast({
                  message: '手机号不能为空',
                  position: 'middle',
                  duration: 2000
                });
                return;
              }
              if(!reg.test(this.userName)){
                this.$toast({
                  message: '手机号格式不正确',
                  position: 'middle',
                  duration: 2000
                });
                return;
              }
            //  this.$http.post('Login/login',{userName:this.userName,passWord:this.userPass},{
            //       transformRequest:[function(data){
            //           let params = '';
            //           for(let key in data){
            //               params += key+'='+ data[key]+'&'
            //           }
            //           return params;
            //       }]
            //   }).then(response =>{

            //   }).catch(err=>console.log(err+ '验证码接口报错'))

              this.authFlag = true;
              if(this.authFlag){
                this.time =10;
                let timer = setInterval(()=>{
                    this.time--;
                    if(this.time<=0 ){
                      this.authFlag = false;
                      clearInterval(timer);
                    }
                },1000)

              }else{
                  return
              }
              
            }
        }
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
                .auth-wrap   
                    float right 
                    width 1.2rem
                    height .5rem
                    background #1969b2
                    color #fff
                    text-align center
                    border-radius .3rem
                input 
                    height 100%
                    width 4.65rem    
                    outline none
                    background #e6e6e6
                    font-size .24rem
                    &.auth
                      width 1.4rem    
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
