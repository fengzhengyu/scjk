<template>
    <div class="member">
        <div class="member-header">
            <div class="photot" @click="hanldePhoto">
                <img src="../common/img/account.png" alt="头像" v-show="!isLogin">
                <img :src="photoImg" alt="头像" v-show="isLogin">
            </div>
            <div class="nickname">
                <p class="name">{{userName}}</p>
                <p class="icon">聚康{{userLevelName}}</p>
            </div>
        </div>
        <div class="order-nav">
            <div class="list"  @click="goMyOrder(1)">
                <i class="iconfont icon-yifukuan"></i><br/>
                已付款
            </div>
            <div class="list"  @click="goMyOrder(2)">
                <i class="iconfont icon-renwuwanchengqingkuangyujing"></i><br/>
                已完成
            </div>
            <div class="list" @click="goCollect">
                <i class="iconfont icon-shangpinshoucang"></i><br/>
                已收藏

            </div>
        </div>
        <div class="menu-list" @click="goPassword">
            设置登录密码
            <span class="right">
                <i class="iconfont icon-qianjin1"></i>
            </span>
        </div>
        <div class="menu-list">
            手机号
           <span class="phone">{{phone}}</span>
        </div>
        <div class="exit" @click="exit" v-show="isLogin">
            退出
        </div>
        <div class="exit" @click="login" v-show="!isLogin">
            登录
        </div>
        <p class="client">
            客服电话：<a href="tel:13658050467">13658050467</a> 王
        </p>

        <a href="https://m.kuaidi100.com/" target="_blank" class="expressage">快递查询</a>

        <mt-popup
            v-model="popupVisible"
            popup-transition="popup-fade" position="bottom">
            
            <form id="form" method="post" name="file_upload" enctype="multipart/form-data" >
                <div class="update-photo">
                    <input class="file_input" type="file" multiple  accept="image/gif,image/jpeg,image/png,image/jpg"  @change="changePhoto"/>
                    <div class="upload_box">
                    修改头像 &nbsp;&nbsp;<span class="info">(注：图片小于200KB)</span>
                    </div>
                    <!--<span class="upload_box" id="uploadPhotoBtn">确定</span>-->
                </div>

            </form>
            
            
        </mt-popup>
        <Footer></Footer>

        <router-view></router-view>
    </div>
</template>
<script>
    import { getMemberData, getLoadPhotoData } from 'common/api'
    import Footer from 'components/common/Footer.vue'
    export default {
        data(){
            return {
                isLogin: false,
                photoImg: '', //头像
                phone: '', //手机号
                userName: '您未登录', //与户名
                popupVisible: false ,
                userLevelName: '会员'
            }
        },
        created(){
            this.userCode = this.getCookie('userCode')
            if(this.userCode){
                this.isLogin =true
                this.getUserMessage()
            }
           
        },
        methods: {
            async getUserMessage(){
                let {data:res} = await getMemberData({userCode:this.userCode});
                
                if(res.flag == 'success'){
                    let data = res.data.userList;
                    this.photoImg = data.headPhoto;
                    this.phone =data.phoneOne;
                    this.userName = data.userName;
                    this.userLevelName = data.userLevelName;
                }
               
            },
            goMyOrder(id){
                if(this.userCode){
                    this.$router.push({
                        name: 'myorder',
                        params: {id:id}
                    })
                }else{
                     this.$toast({
                        message: '请先登录！',
                        position: 'middle',
                        duration: 2000
                    });
                }
            },
            goCollect(){
                if(this.userCode){
                    this.$router.push({
                        name: 'collect'
                    })
                }else{
                     this.$toast({
                        message: '请先登录！',
                        position: 'middle',
                        duration: 2000
                    });
                }
            },
            goPassword(){
                if(this.userCode){
                    this.$router.push({
                        name: 'password'
                    })
                }else{
                     this.$toast({
                        message: '请先登录！',
                        position: 'middle',
                        duration: 2000
                    });
                }
                
            },
            hanldePhoto(){
                 if(this.userCode){
                    this.popupVisible =true;
                }else{
                     this.$toast({
                        message: '请先登录！',
                        position: 'middle',
                        duration: 2000
                    });
                }
            },
            //头像改变
            changePhoto(e){;
                let img1=e.target.files[0];
                let form = new FormData();
                if(img1.size>(200*1024)){
                    this.$toast({
                        message: '图片尺寸超出！',
                        position: 'middle',
                        duration: 2000
                    });

                    return;
                }
                form.append('headPhoto',img1,img1.name);
                form.append('userCode',this.userCode);
                getLoadPhotoData(form).then((response)=>{
                    let res = response.data;
                    if(res.flag == 'success'){
                        let photo = res.returnData;
                        this.photoImg = photo
                        this.$toast({
                            message: '修改成功',
                            position: 'middle',
                            duration: 2000
                        });
                        this.popupVisible =false;

                    }else{
                        this.$toast({
                        message: res.info,
                        position: 'middle',
                        duration: 2000
                        });
                    }
                },(err)=>{
                    console.log(err)
                })
                
            },
            exit(){
              
                this.delCookie ('userCode');
                // sessionStorage.clear();
                this.isLogin = false;
                this.$router.push({
                    name: 'login'
                })
            },
            login(){
                 this.$router.push({
                    name: 'login'
                })
            }
        },
        components: {
            Footer
        }
    }
</script>
<style lang="stylus" scoped>
    .member
        background #ffffff
        position absolute
        left 0
        bottom 0
        top 0
        right 0 
        width 6.4rem
        margin 0 auto
        .member-header
           
            height 1.8rem
            background-image linear-gradient(-90deg,#e93b3d,#ff9574);
            padding .8rem 0 0 .4rem
            div
                display inline-block
              
            .photot
                // margin .8rem 0 0 .4rem
                width 1rem
                height 1rem
                border-radius 50%
                overflow hidden
                vertical-align top
               
                img 
                    width 100%
                    height 100%
            .nickname
                padding-left .2rem
                .name
                    padding .1rem 0
                    font-size .26rem
                    color #ffffff
                .icon
                    margin .1rem 0
                    padding 0 .1rem
                    height .3rem
                    background #ffffff
                    line-height .35rem
                    text-align center
                    border-radius .3rem
                    color #ff7575
                    font-size .18rem
        .order-nav
            display flex
            padding-bottom .2rem
            border-bottom 1px solid #c9c9c9
            .list 
                flex 1
                text-align center
                color #1a1a1a
                font-size .2rem
                i 
                    font-size .5rem
                    display inline-block
                    padding .2rem 0
                    color #a5a5a5
        .menu-list
            border-bottom 1px solid #c9c9c9
            height .6rem
            line-height .6rem
            font-size .24rem
            color #000
            // padding-left .15rem
            padding .15rem 0 .15rem .15rem;
            .right,.phone 
               float right 
               color #a1a1a1
               margin-right .15rem
                
        .exit
            padding-left .15rem
            height .6rem
            line-height .6rem
            color red
            font-size .24rem
        .client
            padding .5rem 0
            text-align center
            color #343434
            span 
                color #3c3cff
                font-size .24rem

        .update-photo
            width: 6.4rem;
            background: #fff;
            height: 60px;
            position: relative;   
            input
                opacity: 0;
                position: absolute;
                top: 0;
                left: 10px;
                width: 5rem;
                height: 60px;
                border: 0;
                outline: none;
            .upload_box  
                text-align: center;
                line-height: 60px;
                color: #555555;
                font-weight: bold;
                font-size: .24rem;  
                .info
                    font-size: 20/@rem;
                    color: red;
        .expressage
            margin  .2rem 0
            color #fff;

</style>
