<template>
 <transition name="slide">
   <div class="address-page">

      <mt-header title="选择地址">
          <span to="" slot="left" @click="addressFlag">
              <mt-button icon="">
                  <i class="iconfont icon-fanhui"></i>
              </mt-button>
          </span>        
      </mt-header>
    </div>
 </transition>
  
</template>
<script>
  export default {
    data(){
      return {

      }
    },
    methods: {
      addressFlag(){
                let data = {
                    type: '个人',
                    boole: false
                }
                this.$emit('addressInfo',data);
            }
    }
  }
</script>

<style lang="stylus" scoped>
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
    .address-page
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
</style>
