<template>
  <footer class="footer">
      <div class="item" :class="{'active':selected == 'index'}" @click="go('index')">
          <i slot="icon" class="iconfont icon-icon-test"></i>
          <span class="text">首页</span>
      </div>
      <div class="item"  @click="go('cart')">
         <i slot="icon" class="iconfont icon-gouwuche1"></i>
         <span class="text"> 购物车</span>
      </div>
      <div class="item" :class="{'active':selected == 'member'}" @click="go('member')">
          <i slot="icon" class="iconfont icon-wode1"></i>
          <span class="text">我</span>
      </div>
  </footer>
</template>
<script>
  export default {
    data(){
      return {
        selected:''
      }
      
    },
    created() {
     this.selected = this.$route.name;
      
    },
    methods: {
      go(value){
        this.$router.push({
          name: value
        })
      }
    }
  }
</script>


<style lang="stylus" scoped>
    footer
        height .9rem
        color #575757
        position fixed
        bottom 0
        background #fff
        width 6.4rem
        display flex
        .item
            flex 1
            text-align center
            padding-top .1rem
            color #999
            .iconfont 
              font-size .5rem
            .text 
              display block
              font-size .24rem
            &.active 
                color #38a0df  
</style>

