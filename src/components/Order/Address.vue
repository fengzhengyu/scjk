<template>
 <transition name="slide">
   <div class="address-page">

      <mt-header title="选择地址">
          <span to="" slot="left" @click="$router.go(-1)">
              <mt-button icon="">
                  <i class="iconfont icon-fanhui"></i>
              </mt-button>
          </span>        
      </mt-header>
      <div class="address-content">
          <h1>
            配送地址
            <p>+增加配送地址</p>  
          </h1>
          <ul class="address-list">
              <li>
                  <div class="info">
                      <div class="cur">1</div>
                      <div class="msg ">
                          <h2>
                              <span>张三</span>
                              <span>15135020192</span>
                          </h2>   
                           <p>
                               <span></span>
                               北京市北京市房山区全区世茂维拉21号楼二单元202
                            </p> 
                      </div>
                  </div>
                  <div class="handle">d</div>
                 
              </li>
          </ul>
      </div>
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
        .address-content

            h1
                font-size .24rem
                padding .2rem
              
                background #dbd0ca
                p 
                    float right
            .address-list
                li 
                    padding .2rem .2rem 0 .2rem
                    border-bottom: 1px solid #d0d0d0;
                    display flex
                    flex-direction column

                    .info
                        display flex
                        flex-flow:row;
                        div 
                            
                            &.cur
                                width .6rem
                                margin-right: 0.1rem;
                            &.msg 
                                flex 1    





</style>
