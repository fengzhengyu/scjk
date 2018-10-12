<template>
  <footer class="footer" fixed  @click.stop="goRouter">
    <mt-tabbar  fixed v-model="selected">
      <mt-tab-item id="index">
        <i slot="icon" class="iconfont icon-icon-test"></i>
        首页
      </mt-tab-item>
      <mt-tab-item id="cart">
        <i slot="icon" class="iconfont icon-gouwuche1"></i>
        购物车
      </mt-tab-item>
      <mt-tab-item id="member">
        <i slot="icon" class="iconfont icon-wode1"></i>
        我
      </mt-tab-item>
    </mt-tabbar>
  </footer>
</template>
<script>
  export default {
    data(){
      return {
        selected:'index'
      }
      
    },
    watch: {
      // $router(){
      //    this.selected = this.$route.name;
      // }
    },
    created() {
      let Rname = this.$route.name;
    
      switch(Rname){
        case 'index':
          this.selected = 'index';
          break;
        case 'cart':
          this.selected = 'cart';
          break;
        case 'member':
          this.selected = 'member';
          break;
      }
    },
    methods: {
      goRouter(){
        this.$router.push({
          name: this.selected
        })
      }
    }
  }
</script>


<style lang="stylus" scoped>
    footer
        // height 55px
        color #575757
        .mint-tabbar
            width 6.4rem
            margin 0 auto 
            background: #fff;
            border-top 1px solid #ccc
            box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, .13);
            -webkit-box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, .13);
        .mint-tab-item.is-selected 
            color: #38a0df
            background-color: #fff;
        i 
            font-size: 24px;
           

    
  
</style>

