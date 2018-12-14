<template>
   <transition name="slide">
    <div class="user">
        <mHeader>
            <div class="text" slot="text">个人信息</div> 
        </mHeader>
        <div class="info-wrapper">
          <p class="name">18566669999</p>
          <p class="icon">
            <i class="iconfont icon-huiyuantongjibaobiao"></i>普通会员
          </p>
        </div>
        <div class="text-wrapper">
            你还可以完善一下信息，有助于我们为您提供更好的服务
        </div>

         <ul class="user-info">
             <li class="border-bottom">
               
                 <span>其他电话</span>
                 <input type="text" placeholder="收货人姓名" maxlength="15" v-model="addressName">
                 <!-- <div>x</div> -->
             </li>
              <li class="border-bottom">
               
                 <span>昵称</span>
                 <input type="text" placeholder="收货人姓名" maxlength="15" v-model="addressName">
                 <!-- <div>x</div> -->
             </li>
              <li class="border-bottom">
               
                 <span>邮箱</span>
                 <input type="text" placeholder="收货人姓名" maxlength="15" v-model="addressName">
                 <!-- <div>x</div> -->
             </li>
         </ul>    
         <div class="submit">
           <div class="btn">提交</div>
         </div>
    </div>
  </transition>
  
</template>
<script>
 import mHeader from 'components/Member/memberHead'
export default {
   components: {
        mHeader
    }
}
</script>
<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .user
    position absolute
    width 6.4rem
    top 0
    bottom 0
    background #f4f5f7
    .info-wrapper
      background #ffffff
      padding .6rem 0
      text-align center
      p 
        display inline-block
        
      .name
        font-size .24rem
        font-weight bold  
        vertical-align middle
      .icon
        margin-left .15rem
        width 1.4rem
        padding  .03rem 0 
        background #82848a
        line-height:normal;
        border-radius .3rem
        color #ffffff
        font-size .18rem   
        vertical-align middle    

        i   
            font-size .22rem   
            float left
            margin 0.03rem 0 0 .1rem
    .text-wrapper
      font-size .2rem
      padding .2rem 0
      background #f4f5f7
      text-align center
      color #979798
    .user-info
      width 100%
      li 
        padding .3rem
        font-size .2rem
        display flex
        align-items  center
        
        color #000
        background #fff
        span 
          flex 0 0 1rem
          width 1rem
         
        
          // line-height normal
          
        input 
          font-size .2rem
        
          flex 1
         
          // line-height normal
        div    
         
          flex 0 0 .3rem   
          width .3rem    
    .submit
      margin .4rem 0
      .btn
        width 4.5rem
        color #fff
        font-size .24rem
        padding .2rem 0
        background #ff6600
        text-align center
        margin  0 auto
</style>    
